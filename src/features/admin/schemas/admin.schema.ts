import z from 'zod';

export const acceptSubmissionSchema = z.object({
  videoLang: z
    .string()
    .min(2, 'Video language must be at least 2 characters')
    .max(100, 'Video language must be at most 100 characters'),
  codeLang: z
    .enum(
      [
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
      ],
      { error: 'Select correct coding language' },
    )
    .optional(),
  instructorName: z
    .string()
    .min(2, 'Instructor name must be at least 2 characters')
    .max(100, 'Instructor name must be at most 255 characters'),

  adminFeedback: z.string().max(1000).optional(),
});

export const rejectSubmissionSchema = z.object({
  adminFeedback: z.string().max(1000).optional(),
});

const YT_HOSTS = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'];

export const addResourceSchema = z.object({
  url: z.url().refine(
    (u) => {
      const host = new URL(u).hostname;
      return YT_HOSTS.some((h) => host.includes(h));
    },
    { error: 'URL must be in valid format' },
  ),

  codeLang: z
    .enum(
      [
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
      ],
      { error: 'Select correct coding language' },
    )
    .optional(),

  topic: z
    .string()
    .min(2, 'Topic of the video must be at least 2 characters')
    .max(100, 'Topic of the video must be at most 100 characters'),

  resourceType: z.enum(['video', 'playlist'], {
    error: 'Resource type must be either video or playlist',
  }),

  videoLang: z
    .string()
    .min(2, 'Language of the video must be at least 2 characters')
    .max(100, 'Language of the video must be at most 100 characters'),

  instructorName: z
    .string()
    .min(2, 'Instructor name must be at least 2 characters')
    .max(100, 'Instructor name must be at most 255 characters'),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(600, 'Description must be at most 600 characters')
    .optional(),
});

export type AcceptSubmissionInput = z.infer<typeof acceptSubmissionSchema>;
export type RejectSubmissionInput = z.infer<typeof rejectSubmissionSchema>;
export type AddResourceInput = z.infer<typeof addResourceSchema>;
