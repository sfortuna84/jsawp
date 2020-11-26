const PORT = 8080;

const NRO_SERVER = 10;

for (let i = 1; i <= NRO_SERVER; i++) {
    require('http').createServer((req,res) => res.end(`<h1>Servidor en ${PORT + i}</h1>`))
                    .listen(PORT+i,()=>console.log(`Server levantado en ${PORT + i}`));
    
}


const HTTP = require('http');

let contadorVisitas = 0;

const SERVER = HTTP.createServer((req, res)=>{
    let url = req.url;
    let metodo = req.method;
    console.log(url, metodo);
    if (url == '/') {
        res.writeHead(200,{'content-type':'text/html'});
        res.write(`<h2 style="color:violet">Hola Server: <small style="color:blue">${PORT}</small></h2>`);
        res.write(`<h4 style="color: green"> Nro de Visitas: ${++contadorVisitas}</h4>`);
        res.end(`<p style="color: white; background-color: black">Fecha y Hora: ${new Date().toLocaleString()}</p>`);   
    }else{
        res.writeHead(404,{'content-type':'text/html'});
        res.end(`<h2 style="color: red">Recurso no implementado</h2>`);   

    }
})

SERVER.listen(PORT, err => {
    if(err) return console.error(`Error en el server: ${err}`);
    console.log(`El servidor se encuentra escuchando el puerto ${PORT}`);
})