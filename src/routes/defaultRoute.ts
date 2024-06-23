import { Router } from 'express';

const defaultRoute = Router();

// TODO: Use as a health endpoint
defaultRoute.get('/', (req, res) => {
  res.send('Up and running!');
});

export default defaultRoute;
