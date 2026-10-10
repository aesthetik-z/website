const guideContent = {
  mimik: {
    title: "Botulinumtoxin",
    copy: "Kann für ausgewählte mimische Bereiche wie Stirn, Zornesfalte oder Krähenfüße in Betracht kommen. Ziel und Dosierung werden an Muskelaktivität und gewünschte Natürlichkeit angepasst.",
    tags: ["Stirn", "Zornesfalte", "Krähenfüße"]
  },
  kontur: {
    title: "Hyaluronsäure",
    copy: "Kann zur behutsamen Modellierung ausgewählter Gesichtskonturen oder zum Ausgleich von Volumen eingesetzt werden. Proportion, Gewebestruktur und ein stufenweises Vorgehen stehen im Vordergrund.",
    tags: ["Gesichtsmodellierung", "Konturen", "Volumen"]
  },
  lippen: {
    title: "Lippen & Mundregion",
    copy: "Je nach Ausgangssituation können Hyaluronsäure oder ausgewählte Botulinumtoxin-Anwendungen besprochen werden – etwa für Kontur, Volumen, Lip Flip, Gummy Smile, Raucherfältchen oder Mundwinkel.",
    tags: ["Hyaluronsäure", "Lip Flip", "Mundregion"]
  },
  haut: {
    title: "PRP · PRF · Exosomen",
    copy: "Je nach Befund können PRP, PRF oder eine autologe exosomale PRF-Therapie mit körpereigenen EVs aus Eigenblut für Haut oder Kopfhaut besprochen werden. Im Mittelpunkt steht die schrittweise Unterstützung der Hautqualität – nicht sofortiges Volumen.",
    tags: ["PRP", "PRF", "Autologe Exosomen"]
  },
  funktion: {
    title: "Ärztliche Indikationsprüfung",
    copy: "Bei starkem Schwitzen, Beschwerden im Bereich des Masseters oder ausgewählten Migräne-Konstellationen kann Botulinumtoxin medizinisch geprüft werden. Voraussetzung ist stets eine individuelle Anamnese und ärztliche Beurteilung.",
    tags: ["Hyperhidrose", "Masseter", "Migräne"]
  }
};

