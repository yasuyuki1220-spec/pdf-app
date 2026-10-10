// 更新したら VERSION を変えると、利用者の端末にも新しい版が届きます
const VERSION="pdfapp-v56";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
const LIBS=["https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js","https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js","https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js","https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/tesseract.min.js","https://cdn.jsdelivr.net/npm/utif@3.1.0/UTIF.js"];
self.addEventListener("install",e=>{e.waitUntil((async()=>{const c=await caches.open(VERSION);await c.addAll(SHELL);await Promise.allSettled(LIBS.map(u=>c.add(new Request(u,{mode:"no-cors"}))));self.skipWaiting()})())});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const put=res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return res};
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(put).catch(()=>caches.match("./index.html")));return}
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(put)))});
