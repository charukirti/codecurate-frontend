type Tags = {
  id: string;
  name: string;
  createdAt: Date;
  displayName: string;
};

type ReviewUser = {
  id: string;
  username: string;
};

export type Review = {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
  resourceId: string;
  rating: number;
  reviewText: string | null;
  reviewLikeCount: number | null;
  user: ReviewUser;
  tags: Tags[];
};

export type ReviewsResponse = {
  message: string;
  data: {
    reviews: Review[];
    pagination: {
      currentPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
};
