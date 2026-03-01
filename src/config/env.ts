import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.string().min(1, 'API url is missing'),
  VITE_NODE_ENV: z.enum(['development', 'production']),
});

export const env = envSchema.parse(import.meta.env);
