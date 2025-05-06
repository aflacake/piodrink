self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                'index.html',
                'style.css',
                'script.js',
                'https://raw.githubusercontent.com/aflacake/piodrink/main/img/pio.png',
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.responWidth(
        caches.match(event.request).then((cachedResponse)=> {
            return cachedResponse || fetch(event.request);
        })
	
    );
});




self.addEventListener('push', function(event) {
    let data = { title: "Piodrink", body: "Waktunya minum!" };

    if(event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            console.error("Data push tidak valid", e);
        }
    }

    const options = {
        body: data.body,
        icon: 'https://raw.githubusercontent.com/aflacake/piodrink/main/img/pio.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title || 'Piodrink', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const githubUrl = "https://aflacake.github.io/piodrink/";

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if (client.url === githubUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('githubUrl');
            }
        })
    );
});