const treatmentContent = {
  iprf: {
    kicker: "Regenerative Ästhetik · Eigenblut",
    title: "i-PRF",
    subtitle: "Injizierbares plättchenreiches Fibrin",
    intro: "Ein körpereigenes Regenerationskonzept: Aus einer kleinen Menge Eigenblut wird eine plättchen- und fibrinreiche Fraktion gewonnen und unmittelbar in ausgewählte Areale eingebracht.",
    badge: "Natürlich statt sofortigem Volumen",
    explainerTitle: "Was ist i-PRF?",
    explainer: "i-PRF enthält Blutplättchen, ein feines Fibrinnetz und Signalproteine. Je nach Aufbereitung können geringe Mengen CD34-positiver hämatopoetischer Stamm- und Vorläuferzellen enthalten sein; deren klinische Bedeutung wird weiter erforscht. i-PRF ist kein Hyaluron-Filler.",
    goals: [
      "Umfassende Hautregeneration",
      "Unterstützung von Hautstruktur, Elastizität und Festigkeit",
      "Feine Linien können im Verlauf weicher erscheinen",
      "Unterstützung der Mikroumgebung vitaler Haarfollikel",
      "Unterstützung von kräftigerem Haar und einer höheren Haardichte",
      "Schrittweise Entwicklung statt sofortigem Volumeneffekt"
    ],
    steps: [
      ["Blutentnahme", "Eine kleine Menge Eigenblut wird entnommen."],
      ["Aufbereitung", "Schonende Gewinnung der plättchen- und fibrinreichen Fraktion."],
      ["Injektion", "Gezielte Anwendung in ausgewählten Hautarealen oder an der Kopfhaut."],
      ["Entwicklung", "Veränderungen entstehen schrittweise und sind individuell."]
    ],
    areas: ["Gesicht", "Augenregion", "Hals", "Dekolleté", "Handrücken", "Kopfhaut"],
    safety: "Vorübergehend können Rötung, Schwellung, Druckempfindlichkeit oder kleine Hämatome auftreten. Wie bei jeder Injektion sind selten weitere Komplikationen möglich. Eignung, Risiken, Alternativen und realistische Erwartungen werden persönlich ärztlich geklärt."
  },
  exosomes: {
    kicker: "Regenerative Ästhetik · Eigenblut",
    title: "Autologe Exosomen",
    subtitle: "Exosomale plättchenreiche Fibrintherapie",
    intro: "Aus einer kleinen Menge Eigenblut wird nach einem festgelegten Praxisprotokoll ein autologes Präparat gewonnen. Es enthält körpereigene Exosomen beziehungsweise extrazelluläre Vesikel (EVs), plättchenreiches Fibrin, weitere Blutbestandteile und Signalproteine.",
    badge: "Körpereigene EVs · kein Spendergewebe",
    explainerTitle: "Was sind Exosomen (EVs)?",
    explainer: "Exosomen sind kleine, von Zellen freigesetzte Vesikel. Sie können Proteine, Lipide und Nukleinsäuren transportieren und sind an der Kommunikation zwischen Zellen beteiligt. In Verbindung mit plättchenreichem Fibrin können sie zusätzliche zelluläre Signale bereitstellen.",
    goals: [
      "Unterstützung von Hautstruktur, Festigkeit und Elastizität",
      "Feine Linien können im Verlauf weniger ausgeprägt erscheinen",
      "Unterstützung natürlicher Umbau- und Reparaturprozesse"
    ],
    steps: [
      ["Blutentnahme", "Eine kleine Menge Eigenblut wird entnommen."],
      ["Aufbereitung", "Gewinnung des autologen Präparats nach Praxisprotokoll."],
      ["Injektion", "Gezielte Anwendung in Haut oder Unterhaut."],
      ["Nachsorge", "Individuelle ärztliche Hinweise und Kontrolle."]
    ],
    areas: ["Ausgewählte Hautareale", "Gesicht", "Haut", "Unterhaut"],
    safety: "Vorübergehend können Rötung, Schwellung, Druckempfindlichkeit, Schmerzen, Juckreiz oder Hämatome auftreten. Das Verfahren ist kein klassischer Filler; Ergebnisse sind individuell und nicht garantiert. Anamnese und Aufklärung klären Eignung, Alternativen und persönliche Risiken."
  }
};

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation.classList.toggle("open", !open);
});
navigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

