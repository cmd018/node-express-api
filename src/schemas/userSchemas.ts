import { z } from 'zod';

const isValidDateDeepCheck = (dateString: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
};

export enum UserType {
  Student = 'STUDENT',
  Teacher = 'TEACHER',
  Parent = 'PARENT',
  Tutor = 'TUTOR',
}

export const userRegistrationSchema = z.object({
  fullName: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(1, { message: 'password is required' })
    .min(8, { message: 'password must be between 2 and 64 characters' })
    .max(64, { message: 'password must be between 2 and 64 characters' })
    .regex(/[0-9]/i, {
      message: 'password must contain at least one number',
    })
    .regex(/[A-Z]/, {
      message: 'password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'password must contain at least one lowercase letter',
    }),
  email: z.string().trim().email(),
  userType: z.nativeEnum(UserType),
  createdDate: z
    .string()
    .trim()
    .min(1, { message: 'created date required' })
    .refine(
      (data) => isValidDateDeepCheck(data),
      'valid created date required',
    ),
});

export const getUserSchema = z.object({
  id: z
    .string()
    .transform(Number)
    .pipe(z.number().int().positive()) as unknown as z.ZodNumber,
});

export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserWithOutPassword = { id: number } & Omit<
UserRegistration,
'password'
>;
