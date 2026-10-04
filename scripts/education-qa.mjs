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



  const contentSource = await (await import('node:fs/promises')).readFile('components/mzilikazi-story/content.ts','utf8');
  const content=JSON.parse(contentSource.slice(contentSource.indexOf('= ')+2).replace(/ as const;\s*$/, ''));
  const normalize=text=>text.replace(/\s+/g,' ').trim();
  const copy=[content.intro,...content.chapters,...content.travellers,content.philosophy,content.trust].flatMap(chapter=>chapter.paragraphs.map(p=>p.text));
  for(const width of [320,360,375,390,430,768,1440]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768});
    await go('/');
    assert.equal(await evaluate('document.querySelector("#hero").nextElementSibling.id'),'welcome-to-mzilikazi');
    assert.equal(await evaluate('document.querySelector("#welcome-to-mzilikazi").nextElementSibling.id'),'apartments');
    const text=normalize(await evaluate('document.querySelector("#welcome-to-mzilikazi").innerText'));
    for(const paragraph of copy) assert.ok(text.includes(normalize(paragraph)), 'Missing supplied copy: '+paragraph);
    assert.equal(await evaluate('document.querySelectorAll(".education-questions li").length'),4);
    assert.equal(await evaluate('document.querySelectorAll(".education-traveller").length'),4);
    assert.equal(await evaluate('document.querySelectorAll(".education-decision-list li").length'),4);
    assert.deepEqual(await evaluate('Array.from(document.querySelectorAll(".education-actions a")).map(a=>a.getAttribute("href"))'),['/apartments','/contact','/plan']);
    assert.equal(await evaluate('document.querySelectorAll("#apartments").length'),1);
    assert.ok(await evaluate('Array.from(document.querySelectorAll(".mzilikazi-education .education-image img")).every(i=>i.alt && i.loading === "lazy")'));
    assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth+1'), 'Overflow at '+width);
    const headings=await evaluate('Array.from(document.querySelectorAll("main h1, main h2, main h3, main h4")).map(h=>Number(h.tagName.slice(1)))');
    for(let i=1;i<headings.length;i++) assert.ok(headings[i]<=headings[i-1]+1,'Skipped heading level at '+width);
    if([320,390,768,1440].includes(width)) {
      for(const [name,selector] of [['intro','.education-intro'],['self-catering','#mzilikazi-self-catering'],['travellers','.education-travellers'],['statement','.education-photo-statement'],['decision','.education-decision']]) {
        await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({behavior:"instant"})');
        await delay(300);
        const hasImage=await evaluate('!!document.querySelector('+JSON.stringify(selector)+'+" img")');
        if(hasImage) await waitFor(()=>evaluate('document.querySelector('+JSON.stringify(selector)+'+" img").naturalWidth>0'));
        await screenshot('education-'+name+'-'+width);
      }
    }
  }
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await go('/');
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".education-image")).position'),'static');
  await evaluate('document.querySelector(".education-photo-statement").scrollIntoView({behavior:"instant"})');
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".education-photo-statement .story-panel")).animationName'),'none');
  await evaluate('document.querySelector(".education-actions a").focus()');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
  assert.equal(await evaluate('document.activeElement.textContent'),'Check Availability');
  await send('Emulation.setScriptExecutionDisabled',{value:true});
  const previousOrigin=await evaluate('performance.timeOrigin');
  await send('Page.navigate',{url:'http://127.0.0.1:'+port+'/'});
  await waitFor(()=>evaluate('performance.timeOrigin !== '+previousOrigin+' && !!document.querySelector(".education-decision")'));
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".mzilikazi-education")).display'),'block');
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".education-photo-statement .bg-section__content")).opacity'),'1');
  assert.deepEqual(errors,[]);
  const report={widths:[320,360,375,390,430,768,1440],copyParagraphs:copy.length,checks:['hero then education then accommodation','all supplied paragraphs preserved','four planning questions/traveller blocks/decision blocks','CTA routes and unique apartment anchor','lazy photos and alt text','logical headings','no overflow','reduced motion','keyboard CTA access','JavaScript-disabled content'],runtimeErrors:errors};
  await writeFile(path.join(artifacts,'education-report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
} finally {
  socket?.close();
  browser.kill();
  server.kill();
}
