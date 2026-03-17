import type { Thumbnails } from '@/features/resources/types/resources.types';

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

export type Review = {
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  userId: string;
  resourceId: string;
  rating: number;
  reviewText: string | null;
  reviewLikeCount: number | null;
  reviewTags: {
    reviewId: string;
    tagId: string;
    tag: {
      id: string;
      name: string;
      createdAt: Date;
      displayName: string;
    };
  }[];
  resource: {
    id: string;
    type: 'video' | 'playlist';
    title: string;
    thumbnails: Thumbnails;
    avgRating: string;
  };
};

export type UserReviewsResponse = {
  message: string;
  data: {
    reviews: Review[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    };
  };
};
