// offline support: newest version when online, saved copy when offline
var C='marimo-'+"60525bca";
var FILES=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES)}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;
  e.respondWith(fetch(r).then(function(res){if(res.ok&&new URL(r.url).origin===location.origin){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}return res}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(h){return h||caches.match('index.html')})}))});
