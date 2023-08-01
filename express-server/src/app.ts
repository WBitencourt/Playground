import express from 'express';
import cors from 'cors';
import path from 'path';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
//app.use('/files', express.static(path.resolve(__dirname, '..' , 'temp', 'uploads', ))) // Rota para acessar arquivos estáticos

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running!');
})