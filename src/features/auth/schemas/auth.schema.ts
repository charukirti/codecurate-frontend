import z from 'zod';

/**
 * Sign up schema
 * validates the payload for creating new user account
 */

export const signUpSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  username: z
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(15, 'Username must be at least 15 characters'),
  email: z.email({
    error: (issue) => (issue.input === undefined ? 'Email is required' : 'Invalid email format'),
  }),
  password: z
    .string()
    .min(7, 'Password must be at least 7 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.enum(['user', 'admin']).default('user'),
});

/**
 * Sign in schema
 * validates the payload for signing user back
 */

export const signInSchema = z.object({
  email: z.email({
    error: (issue) => (issue.input === undefined ? 'Email is required' : 'Invalid email address'),
  }),

  password: z.string().min(1, 'password is required!'),
});

/**
 * Reset password schema
 * validates the payload for resetting password
 */

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(7, 'Password must be at least 7 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm password is required!'),
    token: z.string().min(1, 'Token is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z.email({
    error: (issue) => (issue.input === undefined ? 'Email is required' : 'Invalid email address'),
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
