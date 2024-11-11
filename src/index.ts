import express from 'express';
import { WebSocket, WebSocketServer } from "ws";

const app = express();
const PORT = 3000;
const httpServer = app.listen(PORT, () => {
    console.log("PORT", PORT);
});

// // Define a simple route
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

const wss = new WebSocketServer({server: httpServer});

let userCount = 0;
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN){
                client.send(data, { binary:isBinary });
            }
        });
    });
    console.log("User number ", ++userCount, " connected")
    ws.send('Hello! Message for server!!')
})