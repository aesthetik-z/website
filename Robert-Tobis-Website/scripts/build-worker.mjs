import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "site");
const output = resolve(root, "dist");

let [page, styles, app, template] = await Promise.all([
  readFile(resolve(source, "index.html"), "utf8"),
  readFile(resolve(source, "styles.css"), "utf8"),
  readFile(resolve(source, "app.js"), "utf8"),
  readFile(resolve(root, "worker/index.template.js"), "utf8"),
]);

page = page
  .replace('<link rel="stylesheet" href="styles.css">', `<style>${styles}</style>`)
  .replace('<script src="app.js"></script>', `<script>${app}</script>`)
  .replaceAll('assets/hero-premium.webp', '/assets/hero-premium.webp')
  .replaceAll('assets/portrait-premium.webp', '/assets/portrait-premium.webp')
  .replaceAll('assets/botulinum-portrait.webp', '/assets/botulinum-portrait.webp');

const assetFiles = [
  ["/assets/hero-premium.webp", "image/webp", "hero-premium.webp"],
  ["/assets/portrait-premium.webp", "image/webp", "portrait-premium.webp"],
  ["/assets/botulinum-portrait.webp", "image/webp", "botulinum-portrait.webp"],
];
const assets = {};
for (const [pathname, type, filename] of assetFiles) {
  const buffer = await readFile(resolve(source, "assets", filename));
  assets[pathname] = { type, body: buffer.toString("base64") };
}

const worker = template
  .replace("__PAGE__", JSON.stringify(page))
  .replace("__ASSETS__", JSON.stringify(assets));

await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, "server"), { recursive: true });
await mkdir(resolve(output, ".openai"), { recursive: true });
await writeFile(resolve(output, "server/index.js"), worker);
await writeFile(resolve(output, ".openai/hosting.json"), await readFile(resolve(root, ".openai/hosting.json")));
console.log("Built Cloudflare Worker artifact in dist/");
