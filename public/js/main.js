let datos = [
    {
        titulo: 'Garbanzo',
        cantidad:12,
        precio:2500
    },
    {
        titulo: 'Jabon',
        cantidad:23,
        precio:20
    }
];

let datosPrevios = [];
const rest = RESTClient('https://5fac7ad903a60500167e7ecf.mockapi.io/items');


const btnAgregar = document.querySelector('#btnAgregar');
const inpBusqueda = document.querySelector('#inpBusqueda');
const btnDeshacer = document.querySelector('#btnDeshacer');
const inpAgregar = document.querySelector('#inpAgregar');
const galeria = document.querySelector('#galeria');
const linkLimpiar = document.querySelector('#linkLimpiar');

// Workers

let busquedaWorker = false;
if (window.Worker) {
    busquedaWorker = new Worker('workers/busqueda.worker.js');

}

// Funciones

const template = ({ titulo, cantidad, precio }) => ` <div class="item">
        <div class="titulo">${titulo}</div>  
        <div class="controles">
        <span>Cantidad: ${cantidad}</span>
            <span>Precio: ${precio}</span>
            </div>
            <div class="borrar">
            <a href="#" class="borrar">Eliminar</a>
            </div>
            </div>`;


function render(lista = [{
    titulo: '',
    cantidad: 0,
    precio: 0
}]){
    galeria.innerHTML = '';
    lista.forEach(item => {
        galeria.innerHTML += template(item);
    })
}

//Eventos

document.addEventListener('DOMContentLoaded', ()=>{
    
    rest.get((json)=>{
        datos = json;
        render(datos);
    })

})

btnAgregar.addEventListener('click', ()=>{
    datosPrevios = datos.slice(0); // no hereda los cambios del copiado
    datos.push({
        titulo: inpAgregar.value,
        cantidad: 0,
        precio: 0
    });

    rest.post(JSON.stringify({
        titulo: inpAgregar.value,
        cantidad: 0,
        precio: 0,
    }), p => console.log(p));

    render(datos);
    inpAgregar.value = '';
});

btnDeshacer.addEventListener('click', ()=>{
    datos = datosPrevios;
    render(datos);
    console.log('Datos revertidos: ', datos);
})


inpBusqueda.addEventListener('input', e => {
    /* let vista = datos.filter((val)=>{
        if (val.titulo.includes(e.target.value)) {
            return true;
        }else{
            return false;
        }
    }); */

    if (!busquedaWorker) {
        let vista = datos.filter(val => val.titulo.includes(e.target.value));
        render(vista);     
    } else {
        // uso el worker para filtrar los datos
        console.log('Worker de busqueda registrado');
        
        busquedaWorker.postMessage({
            datos,
            filtro: e.target.value
        });

        busquedaWorker.addEventListener('message', e => {
            console.log(e);
            render(e.data);
        });
    }

})

linkLimpiar.addEventListener('click', ()=>{
    datosPrevios = datos.slice(0);
    datos = [];
    render(datos);
})




