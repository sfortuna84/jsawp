const express = require('express');
const webPush = require('web-push');
const path = require('path');

const app = express();

/* app.get('/', (req, res)=>{
    res.send('hola');
}); */

const PUBLIC_VAPID_KEY = 'BClseEwYjbIpfRbuSBpiOt09qSdgCuFdMqEaFARawSlo0WURIg-ceKhc7O4wU8ikHsJ_J-kkhk4v9ECHTPw8ld8';
const PRIVATE_VAPID_KEY = 't-tE21cve0HIJIIVaS9UmzarBi-BQNFwMA3KUwMfj2Q';

webPush.setVapidDetails(
    'mailto:info@educacionit.com',
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
);

//Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//Rutas

app.post('/subscribir', (req, res) => {
   webPush.sendNotification(
        req.body,
        JSON.stringify({
            title: 'Mensaje de la web',
            options: {
                body: 'Este es un mensaje proveniente del mas alla'
            }
        })
   );
   res.status(200);
   res.send({});
})

app.listen(3000, () => {
    console.log('Server Ok');
})

