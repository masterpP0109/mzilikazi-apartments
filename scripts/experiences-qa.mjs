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
  await send("Page.bringToFront");
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




  const slugs=['victoria-falls-tour','sunset-cruise','boma-dinner','game-drive','chobe-day-trip','bungee-jump','zip-line'];
  const titles=['Tour of the Falls','Sunset Cruise','The Boma Dinner','Game Drive','Chobe Day Trip','Bungee Jump','Zip Line'];
  const noOverflow=()=>evaluate('document.documentElement.scrollWidth<=innerWidth+1');
  const loaded=()=>evaluate('Array.from(document.querySelectorAll(".experience-hero img")).every(i=>i.complete && i.naturalWidth>0)');
  for(const width of [320,390,768,1440]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});
    await go('/');
    assert.equal(await evaluate('document.querySelectorAll("#experiences .experience-card").length'),7);
    assert.equal(await evaluate('!!document.querySelector(".mzilikazi-story") || !!document.querySelector("#welcome-to-mzilikazi")'),true);
    await evaluate('document.getElementById("experiences").scrollIntoView({behavior:"instant"})');
    await screenshot('educational-experiences-home-'+width);
    assert.ok(await noOverflow());
    await go('/experiences');
    assert.equal(await evaluate('document.querySelectorAll(".experience-card").length'),8);
    assert.equal(await evaluate('document.querySelectorAll(".experience-card img").length'),7);
    assert.equal(await evaluate('document.querySelectorAll(".experience-fallback").length'),1);
    assert.ok(await evaluate('Array.from(document.querySelectorAll(".experience-card img")).every(i=>i.alt && i.loading==="lazy")'));
    const count=await evaluate('getComputedStyle(document.querySelector(".experience-grid")).gridTemplateColumns.split(" ").length');
    assert.equal(count,width<640?1:width<1024?2:3);
    await evaluate('document.querySelector(".experience-grid").scrollIntoView({behavior:"instant"})');
    await screenshot('educational-experiences-grid-'+width);
    assert.ok(await noOverflow());
    await evaluate('document.querySelector(".where-to-stay").scrollIntoView({behavior:"instant"})');
    await screenshot('educational-where-to-stay-'+width);
    assert.ok(await noOverflow());
    await evaluate('Array.from(document.querySelectorAll(".filter-options button")).find(b=>b.textContent==="Adventure").click()');
    await waitFor(()=>evaluate('document.querySelectorAll(".experience-card").length===2'));
    assert.deepEqual(await evaluate('Array.from(document.querySelectorAll(".experience-card h2")).map(e=>e.textContent)'),['Bungee Jump','Zip Line']);
    await evaluate('Array.from(document.querySelectorAll(".filter-options button")).find(b=>b.textContent==="Dining").click()');
    await waitFor(()=>evaluate('document.querySelectorAll(".experience-card").length===1'));
    assert.equal(await evaluate('document.querySelector(".experience-card h2").textContent'),'The Boma Dinner');
    await go('/apartments');
    assert.equal(await evaluate('document.querySelectorAll(".accommodation-card").length'),3);
    assert.equal(await evaluate('document.querySelectorAll(".accommodation-card button").length'),0);
    assert.equal(await evaluate('document.querySelector(".floating-stay a").getAttribute("href")'),'/apartments');
    assert.ok(await noOverflow());
  }
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:true});
  for(let index=0;index<slugs.length;index++) {
    await go('/experiences/'+slugs[index]);
    assert.equal(await evaluate('document.querySelector("h1").textContent'),titles[index]);
    assert.equal(await evaluate('document.querySelectorAll(".experience-detail-copy > section").length'),11);
    assert.equal(await evaluate('document.querySelectorAll(".faq-list details").length'),3);
    await evaluate('document.querySelector(".experience-hero .image-frame").scrollIntoView({behavior:"instant"})');
    await waitFor(loaded);
    assert.ok(await noOverflow());
    const href=await evaluate('document.querySelector(".experience-enquiry a").getAttribute("href")');
    const query=new URL(href,'http://localhost').searchParams;
    assert.equal(query.get('experience'),slugs[index]);
    assert.equal(query.get('message'),index===6 ? "Hi, I’m interested in "+titles[index]+" during my stay at Mzilikazi. Please share the current price, availability and what is included." : "Hi, I’m interested in "+titles[index]+". I saw the starting price on the Mzilikazi website and would like to confirm the current price and availability.");
    await evaluate('document.querySelector(".faq-list summary").scrollIntoView({behavior:"instant"});document.querySelector(".faq-list summary").focus()');
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});
    await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    await waitFor(()=>evaluate('document.querySelector(".faq-list details").open'));
    await evaluate('document.querySelector(".experience-enquiry").scrollIntoView({behavior:"instant"})');
    await waitFor(()=>evaluate('document.querySelector(".floating-stay").hidden'));
    if(index===0)await screenshot('educational-experience-detail-mobile');
    await go(href);
    assert.equal(await evaluate('document.querySelector("textarea[name=message]").value'),query.get('message'));
    assert.equal(await evaluate('document.querySelector("input[name=apartmentPreference]").value'),'Experience: '+titles[index]);
    assert.ok(await evaluate('document.querySelector("h1").textContent.includes('+JSON.stringify(titles[index])+')'));
  }
  await go('/contact?preference=Family%20Suite&arrival=2026-12-01&departure=2026-12-04&guests=4');
  assert.equal(await evaluate('document.querySelector("input[name=apartmentPreference]").value'),'Family Suite');
  assert.equal(await evaluate('document.querySelector("input[name=arrivalDate]").value'),'2026-12-01');
  assert.equal(await evaluate('document.querySelector("input[name=guests]").value'),'4');
  assert.equal(await evaluate('document.querySelector("h1").textContent'),'Your Victoria Falls stay starts here.');
  await go('/experiences/village-cultural-visit');
  assert.equal(await evaluate('document.querySelector("h1").textContent'),'Beyond the postcard.');
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await go('/experiences');
  await evaluate('document.querySelector(".experience-card .text-link").focus()');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r'});
  await waitFor(()=>evaluate('location.pathname === "/experiences/victoria-falls-tour" && document.querySelector("h1").textContent === "Tour of the Falls"'));
  assert.deepEqual(errors,[]);
  console.log('PASS: seven photo experiences, preserved cultural visit, responsive grids, all detail pages and image loads, keyboard FAQs/navigation, exact enquiry prefills, unchanged room enquiry values, floating CTA clear of enquiry buttons, reduced motion, no overflow/runtime errors.');
} finally {
  socket?.close(); browser.kill(); server.kill();
}
