const WebSocket = require('ws');
const http = require('http');
const server = http.createServer();
const wss = new WebSocket.Server({ port: 4000 });
const clients = new Set();

function conectarWebsocket() {
    wss.on('connection', (ws) => {
        console.log('Nuevo cliente conectado con Websocket');

        clients.add(ws);

        ws.on('close', () => {
            console.log('Cliente desconectado Websocket');
            clients.delete(ws);
        });
    });

}

function sendPushNotification(message) {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'notification', message }));
        }
    });
}

module.exports = {
    sendPushNotification,
    conectarWebsocket
};