import { createCipheriv, randomBytes } from "node:crypto";

const apiKey = process.env.BREVO_API_KEY;
const encodedKey = process.env.CONFIG_ENCRYPTION_KEY;

if (!apiKey || !encodedKey) {
  console.error("BREVO_API_KEY and CONFIG_ENCRYPTION_KEY are required.");
  process.exit(1);
}

const key = Buffer.from(encodedKey, "base64");
if (key.length !== 32) {
  console.error("CONFIG_ENCRYPTION_KEY must be a Base64-encoded 32-byte key.");
  process.exit(1);
}

const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([
  cipher.update(apiKey, "utf8"),
  cipher.final(),
  cipher.getAuthTag(),
]);

const ciphertext = encrypted.toString("base64").replaceAll("'", "''");
const encodedIv = iv.toString("base64").replaceAll("'", "''");
const updatedAt = Date.now();

process.stdout.write(
  `INSERT INTO site_secrets (name, ciphertext, iv, updated_at) VALUES ('brevo_api_key', '${ciphertext}', '${encodedIv}', ${updatedAt}) ` +
  `ON CONFLICT(name) DO UPDATE SET ciphertext=excluded.ciphertext, iv=excluded.iv, updated_at=excluded.updated_at;\n`,
);
