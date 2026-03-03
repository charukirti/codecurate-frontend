export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type SignInResponse = {
  message: string;
  accessToken: string;
  data: User;
};
