import z from 'zod';

export const resourcesSearchSchema = z.object({
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
  page: z.number().min(1).default(1),
  limit: z.number().min(1).default(1),
});

export type ResourcesSearch = z.infer<typeof resourcesSearchSchema>;
