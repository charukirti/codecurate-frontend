export const submissionKeys = {
  all: ['submissions'] as const,
  userSubmissions: () => [...submissionKeys.all, 'user'] as const,
};
