import z from 'zod';

export const sort = z.enum(['newest', 'oldest', 'highest', 'lowest']);

export const getReviewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  sort: sort.optional().default('newest'),
});
export type SortType = z.infer<typeof sort>;
export type ReviewsQueryInput = z.infer<typeof getReviewsQuerySchema>;