const title = document.querySelector("[data-result-title]");
const copy = document.querySelector("[data-result-copy]");
const tags = document.querySelector("[data-result-tags]");
function setGuide(key, scroll = false) {
  const content = guideContent[key];
  if (!content || !title || !copy || !tags) return;
  document.querySelectorAll(".concern").forEach(button => {
    const active = button.dataset.concern === key;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  title.textContent = content.title;
  copy.textContent = content.copy;
  tags.replaceChildren(...content.tags.map(tag => {
    const span = document.createElement("span");
    span.textContent = tag;
    return span;
  }));
  if (scroll) document.querySelector("#orientierung")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
document.querySelectorAll(".concern").forEach(button => button.addEventListener("click", () => setGuide(button.dataset.concern)));
document.querySelectorAll(".js-select-service").forEach(button => button.addEventListener("click", () => {
  const mapping = { botulinum: "mimik", hyaluron: "kontur", prp: "haut" };
  setGuide(mapping[button.dataset.service], true);
}));

const treatmentDialog = document.querySelector("#treatment-dialog");
function replaceTextList(selector, items, className) {
  const target = treatmentDialog?.querySelector(selector);
  if (!target) return;
  target.replaceChildren(...items.map(item => {
    const element = document.createElement(className === "tag" ? "span" : "li");
    if (className === "step") {
      const strong = document.createElement("strong");
      strong.textContent = item[0];
      const span = document.createElement("span");
      span.textContent = item[1];
      element.append(strong, span);
    } else {
      element.textContent = item;
    }
    return element;
  }));
}
function openTreatment(key) {
  const content = treatmentContent[key];
  if (!content || !treatmentDialog) return;
  const fields = ["kicker", "title", "subtitle", "intro", "badge", "explainerTitle", "explainer", "safety"];
  fields.forEach(field => {
    const element = treatmentDialog.querySelector(`[data-treatment-${field.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}]`);
    if (element) element.textContent = content[field];
  });
  replaceTextList("[data-treatment-goals]", content.goals, "item");
  replaceTextList("[data-treatment-steps]", content.steps, "step");
  replaceTextList("[data-treatment-areas]", content.areas, "tag");
  treatmentDialog.showModal();
}
document.querySelectorAll(".js-open-treatment").forEach(button => button.addEventListener("click", () => openTreatment(button.dataset.treatment)));

const botulinumDialog = document.querySelector("#botulinum-dialog");
document.querySelectorAll(".js-open-botulinum").forEach(button => button.addEventListener("click", () => botulinumDialog?.showModal()));

const contactDialog = document.querySelector("#contact-dialog");
document.querySelectorAll(".js-open-contact").forEach(button => button.addEventListener("click", () => contactDialog?.showModal()));
document.querySelector(".js-treatment-contact")?.addEventListener("click", () => {
  treatmentDialog?.close();
  contactDialog?.showModal();
});
document.querySelectorAll("dialog .dialog-close").forEach(button => button.addEventListener("click", () => button.closest("dialog")?.close()));
const backdropPointerDown = new WeakSet();
function isDialogBackdropPointer(dialog, event) {
  if (event.target !== dialog) return false;
  const rect = dialog.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
}
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("pointerdown", event => {
    if (isDialogBackdropPointer(dialog, event)) backdropPointerDown.add(dialog);
  });
  dialog.addEventListener("pointerup", event => {
    const closeFromBackdrop = backdropPointerDown.has(dialog) && isDialogBackdropPointer(dialog, event);
    backdropPointerDown.delete(dialog);
    if (closeFromBackdrop) dialog.close();
  });
  dialog.addEventListener("pointercancel", () => backdropPointerDown.delete(dialog));
});

const form = document.querySelector("#contact-form");
const startedAtField = form?.querySelector('[name="startedAt"]');
if (startedAtField) startedAtField.value = String(Date.now());
form?.addEventListener("submit", async event => {
  event.preventDefault();
  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector(".form-submit");
  const data = new FormData(form);
  const payload = Object.fromEntries(data.entries());
  status.className = "form-status";
  status.textContent = "Ihre Anfrage wird sicher übermittelt …";
  submitButton.disabled = true;
  submitButton.setAttribute("aria-busy", "true");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "accept": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || "Die Anfrage konnte nicht gesendet werden.");
    form.reset();
    if (startedAtField) startedAtField.value = String(Date.now());
    status.classList.add("success");
    status.textContent = "Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.";
    status.focus({ preventScroll: true });
  } catch (error) {
    status.classList.add("error");
    status.textContent = error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.";
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-busy");
  }
});

