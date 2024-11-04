import express, { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response): Response => {
  return res.status(200).send("Server is alive!");
});

export default routes;
