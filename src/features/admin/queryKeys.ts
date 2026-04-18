export const adminKeys = {
  all: ['admin'] as const,
  submissions: () => [...adminKeys.all, 'submissions'] as const,
  resources: () => [...adminKeys.all, 'resources'] as const,
};
