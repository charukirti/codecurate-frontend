import z from 'zod';

export const sort = z.enum(['newest', 'oldest', 'highest', 'lowest']);

export const getReviewsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  sort: sort.optional().default('newest'),
});

/* schema for create review input */

export const createReviewSchema = z.object({
  reviewText: z
    .string()
    .min(10, { error: 'Review text must be at least 10 characters.' })
    .max(500, { error: 'Review text must be at most 500 characters' })
    .optional(),

  rating: z
    .number({
      error: (iss) => (iss.input === undefined ? 'Field is required.' : 'Rating must be between 1 to 10 stars.'),
    })
    .min(1)
    .max(10),

  tagIds: z
    .array(z.string(), {
      error: (iss) => (iss.input === undefined ? 'Field is required' : 'Select at least 2 - 3 tags'),
    })
    .min(2)
    .max(3),
});

export type SortType = z.infer<typeof sort>;
export type ReviewsQueryInput = z.infer<typeof getReviewsQuerySchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
