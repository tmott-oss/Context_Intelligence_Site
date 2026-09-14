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
  assert.match(html, /AI isn(?:&apos;|&#x27;|’)t a software project/i);
  assert.match(html, /Organizational AI Transformation/);
  assert.match(html, /AI Transformation Blueprint/);
  assert.match(html, /Vision[\s\S]*Processes[\s\S]*Context[\s\S]*AI-Enabled Workflows[\s\S]*AI Agents[\s\S]*Adoption[\s\S]*Scale/);
  assert.match(html, /Map[\s\S]*Model[\s\S]*Mobilize/);
  assert.match(html, /Vision plus context multiplied by adoption equals AI success/i);
  assert.match(html, /Turn your expertise into a product your audience can use—and buy/i);
  assert.match(html, /href="\/context-ready"/);
  assert.match(html, /href="\/assessment"/);
  assert.match(html, /Take the 5-Minute Assessment/i);
  assert.doesNotMatch(html, /From Strategy to Active Agents|Agents should earn the right to act/i);
  assert.doesNotMatch(html, /How We Apply the Blueprint|These three phases define how Context Intelligence guides the work/i);
  assert.doesNotMatch(html, /Capture[\s\S]{0,12}Connect[\s\S]{0,12}Activate|Organizational Intelligence Flywheel/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("server-renders the seven-system readiness assessment", async () => {
  const response = await render("/assessment");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /AI Transformation Readiness Assessment/i);
  assert.match(html, /Begin the Assessment/i);
  assert.match(html, /Company name[\s\S]*Title[\s\S]*Business email[\s\S]*Phone number/i);
  assert.match(html, /Vision[\s\S]*Processes[\s\S]*Context[\s\S]*AI-Enabled Workflows[\s\S]*AI Agents[\s\S]*Adoption[\s\S]*Scale/);
});

test("server-renders launch trust pages", async () => {
  const privacy = await render("/privacy");
  const terms = await render("/terms");
  assert.equal(privacy.status, 200);
  assert.equal(terms.status, 200);
  assert.match(await privacy.text(), /Your selections are evaluated in your browser/i);
  assert.match(await terms.text(), /directional planning tool/i);
});

test("lead relay stays closed when no destination is configured", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-lead`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "test@example.com", interest: "assessment" }),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 503);
});

test("server-renders the Context Ready creator partnership page", async () => {
  const response = await render("/context-ready");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Context Ready/);
  assert.match(html, /The Creator Product Studio/);
  assert.match(html, /<title>Context Ready \| The Creator Product Studio<\/title>/i);
  assert.match(html, /context-ready-og\.png/i);
  assert.match(html, /Turn what you know into a product your audience will buy/i);
  assert.match(html, /Identify the opportunity[\s\S]*Design the product[\s\S]*Build and launch[\s\S]*Learn and improve/i);
  assert.match(html, /For selected partnerships, Context Ready may invest in product development/i);
  assert.match(html, /Apply to Build Your Product/i);
  assert.doesNotMatch(html, /Michael Lee|guaranteed income|passive income/i);
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
