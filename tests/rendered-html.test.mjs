import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Context Intelligence marketing site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Context Intelligence/);
  assert.match(html, /AI transformation doesn(?:&apos;|&#x27;|’)t start with technology/i);
  assert.match(html, /Organizational AI Transformation/);
  assert.match(html, /AI Transformation Blueprint/);
  assert.match(html, /Map[\s\S]*Model[\s\S]*Mobilize/);
  assert.match(html, /Agents should earn the right to act/);
  assert.match(html, /first three workflows worth agentizing/i);
  assert.doesNotMatch(html, /Capture[\s\S]{0,12}Connect[\s\S]{0,12}Activate|Organizational Intelligence Flywheel/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the secondary Business Independence pathway", async () => {
  const response = await render("/pathways/business-independence");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Business Independence Blueprint/);
  assert.match(html, /Reduce owner dependency/);
});

test("server-renders the isolated graph lab", async () => {
  const response = await render("/graph-lab");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /AI Transformation Architecture Lab/);
  assert.match(html, /Seven business systems/);
});
