// Proceso

//Fetch: se ejecuta al interceptar una peticion saliente

self.addEventListener('fetch', e => {
    console.log('interceptado');
});


//Preparacion

//Install: se ejecuta una vez al principio, haciendo un copiado de archivos a la Cache

self.addEventListener('install', e => {
    console.log('copiado en Cache');
});


//Activate: se ejecuta al haber un cambio en este archivo, actualiza de los archivos de la Cache

self.addEventListener('activate', e => {
    console.log('actualizado en Cache');
});
