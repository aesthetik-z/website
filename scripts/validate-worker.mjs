import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const workerPath = resolve(root, "dist/server/index.js");
const source = await readFile(workerPath, "utf8");
const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const worker = await import(moduleUrl);
assert.equal(typeof worker.default?.fetch, "function", "Worker must export default.fetch");

const pageResponse = await worker.default.fetch(new Request("https://example.test/"), {}, {});
assert.equal(pageResponse.status, 200);
assert.match(await pageResponse.text(), /Ästhetische Medizin Robert Tobis/);

const apiResponse = await worker.default.fetch(new Request("https://example.test/api/contact", { method: "GET" }), {}, {});
assert.equal(apiResponse.status, 405);

const setupResponse = await worker.default.fetch(new Request("https://example.test/setup/brevo?token=wrong"), { SETUP_TOKEN: "correct" }, {});
assert.equal(setupResponse.status, 404);
console.log("Worker validation passed");
