const CACHE = "ruleta-v3";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json"
];

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE)

        .then(cache => cache.addAll(FILES))

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

        .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))

        .then(() => self.clients.claim())

    );

});

self.addEventListener("fetch", event => {

    // El documento HTML: siempre intenta traer la version mas nueva de la red
    // primero (para que un cambio de codigo se vea de inmediato), y solo usa
    // la copia guardada si no hay conexion.
    if (event.request.mode === "navigate" || event.request.destination === "document") {

        event.respondWith(

            fetch(event.request)

            .then(response => {
                const copy = response.clone();
                caches.open(CACHE).then(cache => cache.put(event.request, copy));
                return response;
            })

            .catch(() => caches.match(event.request))

        );

        return;

    }

    // Resto de archivos (JS, CSS, iconos): responde rapido desde la cache
    // pero refresca la cache en segundo plano con la version de red.
    event.respondWith(

        caches.match(event.request).then(cached => {

            const network = fetch(event.request).then(response => {
                const copy = response.clone();
                caches.open(CACHE).then(cache => cache.put(event.request, copy));
                return response;
            }).catch(() => cached);

            return cached || network;

        })

    );

});
