import type {
  AcceptSubmissionInput,
  AddResourceInput,
  RejectSubmissionInput,
} from '@/features/admin/schemas/admin.schema';
import type { submissionsResponse } from '@/features/admin/types/admin.types';
import { api } from '@/lib/axios';

export async function getAllSubmissions() {
  const response = await api.get<submissionsResponse>('/admin/submissions');
  return response.data;
}

export async function acceptSubmission(submissionId: string, data: AcceptSubmissionInput) {
  const response = await api.patch(`/admin/submissions/${submissionId}/accept`, data);
  return response.data;
}

export async function rejectSubmission(submissionId: string, data: RejectSubmissionInput) {
  const response = await api.patch(`/admin/submissions/${submissionId}`, data);
  return response.data;
}

export async function addResource(data: AddResourceInput) {
  const response = await api.post(`/admin/resources/`, data);
  return response.data;
}

export async function deleteResource(id: string) {
  const response = await api.delete(`/admin/resources/${id}`);
  return response.data;
}
