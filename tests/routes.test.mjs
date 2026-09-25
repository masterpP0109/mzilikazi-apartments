import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";

// Isolated local production server: external delivery is deliberately disabled.
const port = 3187;
let server;
before(async () => {
  const env = {
    ...process.env,
    RESEND_API_KEY: "",
    RESEND_FROM_EMAIL: "",
    RESEND_TO_EMAIL: "",
    SUPABASE_SERVICE_ROLE_KEY: "",
    NEXT_PUBLIC_SUPABASE_URL: "",
  };
  server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "-p",
      String(port),
      "-H",
      "127.0.0.1",
    ],
    { env, stdio: "ignore", windowsHide: true },
  );
  for (let i = 0; i < 80; i++) {
    try {
      if ((await fetch(`http://127.0.0.1:${port}`)).ok) return;
    } catch {}
    await setTimeout(250);
  }
  throw new Error("Production test server did not start");
});
after(() => server?.kill());
const get = (path) => fetch(`http://127.0.0.1:${port}${path}`);
test("all existing public routes render without unsupported public content", async () => {
  const routes = [
    "/",
    "/apartments",
    "/apartments/zambezi-suite",
    "/apartments/family-suite",
    "/apartments/batoka-suite",
    "/apartments/apartment-one",
    "/apartments/apartment-two",
    "/apartments/apartment-three",
    "/experiences",
    "/experiences/chobe-day-trip",
    "/experiences/victoria-falls-tour",
    "/experiences/village-cultural-visit",
    "/victoria-falls",
    "/faq",
    "/contact",
    "/corporate-stays-victoria-falls",
    "/family-group-accommodation-victoria-falls",
  ];
  for (const path of routes) {
    const res = await get(path);
    assert.equal(res.status, 200, path);
    const html = await res.text();
    assert.doesNotMatch(
      html,
      /\[PLACEHOLDER|TBC|TBD|Lorem ipsum|personally vetted|Best direct rate guaranteed|images\.unsplash\.com|wa\.me\/263770000000/i,
      path,
    );
    assert.match(html, /<h1[ >]/, path);
    assert.match(html, /rel="canonical"/, path);
    assert.doesNotMatch(html, /og-image\.jpg|src="\/logo\.png"/, path);
  }
});
test("availability parameters prefill the enquiry", async () => {
  const html = await (
    await get(
      "/contact?arrival=2099-06-01&departure=2099-06-03&guests=4&preference=Family",
    )
  ).text();
  for (const value of ["2099-06-01", "2099-06-03", "Family"])
    assert.ok(html.includes(value));
});
test("unknown accommodation is a 404 and unpublished units are not indexed", async () => {
  assert.equal((await get("/apartments/not-a-real-unit")).status, 404);
  const html = await (await get("/apartments/apartment-one")).text();
  assert.match(html, /noindex/);
  const sitemap = await (await get("/sitemap.xml")).text();
  assert.doesNotMatch(sitemap, /zambezi-suite|family-suite|batoka-suite/);
  assert.equal((await get("/robots.txt")).status, 200);
});
test("enquiry API rejects invalid submissions and never reports undelivered success", async () => {
  const submit = (body) =>
    fetch(`http://127.0.0.1:${port}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  assert.equal((await submit({})).status, 422);
  const res = await submit({
    name: "Test Guest",
    email: "guest@example.org",
    arrivalDate: "2099-06-01",
    departureDate: "2099-06-03",
    guests: 2,
  });
  assert.equal(res.status, 503);
  assert.equal((await res.json()).success, undefined);
});
