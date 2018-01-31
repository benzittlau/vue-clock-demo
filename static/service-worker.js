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
  console.log('Service worker now ready to handle fetches!');
});

self.addEventListener('fetch', function(event) {
  // Avoid sockjs noise in our cache
  if(event.request.url.match(/sockjs/)) { return }

  console.log(`Checking cache for resource: '${event.request.url}'`);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log(`Cache hit for resource: '${event.request.url}'`)
          return response;
        }

        return fetch(event.request).then(function(response) {
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
          });

          return response.clone();
        });
      }
    )
  );
});

self.addEventListener('message', function(event){
  console.log(`Removing entry from cache for resource url: '${event.data.url}'`)
  caches.open(CACHE_NAME).then(function(cache) {
    cache.delete(event.data.url);
  })
});
