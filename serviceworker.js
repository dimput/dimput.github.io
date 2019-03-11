var CACHE_NAME = 'monster-university-web-cache-v1';
var urlsToCache = [
  '/',
  '/css/main.css',
  '/js/main.js',
  '/images/logo-monster.png',
  '/js/jquery.min.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache',cache);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

self.addEventListener('activate', function(event) {  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName){
              return cacheName != CACHE_NAME
          }).map(function(cacheName){
              return caches.delete(cacheName)
          })
        );
      })
    );
  });