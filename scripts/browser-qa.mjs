// Isolated local Chrome QA; never uses a personal browser profile or sends enquiries.
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
const artifacts = path.resolve(".qa");
await mkdir(artifacts, { recursive: true });
const chrome =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 3190;
const cdpPort = 9239;
const env = {
  ...process.env,
  RESEND_API_KEY: "",
  RESEND_FROM_EMAIL: "",
  RESEND_TO_EMAIL: "",
  SUPABASE_SERVICE_ROLE_KEY: "",
  NEXT_PUBLIC_SUPABASE_URL: "",
};
const server = spawn(
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
const browser = spawn(
  chrome,
  [
    "--headless=new",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--remote-debugging-port=" + cdpPort,
    "--user-data-dir=" + path.join(artifacts, "chrome-profile"),
    "about:blank",
  ],
  { stdio: "ignore", windowsHide: true },
);
let socket;
const errors = [];
async function waitFor(fn) {
  for (let i = 0; i < 100; i++) {
    try {
      const value = await fn();
      if (value) return value;
    } catch {}
    await delay(150);
  }
  throw new Error("Timed out waiting for QA state");
}
try {
  await waitFor(async () => (await fetch("http://127.0.0.1:" + port)).ok);
  const targets = await waitFor(async () => {
    const r = await fetch("http://127.0.0.1:" + cdpPort + "/json");
    return r.ok ? await r.json() : null;
  });
  const target = targets.find((t) => t.type === "page");
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => {
    socket.addEventListener("open", r, { once: true });
    socket.addEventListener("error", j, { once: true });
  });
  let counter = 0;
  const pending = new Map();
  socket.addEventListener("message", ({ data }) => {
    const m = JSON.parse(data);
    if (m.id) {
      const call = pending.get(m.id);
      if (call) {
        pending.delete(m.id);
        if (m.error) call.reject(new Error(m.error.message));
        else call.resolve(m.result);
      }
    } else if (m.method === "Runtime.exceptionThrown")
      errors.push(
        m.params.exceptionDetails.text +
          ": " +
          (m.params.exceptionDetails.exception?.description || ""),
      );
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++counter;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (pending.has(id)) {
          pending.delete(id);
          reject(new Error("CDP timeout: " + method));
        }
      }, 10000).unref();
    });
  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (r.exceptionDetails)
      throw new Error(
        r.exceptionDetails.exception?.description || r.exceptionDetails.text,
      );
    return r.result.value;
  };
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Network.setBlockedURLs", {
    urls: ["*googletagmanager.com/*", "*google-analytics.com/*"],
  });
  await send("Page.enable");
  const go = async (url) => {
    await send("Page.navigate", { url: "http://127.0.0.1:" + port + url });
    await waitFor(() =>
      evaluate(
        'document.readyState === "complete" && !!document.querySelector("h1") && !!document.querySelector(".my-trip-button")',
      ),
    );
    await waitFor(() =>
      evaluate(
        '!document.querySelector("button[disabled].text-link, .planner-flow button[disabled]")',
      ),
    );
    await delay(200);
  };
  const click = async (text, scope = 'document.querySelector("main")') => {
    await evaluate(
      "(()=>{const el=Array.from(" +
        scope +
        '.querySelectorAll("button")).find(e=>e.textContent.trim()===' +
        JSON.stringify(text) +
        ');if(!el)throw new Error("Missing button: ' +
        text +
        '");el.click()})()',
    );
    await delay(150);
  };
  const screenshot = async (name) => {
    await evaluate(
      "new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))",
    );
    const image = await send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    await writeFile(
      path.join(artifacts, name + ".png"),
      Buffer.from(image.data, "base64"),
    );
  };
  await go("/");
  await evaluate('localStorage.removeItem("mzilikazi-trip-v1")');
  await send("Page.reload");
  await waitFor(() =>
    evaluate(
      'document.querySelector(".my-trip-button")?.textContent.includes("0")',
    ),
  );
  const routes = [
    "/",
    "/apartments",
    "/apartments/apartment-one",
    "/experiences",
    "/plan",
    "/plan/itineraries/three-nights",
    "/victoria-falls",
    "/victoria-falls/first-time",
    "/faq",
    "/our-story",
    "/contact",
  ];
  const widths = process.argv.includes("--journey-only")
    ? []
    : [320, 360, 390, 430, 768, 1280, 1440];
  for (const width of widths) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    for (const route of routes) {
      await go(route);
      const dimensions = await evaluate(
        "({width:innerWidth,scroll:document.documentElement.scrollWidth})",
      );
      assert.ok(
        dimensions.scroll <= dimensions.width + 1,
        route + " overflows at " + width + ": " + JSON.stringify(dimensions),
      );
    }
    await go("/");
    await screenshot("homepage-" + width);
  }
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await go("/experiences");
  await click("Wildlife");
  assert.equal(
    await evaluate('document.querySelectorAll(".experience-row").length'),
    1,
  );
  await click("+ Add to My Trip");
  await waitFor(() =>
    evaluate(
      'document.querySelector(".my-trip-button").textContent.includes("1")',
    ),
  );
  await go("/plan/itineraries/three-nights");
  await click("+ Add to My Trip");
  await send("Page.reload");
  await waitFor(() =>
    evaluate(
      'document.querySelector(".my-trip-button")?.textContent.includes("2")',
    ),
  );
  await go("/plan?traveller=Family");
  await evaluate(
    'Array.from(document.querySelector("main").querySelectorAll("input[type=radio]")).find(i=>i.value==="Family").click()',
  );
  await click("Continue →");
  const setNumber = async (label, value) => {
    await evaluate(
      '(()=>{const el=Array.from(document.querySelector("main").querySelectorAll("label")).find(l=>l.textContent.trim()===' +
        JSON.stringify(label) +
        ').querySelector("input");Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set.call(el,' +
        JSON.stringify(value) +
        ');el.dispatchEvent(new Event("input",{bubbles:true}));el.dispatchEvent(new Event("change",{bubbles:true}))})()',
    );
    await delay(100);
  };
  await setNumber("Adults", "3");
  await setNumber("Children", "1");
  await click("Continue →");
  await click("Continue →");
  await evaluate(
    'Array.from(document.querySelector("main").querySelectorAll("label")).find(l=>l.textContent.trim()==="Wildlife").querySelector("input").click()',
  );
  await click("Continue →");
  await click("See my starting point →");
  assert.ok(
    await evaluate(
      'document.querySelector("main .planner-flow").textContent.includes("Victoria Falls + Wildlife")',
    ),
  );
  assert.ok(
    await evaluate(
      'Array.from(document.querySelector("main").querySelectorAll("button")).filter(b=>b.textContent.includes("My Trip")).every(b=>b.type==="button")',
    ),
  );
  await click("✓ Saved to My Trip");
  await click("+ Add to My Trip");
  assert.ok(
    await evaluate(
      'document.querySelector("main .planner-flow").textContent.includes("Step 6 of 6")',
    ),
  );
  await click("Send My Plan to Mzilikazi");
  assert.equal(
    await evaluate('document.querySelector("main input[type=number]").value'),
    "4",
  );
  assert.ok(
    await evaluate(
      'document.querySelector("main textarea").value.includes("A day in Chobe.")',
    ),
  );
  assert.ok(
    await evaluate(
      'document.querySelector("main textarea").value.includes("Still deciding")',
    ),
  );
  await screenshot("planner-enquiry-mobile");
  await go("/experiences");
  await click("My Trip · 2", "document");
  assert.ok(await evaluate('!!document.querySelector("dialog[open]")'));
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await waitFor(() => evaluate('!document.querySelector("dialog[open]")'));
  await click("My Trip · 2", "document");
  await click(
    "Send My Trip to Mzilikazi",
    'document.querySelector("dialog[open]")',
  );

  assert.ok(
    await evaluate(
      'document.querySelector("dialog[open] textarea").value.includes("Victoria Falls + Wildlife")',
    ),
  );
  await evaluate(
    "document.querySelector('[aria-label=\"Close My Trip\"]').click()",
  );
  await evaluate('localStorage.setItem("mzilikazi-trip-v1","broken-json")');
  await send("Page.reload");
  await waitFor(() =>
    evaluate(
      'document.querySelector(".my-trip-button")?.textContent.includes("0")',
    ),
  );
  await waitFor(() =>
    evaluate('!document.querySelector("main button[disabled].text-link")'),
  );
  await click("My Trip · 0", "document");
  assert.ok(
    await evaluate(
      'document.querySelector("dialog[open]").textContent.includes("Saved ideas could not be loaded")',
    ),
  );
  assert.deepEqual(errors, [], "Browser runtime exceptions");
  const report = {
    widths,
    routes: widths.length ? routes.length : 0,
    checks: [
      ...(widths.length ? ["no horizontal overflow"] : []),
      "planner save controls do not submit",
      "experience filtering",
      "save and reload trip items",
      "six-step planner",
      "travellers and saved ideas passed to enquiry",
      "flexible dates",
      "native dialog Escape",
      "corrupt localStorage recovery",
    ],
    runtimeErrors: errors,
  };
  await writeFile(
    path.join(
      artifacts,
      widths.length ? "browser-report.json" : "browser-journey-report.json",
    ),
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  socket?.close();
  browser.kill();
  server.kill();
}
