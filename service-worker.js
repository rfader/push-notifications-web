'use strict';

self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function(event) {
    var payload = event.data ? event.data.text() : 'no payload';

    console.log('event:', event);

    var title = 'Cuest';
    var body = payload;
    var icon = '/images/icon-192x192.png';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    // Android doesn’t close the notification when you click on it
    // See: http://crbug.com/463146
    event.notification.close();

    event.waitUntil(
        self.clients.matchAll()
        .then(function(clientList) {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }

            return self.clients.openWindow('/');
        })
    );
});
