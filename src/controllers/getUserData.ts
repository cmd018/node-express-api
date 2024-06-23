import { Response } from 'express';
import { TypedRequestParams, sendError } from 'zod-express-middleware';
import { ZodIssueCode, z } from 'zod';
import { getUserSchema } from '../schemas/userSchemas';
import UserRepository from '../data-access/repository/user-repository';

export default async function getUserData(
  req: TypedRequestParams<typeof getUserSchema>,
  res: Response,
): Promise<void> {
  const userRepository = await UserRepository.build();

  const user = await userRepository.getUserById(req.params.id);

  if (!user) {
    const errors = new z.ZodError([
      {
        code: ZodIssueCode.custom,
        message: 'User not found',
        path: ['id'],
      },
    ]);
    sendError(
      {
        type: 'Params',
        errors,
      },
      res,
    );
  } else res.json({ data: { user } });
}
