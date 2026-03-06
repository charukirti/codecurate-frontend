import type { SignInInput, SignUpInput } from '@/features/auth/schemas/auth.schema';
import type { ApiResponse, SignInResponse, User } from '@/features/auth/types';
import { api } from '@/lib/axios';

export async function signIn(data: SignInInput) {
  const { email, password } = data;

  const response = await api.post<SignInResponse>('/auth/signin', {
    email,
    password,
  });

  return response.data;
}

export async function signUp(data: SignUpInput) {
  const response = await api.post<ApiResponse<User>>('/auth/signup', data);
  return response.data;
}

export async function signOut() {
  await api.post('/auth/signout');
}

export async function forgotPassword(email: string) {
  const response = await api.post<ApiResponse<void>>('/auth/forgot-password', { email });
  return response.data;
}

export async function resetPassword(newPassword: string, token: string) {
  const response = await api.post<ApiResponse<void>>(`/auth/reset-password?token=${token}`, { newPassword });
  return response.data;
}

export async function verifyEmail(token: string) {
  await api.get<ApiResponse<void>>(`/auth/verify-email?token=${token}`);
}

export async function getUser() {
  const response = await api.get<ApiResponse<User>>('/users/me');
  return response.data;
}

export async function rotateToken() {
  const response = await api.post<{ accessToken: string; message: string }>('/auth/refresh-token');
  return response.data;
}
