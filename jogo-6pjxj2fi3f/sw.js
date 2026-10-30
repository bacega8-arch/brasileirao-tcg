/* Guarda o jogo no celular pra abrir até sem internet. Troque a versão quando o jogo mudar. */
const V="brasileirao-cards-v23";
const FILES=["./","index.html","manifest.webmanifest","icone-192.png","icone-512.png","icone-180.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));});
