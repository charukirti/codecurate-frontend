import { sort } from '@/features/reviews/schemas/reviews.schema';
import z from 'zod';

export const getUserReviewsQuerySchema = z.object({
  page: z.coerce.number().int().optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  sort: sort.optional().default('newest'),
});

export const updateProfileSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(255, 'Name must not exceed 255 characters')
      .optional()
      .or(z.literal('')),
    username: z
      .string()
      .min(5, 'Username must be at least 5 characters')
      .max(15, 'Username must not exceed 15 characters')
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => data.name || data.username, {
    message: 'At least one field must be provided',
    path: ['name'],
  });

export type GetUserReviewsQuery = z.infer<typeof getUserReviewsQuerySchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
