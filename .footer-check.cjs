(async()=>{
 const base='http://localhost:3000';
 for(const route of ['/', '/mzilikazi%20imgs/mzilikazi-logo.webp','/_next/image?url=%2Fmzilikazi%2520imgs%2Fmzilikazi-logo.webp&w=256&q=75']) {
  try {const res=await fetch(base+route,{signal:AbortSignal.timeout(10000)});console.log(route,res.status,res.headers.get('content-type'));if(route==='/'){const html=await res.text();const at=html.indexOf('<footer');console.log(html.slice(at,at+4000));}}catch(e){console.log(e.message);}
 }
})();
