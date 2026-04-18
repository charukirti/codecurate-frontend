export type submission = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  youtubeURL: string;
  title: string;
  description: string | null;
  topic: string;
  status: 'pending' | 'accepted' | 'rejected';
  adminFeedback: string | null;
  reviewedBy: string | null;
  submitter: {
    id: string;
    username: string;
    email: string;
  };
};

export type submissionsResponse = {
  message: string;
  data: submission[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};
