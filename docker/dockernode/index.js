import express from 'express';

<<<<<<< HEAD
const PORT = 3333;
=======
const PORT = 3000;
>>>>>>> 45a15f22b13ca22ff9bb72a6a7c29e46355c969c
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
<<<<<<< HEAD
  res.send('Server is alive')
=======
  res.send('Hello World teste')
>>>>>>> 45a15f22b13ca22ff9bb72a6a7c29e46355c969c
})

app.listen(PORT, HOST);
