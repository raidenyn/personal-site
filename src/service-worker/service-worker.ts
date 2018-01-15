const sw = self as any as ServiceWorkerGlobalScope;

const cacheVersion = 'v1';

sw.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith('chrome-extension')
        && event.request.method === 'GET'
    ) {
        event.respondWith(
            fetch(event.request).then((response) => {
                return caches.open(cacheVersion).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            }).catch(() => {
                return caches.match(event.request, { cacheName: cacheVersion });
            }),
        );
    }
});
