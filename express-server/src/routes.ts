import express from 'express';
import { generateXLSMTim } from './test-create-excel-from-json';

export const routes = express.Router();

routes.get('/teste', async (req, res) => {
  const response = await generateXLSMTim();
  return res.status(200).send(response);
});

//Live route
routes.get('/', (req, res) => {
  return res.status(200).send('HTTP server running!');
});

//Test Maintenance Schedule Everest
// routes.get('/schedule', async (req, res) => {
//   return res.status(200).send({
//     startAt: '2023-07-04T13:10:00.000Z', //moment().add(2, 'hour').toISOString(), //'2023-07-03T16:37:00.000Z'
//     endAt: '2023-07-04T13:11:00.000Z', //moment().add(3, 'hours').toISOString(),
//   });
// });

//Test create excel tim from json
// routes.get('/teste', async (req, res) => {
//   const response = await generateXLSMTim();
//   return res.status(200).send(response);
// });
