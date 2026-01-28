const CACHE_NAME = 'ciudadana-v1'; 
const urlsToCache = ['/', '/index.html']; 
self.addEventListener('install', event => { 
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); 
}); 
self.addEventListener('fetch', event => { 
  if (event.request.method !== 'GET') return; 
  if (event.request.url.includes('.onrender.com')) { 
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request))); 
    return; 
  } 
}); 
