import { sort } from '@/features/reviews/schemas/reviews.schema';
import z from 'zod';

export const getUserReviewsQuerySchema = z.object({
  page: z.coerce.number().int().optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  sort: sort.optional().default('newest'),
});

export type GetUserReviewsQuery = z.infer<typeof getUserReviewsQuerySchema>;
