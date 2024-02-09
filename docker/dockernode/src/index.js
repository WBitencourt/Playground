import express from 'express';

const PORT = 3333;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
  res.send('Server docker is alive: ' + new Date().toISOString());
})

app.listen(PORT, HOST);
