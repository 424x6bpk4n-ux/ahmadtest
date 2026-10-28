// Offline cache for the CXR Tuberculosis 2021 web app.
// Everything is cached on first visit; afterwards the app opens without internet.
const CACHE = 'cxr-tb-2021-174c3ab8ab29';
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg", "images/6.jpg", "images/7.jpg", "images/8.jpg", "images/9.jpg", "images/10.jpg", "images/11.jpg", "images/12.jpg", "images/13.jpg", "images/14.jpg", "images/15.jpg", "images/16.jpg", "images/17.jpg", "images/18.jpg", "images/19.jpg", "images/20.jpg", "images/21.jpg", "images/22.jpg", "images/23.jpg", "images/24.jpg", "images/25.jpg", "images/26.jpg", "images/27.jpg", "images/28.jpg", "images/29.jpg", "images/30.jpg", "images/31.jpg", "images/32.jpg", "images/33.jpg", "images/34.jpg", "images/35.jpg", "images/36.jpg", "images/37.jpg", "images/38.jpg", "images/39.jpg", "images/40.jpg", "images/41.jpg", "images/42.jpg", "images/43.jpg", "images/44.jpg", "images/45.jpg", "images/46.jpg", "images/47.jpg", "images/48.jpg", "images/49.jpg", "images/50.jpg", "images/51.jpg", "images/52.jpg", "images/53.jpg", "images/54.jpg", "images/55.jpg", "images/56.jpg", "images/57.jpg", "images/58.jpg", "images/59.jpg", "images/60.jpg", "images/61.jpg", "images/62.jpg", "images/63.jpg", "images/64.jpg", "images/65.jpg", "images/66.jpg", "images/67.jpg", "images/68.jpg", "images/69.jpg", "images/70.jpg", "images/71.jpg", "images/72.jpg", "images/73.jpg", "images/74.jpg", "images/75.jpg", "images/76.jpg", "images/77.jpg", "images/78.jpg", "images/79.jpg", "images/80.jpg", "images/81.jpg", "images/82.jpg", "images/83.jpg", "images/84.jpg", "images/85.jpg", "images/86.jpg", "images/87.jpg", "images/88.jpg", "images/89.jpg", "images/90.jpg", "images/91.jpg", "images/92.jpg", "images/93.jpg", "images/94.jpg", "images/95.png", "images/96.png", "images/97.png", "images/98.jpg", "images/99.jpg"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('cxr-tb-2021-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok && new URL(req.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => (req.mode === 'navigate' ? caches.match('index.html') : Response.error()));
    })
  );
});
