const CACHE_NAME = 'percentage-calculator-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Sounds
  '/sounds/click.mp3',
  '/sounds/transmission.mp3',
  '/sounds/deploy.mp3',
  '/sounds/expand.mp3',
  '/sounds/fade.mp3',
  '/sounds/hover.mp3',
  '/sounds/logo.mp3',
  '/sounds/start.mp3',
  '/sounds/typing.mp3',
  // Icons
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  // Favicons
  '/favicon/favicon.ico',
  '/favicon/favicon-16x16.png',
  '/favicon/favicon-32x32.png',
  '/favicon/apple-touch-icon.png',
  '/favicon/android-chrome-192x192.png',
  '/favicon/android-chrome-512x512.png',
  // External resources (cached for offline use)
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Electrolize&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Cache items one by one to avoid failing if one resource fails
        return Promise.allSettled(
          urlsToCache.map(url =>
            cache.add(url).catch(err => {
              console.log('Failed to cache:', url, err);
              return null;
            })
          )
        );
      })
      .then(() => {
        console.log('Service Worker: All resources cached successfully');
      })
      .catch((error) => {
        console.log('Cache installation failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response - allow opaque responses for cross-origin
          if (!response || response.status !== 200) {
            // Allow opaque responses (from CDNs)
            if (response && response.type === 'opaque') {
              return response;
            }
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache successful responses
          caches.open(CACHE_NAME)
            .then((cache) => {
              // Only cache if it's a valid cacheable request
              if (event.request.method === 'GET') {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        }).catch((error) => {
          console.log('Fetch failed, serving offline fallback:', error);

          // For navigation requests, return the main page
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }

          // For other requests, try to find any cached version
          return caches.match(event.request);
        });
      })
  );
});

// Handle background sync (optional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-calculations') {
    event.waitUntil(syncCalculations());
  }
});

async function syncCalculations() {
  // Implement sync logic if needed
  console.log('Background sync triggered');
}

// Handle push notifications (optional)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'calculator-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('Percentage Calculator', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
