self.addEventListener('push', function(event) {
    const data = { title: "Piodrink", body: "Waktunya minum!" };

    if(event.data) {
        try {
            let data = { title: "Piodrink", body: "Waktunya minum!" };
        } catch (e) {
            console.error("Data push tidak valid", e)
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
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            for (const client of clientList) {
                if (clien.url === '/' && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});