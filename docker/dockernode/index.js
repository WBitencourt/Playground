import express from 'express';

const PORT = 3333;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is alive')
})

app.listen(PORT, HOST);
