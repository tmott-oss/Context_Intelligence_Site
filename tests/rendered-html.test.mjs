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
  assert.match(html, /Your organization is losing/);
  assert.match(html, /Organizational Intelligence/);
  assert.match(html, /Capture\. Connect\. Activate\. Advantage\./);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the isolated graph lab", async () => {
  const response = await render("/graph-lab");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Organizational Intelligence Graph Lab/);
  assert.match(html, /Not in production hero/i);
});
