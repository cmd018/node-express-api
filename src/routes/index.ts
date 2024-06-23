import express from 'express';
import defaultRoute from './defaultRoute';
import userRoutes from './userRoutes';

const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoutes);

export default routes;
