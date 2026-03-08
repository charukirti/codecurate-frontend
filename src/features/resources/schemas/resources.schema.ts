import z from 'zod';

export const resourcesQuerySchema = z.object({
  search: z.string().optional(),
  codeLang: z
    .enum([
      'HTML',
      'CSS',
      'JavaScript',
      'Tailwind',
      'React',
      'TypeScript',
      'Node.js',
      'Go',
      'Python',
      'Rust',
      'Java',
      'C',
      'C++',
      'C#',
    ])
    .optional(),
  topic: z.string().optional(),
  type: z.enum(['video', 'playlist']).optional(),
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1))
    .optional()
    .default(1),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().min(1).max(100))
    .optional()
    .default(10),
});

export type GetResourcesQuery = z.infer<typeof resourcesQuerySchema>;
