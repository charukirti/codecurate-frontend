export type Status = 'pending' | 'accepted' | 'rejected';

export type Submission = {
  youtubeURL: string;
  title: string;
  description: string | null;
  topic: string;
  id: string;
  adminFeedback: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  reviewedBy: string | null;
};

export type UserSubmissionResponse = {
  message: string;
  data: Submission[];
};