const legalDialog = document.querySelector("#legal-dialog");
const legalContent = {
  Impressum: `
    <section>
      <h3>Anbieter</h3>
      <p><strong>Robert Tobis</strong><br>Facharzt für Chirurgie · Facharzt für Allgemeinmedizin<br>Pestalozzistraße 27<br>08062 Zwickau</p>
    </section>
    <section>
      <h3>Kontakt</h3>
      <p>E-Mail: <a href="mailto:r.tobis@wp.eu">r.tobis@wp.eu</a><br>Für Behandlungsanfragen steht zusätzlich das Kontaktformular dieser Website zur Verfügung.</p>
    </section>
    <section>
      <h3>Berufsrechtliche Angaben</h3>
      <p>Berufsbezeichnungen: Arzt, Facharzt für Chirurgie und Facharzt für Allgemeinmedizin (Deutschland)</p>
      <p>Zuständige Kammer: Sächsische Landesärztekammer, Schützenhöhe 16, 01099 Dresden. Es gelten die Berufsordnung und das Sächsische Heilberufekammergesetz in der jeweils gültigen Fassung.</p>
    </section>
    <section>
      <h3>Inhaltlich verantwortlich</h3>
      <p>Robert Tobis, Anschrift wie oben.</p>
    </section>
  `,
  Datenschutz: `
    <section>
      <h3>1. Verantwortlicher</h3>
      <p>Robert Tobis<br>Pestalozzistraße 27, 08062 Zwickau<br>E-Mail: <a href="mailto:r.tobis@wp.eu">r.tobis@wp.eu</a></p>
    </section>
    <section>
      <h3>2. Aufruf und Hosting der Website</h3>
      <p>Beim Aufruf der Website werden technisch erforderliche Verbindungsdaten verarbeitet. Dazu können IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, Browser- und Geräteinformationen sowie Referrer-Angaben gehören. Die Verarbeitung dient der sicheren Bereitstellung, Fehleranalyse und Abwehr von Missbrauch.</p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt im sicheren und funktionsfähigen Betrieb der Website. Die Website wird über OpenAI Sites auf technischer Infrastruktur von Cloudflare bereitgestellt.</p>
    </section>
    <section>
      <h3>3. Kontaktformular und E-Mail-Versand</h3>
      <p>Bei Nutzung des Kontaktformulars werden Name, E-Mail-Adresse, der ausgewählte Interessenbereich, die Nachricht und – nur wenn freiwillig angegeben – die Telefonnummer verarbeitet. Die Angaben werden ausschließlich zur Bearbeitung und Beantwortung der Anfrage verwendet.</p>
      <p>Bitte übermitteln Sie über das Formular keine Befunde, Diagnosen, Bilder oder sonstigen sensiblen Gesundheitsdaten. Das Formular ist nur für eine erste organisatorische Kontaktaufnahme vorgesehen.</p>
      <p>Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO; soweit die Anfrage auf die Anbahnung einer Behandlung gerichtet ist, zusätzlich Art. 6 Abs. 1 lit. b DSGVO. Eine erteilte Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.</p>
      <p>Für den technischen Versand wird Brevo als Auftragsverarbeiter eingesetzt: Brevo GmbH, Köpenicker Straße 126, 10179 Berlin. Die Formulardaten werden zur Erstellung und Zustellung der Transaktions-E-Mail an Brevo übermittelt. Die weitere Bearbeitung erfolgt im E-Mail-Postfach des Verantwortlichen.</p>
    </section>
    <section>
      <h3>4. Speicherdauer</h3>
      <p>Anfragen werden nur so lange gespeichert, wie dies für ihre Bearbeitung und mögliche Anschlusskommunikation erforderlich ist. Gesetzliche Aufbewahrungspflichten bleiben unberührt. Nicht benötigte Daten werden anschließend gelöscht.</p>
    </section>
    <section>
      <h3>5. Cookies und Reichweitenmessung</h3>
      <p>Diese Website verwendet derzeit keine Analyse-, Marketing- oder Profiling-Dienste und setzt keine nicht technisch erforderlichen Cookies ein. Es findet keine automatisierte Entscheidungsfindung statt.</p>
    </section>
    <section>
      <h3>6. Ihre Rechte</h3>
      <p>Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine Einwilligung kann jederzeit für die Zukunft widerrufen werden.</p>
    </section>
    <section>
      <h3>7. Beschwerderecht</h3>
      <p>Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig ist insbesondere die Sächsische Datenschutz- und Transparenzbeauftragte, Devrientstraße 5, 01067 Dresden, <a href="https://www.datenschutz.sachsen.de/" target="_blank" rel="noopener noreferrer">www.datenschutz.sachsen.de</a>.</p>
    </section>
    <section>
      <h3>8. Datensicherheit</h3>
      <p>Die Übertragung erfolgt verschlüsselt über HTTPS. Technische Schutzmaßnahmen begrenzen missbräuchliche Formularanfragen. Der für den E-Mail-Versand erforderliche Zugangsschlüssel wird verschlüsselt und nicht im öffentlich abrufbaren Seiteninhalt gespeichert.</p>
    </section>
    <p class="legal-note">Stand: Oktober 2026. Diese Erklärung wird angepasst, wenn sich eingesetzte Dienste oder Verarbeitungsabläufe ändern.</p>
  `
};
document.querySelectorAll(".js-legal").forEach(button => button.addEventListener("click", () => {
  const key = button.dataset.legal;
  legalDialog.querySelector("#legal-title").textContent = key === "Datenschutz" ? "Datenschutzerklärung" : "Impressum";
  legalDialog.querySelector("#legal-content").innerHTML = legalContent[key] || "";
  legalDialog.showModal();
}));

const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 }) : null;
document.querySelectorAll(".reveal").forEach(element => observer ? observer.observe(element) : element.classList.add("visible"));
document.querySelector("#year").textContent = new Date().getFullYear();
