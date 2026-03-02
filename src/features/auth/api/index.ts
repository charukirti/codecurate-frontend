import type { SignInInput, SignUpInput } from '@/features/auth/schemas/auth.schema';
import { api } from '@/lib/axios';

export async function signIn(data: SignInInput) {
  const { email, password } = data;

  const response = await api.post('/auth/signin', {
    email,
    password,
  });

  return response.data.data;
}

export async function signUp(data: SignUpInput) {
  const response = await api.post('/auth/signup', data);
  return response.data.data;
}

export async function signOut() {
  await api.post('/auth/signout');
}

export async function forgotPassword(email: string) {
  await api.post('/auth/forgot-password', { email });
}

export async function resetPassword(newPassword: string, token: string) {
  await api.post(`/auth/reset-password?token=${token}`, { newPassword });
}

export async function verifyEmail(token: string) {
  await api.get(`/auth/verify-email?token=${token}`);
}
