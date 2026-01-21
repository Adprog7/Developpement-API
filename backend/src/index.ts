import express from 'express';
import { HelloWorldController } from './api/hello-world.controller.js';
import { PanenkaBrahimDiazController } from './api/panenka-brahim-diaz.js';
import cors from 'cors';

const app = express();
const port = 3000;


app.use(cors());
app.get('/', HelloWorldController.get);
app.get('/hello', HelloWorldController.get);
app.get('/panenka-brahim-diaz', PanenkaBrahimDiazController.get);

app.listen(port, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});