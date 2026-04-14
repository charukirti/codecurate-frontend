import type { CreateSubmissionInput } from '@/features/submissions/schemas/submissions.schema';
import type { UserSubmissionResponse } from '@/features/submissions/types/submissions.types';
import { api } from '@/lib/axios';

export async function getUserSubmissions() {
  const response = await api.get<UserSubmissionResponse>(`/submissions/my-submissions`);
  return response.data;
}

export async function createSubmission(params: CreateSubmissionInput) {
  const response = await api.post('/submissions', params);
  return response.data;
}
