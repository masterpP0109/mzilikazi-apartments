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





  const slugs=['victoria-falls-tour','sunset-cruise','boma-dinner','game-drive','chobe-day-trip','bungee-jump','zip-line','village-cultural-visit'];
  const prices=[55,85,55,75,185,160,null,45];
  const noOverflow=()=>evaluate('document.documentElement.scrollWidth<=innerWidth+1');
  const key=async(name,code,number)=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:name,code,windowsVirtualKeyCode:number,...(name==='Enter'?{text:'\r'}:{})});await send('Input.dispatchKeyEvent',{type:'keyUp',key:name,code,windowsVirtualKeyCode:number});};
  const click=async(selector)=>{
    await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({behavior:"instant",block:"center"})');
    const point=await evaluate('(()=>{const r=document.querySelector('+JSON.stringify(selector)+').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()');
    await send('Input.dispatchMouseEvent',{type:'mousePressed',...point,button:'left',clickCount:1});
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',...point,button:'left',clickCount:1});
  };
  for(const width of [320,390,768,1440]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});
    await go('/experiences');
    assert.equal(await evaluate('document.querySelectorAll(".experience-card-link").length'),8);
    const labels=await evaluate('Array.from(document.querySelectorAll(".experience-card .experience-price-label")).map(e=>e.textContent)');
    assert.deepEqual(labels,prices.map(p=>p==null?'Indicative price not yet verified':'From US$'+p+' per person'));
    assert.ok(await evaluate('document.querySelector(".experience-other").textContent.includes("not an exhaustive list")'));
    await click('.experience-card .image-frame');
    await waitFor(()=>evaluate('location.pathname === "/experiences/victoria-falls-tour" && document.querySelector("h1").textContent === "Victoria Falls Guided Tour"'));
    await waitFor(()=>evaluate('document.querySelector(".experience-hero img").complete && document.querySelector(".experience-hero img").naturalWidth>0'));
    assert.ok(await noOverflow());
    await screenshot('experience-guide-hero-'+width);
    await evaluate('document.querySelector(".experience-gallery-grid").scrollIntoView({behavior:"instant"})');
    await waitFor(()=>evaluate('Array.from(document.querySelectorAll(".experience-gallery-grid img")).every(i=>i.complete && i.naturalWidth>0)'));
    await screenshot('experience-guide-gallery-'+width);
    await click('.experience-gallery-grid button');
    await waitFor(()=>evaluate('!!document.querySelector(".experience-lightbox[open]")'));
    await waitFor(()=>evaluate('document.querySelector(".experience-lightbox-image img").naturalWidth>0'));
    assert.equal(await evaluate('document.activeElement.getAttribute("aria-label")'),'Close gallery');
    try { await waitFor(()=>evaluate('document.body.style.overflow === "hidden" && document.querySelector(".floating-stay").hidden')); }
    catch(error) { console.log(await evaluate('({overflow:document.body.style.overflow, floating:document.querySelector(".floating-stay").hidden, dialogs:document.querySelectorAll("dialog[open]").length,path:location.pathname,focus:document.activeElement.outerHTML})')); await screenshot('gallery-state-debug'); throw error; }
    await key('ArrowRight','ArrowRight',39);
    await waitFor(()=>evaluate('document.querySelector(".experience-lightbox .dialog-header").textContent.includes("2 / 4")'));
    await key('ArrowLeft','ArrowLeft',37);
    await waitFor(()=>evaluate('document.querySelector(".experience-lightbox .dialog-header").textContent.includes("1 / 4")'));
    for(let i=0;i<6;i++)await key('Tab','Tab',9);
    assert.ok(await evaluate('!!document.activeElement.closest(".experience-lightbox")'));
    if(width<768) {
      const point=await evaluate('(()=>{const r=document.querySelector(".experience-lightbox-image").getBoundingClientRect();return {x:r.x+r.width*.8,y:r.y+r.height/2}})()');
      await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...point,id:0}]});
      await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...point,x:point.x-100,id:0}]});
      await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await waitFor(()=>evaluate('document.querySelector(".experience-lightbox .dialog-header").textContent.includes("2 / 4")'));
    }
    await screenshot('experience-guide-lightbox-'+width);
    assert.ok(await noOverflow());
    await key('Escape','Escape',27);
    await waitFor(()=>evaluate('!document.querySelector("dialog[open]") && document.body.style.overflow !== "hidden"'));
    assert.ok(await evaluate('document.activeElement === document.querySelector(".experience-gallery-grid button")'));
    await go('/experiences');
    const before=await evaluate('document.querySelector(".experience-card button").getAttribute("aria-pressed")');
    await click('.experience-card button');
    await waitFor(()=>evaluate('document.querySelector(".experience-card button").getAttribute("aria-pressed") !== '+JSON.stringify(before)));
    assert.equal(await evaluate('location.pathname'),'/experiences');
    await click('.experience-card button');
  }
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:true});
  for(let i=0;i<slugs.length;i++) {
    await go('/experiences/'+slugs[i]);
    assert.equal(await evaluate('document.querySelector(".experience-hero .experience-price-label").textContent'),prices[i]==null?'Indicative price not yet verified':'From US$'+prices[i]+' per person');
    assert.equal(await evaluate('document.querySelectorAll(".experience-facts > div").length'),4);
    assert.equal(await evaluate('document.querySelectorAll(".experience-related .experience-card").length'),3);
    assert.ok(await evaluate('document.querySelector(".experience-other").textContent.includes("not an exhaustive list")'));
    assert.ok(await noOverflow());
    if(i<7) {
      const headings=await evaluate('Array.from(document.querySelectorAll(".experience-detail-copy h2")).map(h=>h.textContent)');
      for(const title of ['Overview','What to Expect','Usually Included','Possible Additional Costs','Good For','Before You Go','Gallery'])assert.ok(headings.includes(title),slugs[i]+': '+title);
      assert.ok(await evaluate('document.querySelectorAll(".experience-timeline li").length >= 5'));
      assert.ok(await evaluate('!Array.from(document.querySelectorAll(".experience-hero a")).some(a=>a.href.includes("/contact") || a.href.includes("wa.me"))'));
      assert.ok(await evaluate('!document.querySelector(".experience-detail-copy").textContent.match(/ask (?:the )?operator|contact (?:the )?operator|more information (?:available )?on request/i)'));
      assert.equal(await evaluate('document.querySelectorAll(".experience-gallery-grid button").length'),4);
      for(let image=0;image<4;image++) {
        await evaluate('document.querySelectorAll(".experience-gallery-grid button")['+image+'].click()');
        await waitFor(()=>evaluate('document.querySelector(".experience-lightbox-image img").complete && document.querySelector(".experience-lightbox-image img").naturalWidth>0'));
        assert.ok(await evaluate('document.querySelector(".experience-lightbox-image img").alt.length>0'));
        await evaluate('document.querySelector(".experience-lightbox .gallery-controls button:last-child").click()');
        await evaluate('document.querySelector(".experience-lightbox .gallery-controls button:first-child").click()');
        await evaluate('document.querySelector(".experience-lightbox .dialog-header button").click()');
        await waitFor(()=>evaluate('!document.querySelector("dialog[open]")'));
      }
    } else assert.ok(await evaluate('!!document.querySelector(".experience-gallery-empty")'));
    const whatsapp=await evaluate('Array.from(document.querySelectorAll(".experience-enquiry a")).find(a=>a.href.includes("wa.me"))?.getAttribute("href") || null');
    if(whatsapp)assert.ok(new URL(whatsapp).searchParams.get('text').includes(await evaluate('document.querySelector("h1").textContent')));
  }
  const other=await evaluate('document.querySelector(".experience-other .button").getAttribute("href")');
  await go(other);
  assert.equal(await evaluate('document.querySelector("h1").textContent'),'Ask about another experience');
  assert.equal(await evaluate('document.querySelector("input[name=apartmentPreference]").value'),'Experience: Another activity');
  assert.ok(await evaluate('document.querySelector("textarea[name=message]").value.includes("another activity")'));
  assert.deepEqual(errors,[]);
  console.log('PASS: whole-card image clicks and independent save buttons, verified pricing/fallbacks, eight routes, all 28 gallery photos, keyboard/lightbox focus/close/scroll lock, mobile swipe, related cards, other-activity enquiry, readable responsive layouts and no overflow/runtime errors.');
} finally { socket?.close(); browser.kill(); server.kill(); }
