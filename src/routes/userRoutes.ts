import express from 'express';
import {
  validateRequestBody,
  validateRequestParams,
} from 'zod-express-middleware';
import { getUserSchema, userRegistrationSchema } from '../schemas/userSchemas';
import saveUserData from '../controllers/saveUserData';
import getUserData from '../controllers/getUserData';

const userRoutes = express.Router();

userRoutes.post(
  '/user',
  validateRequestBody(userRegistrationSchema),
  saveUserData,
);

userRoutes.get('/user/:id', validateRequestParams(getUserSchema), getUserData);

export default userRoutes;
