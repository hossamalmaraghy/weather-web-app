// serviceWorker.js

const CACHE_NAME = 'weather-web-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style/styles.css',
  '/style/_breakpoints.css',
  '/bundle.js', 
];

// Install event: Cache the necessary files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Serve files from the cache first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return new Response('Offline fallback: Resource not available');
      });
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Delete outdated caches
          }
        })
      );
    })
  );
});
