const PAGE = __PAGE__;
const ASSETS = __ASSETS__;

const responseHeaders = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
};

const rateLimit = new Map();
const allowedInterests = new Set([
  "Allgemeine Beratung",
  "Botulinumtoxin",
  "Hyaluronsäure",
  "PRP / PRF / autologe Exosomen",
]);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...responseHeaders, "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function clean(value, maxLength) {
  return String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" })[character]);
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), character => character.charCodeAt(0));
}

async function getEncryptionKey(env) {
  if (!env.CONFIG_ENCRYPTION_KEY) throw new Error("Missing encryption key");
  return crypto.subtle.importKey("raw", base64ToBytes(env.CONFIG_ENCRYPTION_KEY), { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function readSecret(name, env) {
  if (!env.DB) throw new Error("Database unavailable");
  const row = await env.DB.prepare("SELECT ciphertext, iv FROM site_secrets WHERE name = ? LIMIT 1").bind(name).first();
  if (!row) return null;
  const key = await getEncryptionKey(env);
  const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64ToBytes(row.iv) }, key, base64ToBytes(row.ciphertext));
  return new TextDecoder().decode(plaintext);
}

function isRateLimited(request) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const now = Date.now();
  const windowStart = now - 10 * 60 * 1000;
  const attempts = (rateLimit.get(ip) || []).filter(timestamp => timestamp > windowStart);
  attempts.push(now);
  rateLimit.set(ip, attempts);
  return attempts.length > 4;
}

async function sendContact(request, env) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({ message: "Ungültige Anfrage." }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return json({ message: "Ungültiges Format." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 20_000) return json({ message: "Die Anfrage ist zu groß." }, 413);
  if (isRateLimited(request)) return json({ message: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." }, 429);

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ message: "Die Anfrage konnte nicht gelesen werden." }, 400);
  }

  if (clean(input.website, 200)) return json({ ok: true });
  const elapsed = Date.now() - Number(input.startedAt || 0);
  if (!Number.isFinite(elapsed) || elapsed < 2500 || elapsed > 2 * 60 * 60 * 1000) return json({ message: "Bitte laden Sie das Formular neu und versuchen Sie es erneut." }, 400);

  const name = clean(input.name, 120);
  const email = clean(input.email, 200).toLowerCase();
  const phone = clean(input.phone, 40);
  const interest = clean(input.interest, 80);
  const message = clean(input.message, 2000);
  const privacy = input.privacy === "on" || input.privacy === true || input.privacy === "true";
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !allowedInterests.has(interest) || !privacy) {
    return json({ message: "Bitte prüfen Sie die Pflichtfelder und Ihre E-Mail-Adresse." }, 400);
  }
  if (phone && !/^[0-9+()\s./-]{5,40}$/.test(phone)) return json({ message: "Bitte prüfen Sie die Telefonnummer oder lassen Sie das Feld frei." }, 400);
  let apiKey;
  try { apiKey = await readSecret("brevo_api_key", env); } catch (error) {
    console.error("Encrypted contact configuration unavailable", error instanceof Error ? error.message : "unknown");
    return json({ message: "Das Kontaktformular ist derzeit nicht verfügbar." }, 503);
  }
  if (!apiKey) return json({ message: "Das Kontaktformular ist noch nicht vollständig freigeschaltet." }, 503);

  const recipient = env.CONTACT_RECIPIENT || "r.tobis@wp.eu";
  const sender = env.BREVO_SENDER_EMAIL || "r.tobis@wp.eu";
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "nicht angegeben");
  const safeInterest = escapeHtml(interest);
  const safeMessage = escapeHtml(message || "—").replace(/\n/g, "<br>");
  const subject = `Anfrage Ästhetische Medizin – ${interest}`;
  const textContent = [
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone || "nicht angegeben"}`,
    `Interesse: ${interest}`,
    "",
    "Nachricht:",
    message || "—",
  ].join("\n");
  const htmlContent = `<h2>Neue Anfrage über die Website</h2><p><strong>Name:</strong> ${safeName}<br><strong>E-Mail:</strong> ${safeEmail}<br><strong>Telefon:</strong> ${safePhone}<br><strong>Interesse:</strong> ${safeInterest}</p><p><strong>Nachricht:</strong><br>${safeMessage}</p><hr><p style="color:#64748b;font-size:12px">Antworten Sie auf diese E-Mail, um direkt an die anfragende Person zu schreiben.</p>`;

  const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "accept": "application/json", "api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Robert Tobis – Ästhetische Medizin", email: sender },
      to: [{ name: "Robert Tobis", email: recipient }],
      replyTo: { name, email },
      subject,
      textContent,
      htmlContent,
    }),
  });

  if (!brevoResponse.ok) {
    console.error("Brevo contact request failed", brevoResponse.status);
    return json({ message: "Die Anfrage konnte derzeit nicht gesendet werden. Bitte versuchen Sie es später erneut." }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env, ctx) {
    void ctx;
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return json({ message: "Methode nicht erlaubt." }, 405);
      return sendContact(request, env);
    }
    if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405, headers: responseHeaders });
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(request.method === "HEAD" ? null : PAGE, {
        headers: { ...responseHeaders, "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" },
      });
    }
    const asset = ASSETS[url.pathname];
    if (asset) {
      const bytes = Uint8Array.from(atob(asset.body), character => character.charCodeAt(0));
      return new Response(request.method === "HEAD" ? null : bytes, {
        headers: { ...responseHeaders, "content-type": asset.type, "cache-control": "public, max-age=31536000, immutable" },
      });
    }
    return new Response("Not found", { status: 404, headers: responseHeaders });
  },
};
