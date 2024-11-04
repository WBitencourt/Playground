import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
//app.use('/files', express.static(path.resolve(__dirname, '..' , 'temp', 'uploads', ))) // Rota para acessar arquivos estáticos

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

export { serverHttp, io };