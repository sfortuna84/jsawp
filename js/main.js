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


const btnAgregar = document.querySelector('#btnAgregar');
const inpBusqueda = document.querySelector('#inpBusqueda');
const btnDeshacer = document.querySelector('#btnDeshacer');
const inpAgregar = document.querySelector('#inpAgregar');
const galeria = document.querySelector('#galeria');
const linkLimpiar = document.querySelector('#linkLimpiar');

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
    render(datos);
})

btnAgregar.addEventListener('click', ()=>{
    datosPrevios = datos.slice(0); // no hereda los cambios del copiado
    datos.push({
        titulo: inpAgregar.value,
        cantidad: 0,
        precio: 0
    });
    render(datos);
    inpAgregar.value = '';
    console.log('Datos Previos:', datosPrevios);
    console.log('Datos actualizados', datos);
});

btnDeshacer.addEventListener('click', ()=>{
    datos = datosPrevios;
    render(datos);
    console.log('Datos revertidos: ', datos);
})


inpBusqueda.addEventListener('input', e => {
    let vista = datos.filter((val)=>{
        if (val.titulo.includes(e.target.value)) {
            return true;
        }else{
            return false;
        }
    });

    render(vista); 

})

linkLimpiar.addEventListener('click', ()=>{
    datosPrevios = datos.slice(0);
    datos = [];
    render(datos);
})

