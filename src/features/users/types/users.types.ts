export type PublicProfile = {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
};

export type publicProfileResponse = {
  message: string;
  data: PublicProfile;
};
