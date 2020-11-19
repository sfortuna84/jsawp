// Proceso

const NOMBRE_CACHE = 'SUPERLISTA_CACHE';

const SUPERLISTA_CACHES = {
    inmutable: {
        nombre: 'SUPER_CACHE_INMUTABLE',
        archivos: [
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://code.getmdl.io/1.3.0/material.blue_grey-red.min.css',
            'https://code.getmdl.io/1.3.0/material.min.js',
            'https://5fac7ad903a60500167e7ecf.mockapi.io/items',
            'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
        ]
    },
    estatica: {
        nombre: 'SUPER_CACHE_ESTATICA',
        archivos: [
            '/',
            '/sw.js',
            '/index.html',
            '/css/styles.css',
            '/js/rest.js',
            '/js/main.js',
            '/js/workers.js',
            '/workers/busqueda.worker.js',
            '/manifest.json',
            '/icons/icon192.png'
        ]
    },
    dinamica: {
        nombre: 'SUPER_CACHE_DINAMICA'
    }
}


//Fetch: se ejecuta al interceptar una peticion saliente

self.addEventListener('fetch', e => {
    //console.log(e.request.url);

    const rta = caches.match(e.request)
                    .then(res => {
                        if(res){
                            return res;
                        }else{
                            return fetch(e.request)
                                    .then(ol_res => {
                                        //Agregar el archivo a la cache Dinamica
                                        caches.open(SUPERLISTA_CACHES.dinamica.nombre)
                                                .then(cache => {
                                                    cache.put(e.request, ol_res);
                                                });
                                        return ol_res.clone();
                                    });
                        }
                    });

    e.respondWith(rta);
});


//Preparacion

//Install: se ejecuta una vez al principio, haciendo un copiado de archivos a la Cache

self.addEventListener('install', e => {
    /* console.log('copiado en Cache'); */

   const promesaCacheInm = caches.open(SUPERLISTA_CACHES.inmutable.nombre)
                            .then(cache => cache.addAll(SUPERLISTA_CACHES.inmutable.archivos));
   const promesaCacheEst = caches.open(SUPERLISTA_CACHES.estatica.nombre)
                            .then(cache => cache.addAll(SUPERLISTA_CACHES.estatica.archivos));

    e.waitUntil(Promise.all([promesaCacheInm, promesaCacheEst]));
    
    
});


//Activate: se ejecuta al haber un cambio en este archivo, actualiza de los archivos de la Cache

self.addEventListener('activate', e => {
    /* console.log('actualizado en Cache'); */
    const listaBlanca = [
        SUPERLISTA_CACHES.inmutable.nombre,
        SUPERLISTA_CACHES.estatica.nombre,
        SUPERLISTA_CACHES.dinamica.nombre
    ];

    const limpieza = caches.keys()
                        .then(nombreCache => {
                            return Promise.all(
                                nombreCache.map(nombre => {
                                  if(listaBlanca.indexOf(nombre) === -1){
                                    return caches.delete(nombre);
                                  }  
                                })
                            );
                        })
    e.waitUntil(limpieza);
});
