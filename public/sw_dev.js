
self.addEventListener('fetch', e => {

});

self.addEventListener('install', e => {

});

self.addEventListener('activate', e => {

});

self.addEventListener('push', e => {
    console.log('Notif push recibida: ', e.data.json());

    self.registration.showNotification(e.data.title, e.data.options);
});

