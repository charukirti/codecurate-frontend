export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
};

export type Resource = {
  type: 'video' | 'playlist';
  codeLang: string | null;
  topic: string;
  videoLang: string;
  instructorName: string;
  description: string | null;
  id: string;
  videoId: string | null;
  playlistId: string | null;
  title: string;
  rawDescription: string | null;
  channelId: string | null;
  channelName: string;
  publishedAt: Date;
  thumbnails: Thumbnails;
  itemCount: number | null;
  durationSeconds: number | null;
  avgRating: string;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type ResourcesResponse = {
  message: string;
  data: Resource[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};
