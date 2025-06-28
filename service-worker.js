 const cacheName = "pokemon-task-cache-v1";
const assets = [
  "/",
  "/index.html",
  "/login.html",
  "/signup.html",
  "/style.css",
  "/script.js",
  "/auth.js",
  "/manifest.json",
  "/service-worker.js",
  "/stats.html"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});



