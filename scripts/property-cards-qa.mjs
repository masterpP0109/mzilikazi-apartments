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
    console.log("Checking " + url);
    const previousOrigin = await evaluate("performance.timeOrigin");
    await send("Page.navigate", { url: "http://127.0.0.1:" + port + url });
    await waitFor(() => evaluate("performance.timeOrigin !== " + previousOrigin));
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



  for (const width of [390,768,1440]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});
    await go('/');
    for (const selector of ['#stay-types','#apartments']) {
      const expected=selector === '#stay-types' ? 4 : 3;
      assert.equal(await evaluate('document.querySelectorAll('+JSON.stringify(selector+' img')+').length'),expected);
      for(let index=0;index<expected;index++) {
        await evaluate('document.querySelectorAll('+JSON.stringify(selector+' img')+')['+index+'].scrollIntoView({behavior:"instant",block:"center"})');
        await waitFor(()=>evaluate('document.querySelectorAll('+JSON.stringify(selector+' img')+')['+index+'].naturalWidth > 0'));
      }
      assert.ok(await evaluate('Array.from(document.querySelectorAll('+JSON.stringify(selector+' img')+')).every(i=>i.alt && i.loading === "lazy")'));
      await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({behavior:"instant"})');
      await screenshot('property-cards-'+selector.slice(1)+'-'+width);
    }
    assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth+1'));
    assert.equal(await evaluate('Array.from(document.querySelectorAll("#apartments a")).filter(a=>a.getAttribute("href").startsWith("/apartments/")).length'),3);
    await go('/apartments');
    assert.equal(await evaluate('document.querySelectorAll(".accommodation-card img").length'),3);
    assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth+1'));
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: seven homepage property photos; apartment-page previews; lazy loading, alt text, preserved suite links; 390/768/1440px; no overflow or runtime errors.');
} finally {
  socket?.close();
  browser.kill();
  server.kill();
}
