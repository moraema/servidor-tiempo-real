const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server: WebSocketServer } = require('socket.io');
const { conectarWebsocket } = require('./socket/utils/util');



const app = express();

app.use(cors());
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


server.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});


conectarWebsocket();