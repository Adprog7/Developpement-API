import express from 'express';
import http from 'http';
import { ChatSocket } from './chat/chat.socket.js';
import { WhoIAmControler } from './whoami/whoami.controler.js';
import { ChatControler } from './chat/chat.controler.js';

const PORT = 3000;
const app = express();
const server = http.createServer(app);

// Websocket
// Utilisation d'un singleton pour pouvoir la partager
ChatSocket.INSTANCE.setup(server);

// Front+Api
app.use(express.static('../frontend/dist'));

// CORS middleware for dev (allow frontend origin)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use(express.json());

app.get('/api/whoami', WhoIAmControler.get);
app.post('/api/chat', ChatControler.post);

// Ecoute de l'API et de la websocket
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});