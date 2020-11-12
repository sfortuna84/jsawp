const RESTClient = function (endPoint) {

    function crearPeticion(url, metodo='GET', cpo = '') {
        return async function(completado){
            let rta;
            if (metodo == 'GET') {
                rta = await fetch(url);
            }else{
                rta = await fetch(url, {
                    method: metodo,
                    body: cpo
                });
            }

            let data = await rta.json();
            completado(data);
        }    
    }

    return{
        get: crearPeticion(endPoint),
        post: (cpo, callback) => crearPeticion(endPoint, 'POST', cpo)(callback),
        put: (id, cpo, callback) => crearPeticion(endPoint + '/' + id, 'PUT', cpo)(callback),
        delete: (id, callback) => crearPeticion(endPoint + '/' + id, 'DELETE')(callback)
    }
};