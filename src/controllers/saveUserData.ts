import { Response } from 'express';
import { TypedRequestBody } from 'zod-express-middleware';
import bcrypt from 'bcrypt';
import { userRegistrationSchema } from '../schemas/userSchemas';
import UserRepository from '../data-access/repository/user-repository';

export default async function saveUserData(
  req: TypedRequestBody<typeof userRegistrationSchema>,
  res: Response,
): Promise<void> {
  const userRepository = await UserRepository.build();

  // TODO: Async mode for hash generation recommended
  const hash = bcrypt.hashSync(req.body.password, 10);

  // TODO: check if email already exists
  const id = await userRepository.saveUserRegistration({
    ...req.body,
    password: hash,
  });

  res.json({ message: 'User registered successfully', data: { id } });
}
