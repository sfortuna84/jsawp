// Recibir mensaje

self.addEventListener('message', e => {
    /* console.log(e); */
    
    const {numero1, numero2} = e.data; /* destructor */
    
    
    /* Lo anterior es exactamente lo mismo que 

    const numero1 = e.data.numero1;
    const numero2 = e.data.numero2;

 */
    const suma = numero1 + numero2;
    
    // Enviar mensaje
    self.postMessage('La SUMA entre '+ numero1 + ' y ' + numero2 + ' es ' + suma);
})

