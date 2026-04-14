import z from 'zod';

const YT_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'];

export const createSubmissionSchema = z.object({
  youtubeURL: z.string().refine((u) => {
    try {
      const host = new URL(u).hostname;
      return YT_HOSTS.some((h) => host === h);
    } catch {
      return false;
    }
  }, 'URL must be in valid format'),
  title: z.string().min(10, 'Title must be at least 10 characters long').max(255),
  description: z.string().max(1000).optional(),
  topic: z
    .string()
    .min(2, 'Topic of the video must be at least 2 characters')
    .max(100, 'Topic of the video must be at most 100 characters'),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
