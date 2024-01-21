const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server: WebSocketServer } = require('socket.io');
const { conectarWebsocket } = require('./socket/utils/util');



const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server, {
    cors: {
        origin: '*'
    },
});

app.use(cors());
app.use(express.json());

const tareaRouter = require('./src/routes/router.tarea');
const usuarioRoute = require('./src/routes/user.route');
app.use('/', tareaRouter);
app.use('/', usuarioRoute);



io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');


    socket.join('salaGeneral');
    socket.emit('notificacion', 'Te has unido a nuestra sala principal');


    socket.to('salaGeneral').emit('notificacion', 'Un nuevo usuario se ha unido a la sala');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});



server.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});


conectarWebsocket();