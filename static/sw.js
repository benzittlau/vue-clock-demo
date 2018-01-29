var CACHE_NAME = 'vue-clock-demo-static-v1';
var urlsToCache = [
  '/',
  '/app.js',
  '/clock.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  console.log(`Checking cache for resource '${event.request.url}'`);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // TODO: How to avoid this proxying when
        // trying to simulate offline other
        // than having to kill the server
        return fetch(event.request);
      }
    )
  );
});
