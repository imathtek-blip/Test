// Types pour FreeTube Modern

export interface Video {
  videoId: string;
  title: string;
  description?: string;
  published?: number;
  publishedText?: string;
  viewCount?: number;
  viewCountText?: string;
  likeCount?: number;
  author: string;
  authorId: string;
  authorUrl?: string;
  lengthSeconds?: number;
  videoThumbnails?: Thumbnail[];
}

export interface Thumbnail {
  quality: string;
  url: string;
  width: number;
  height: number;
}

export interface Channel {
  author: string;
  authorId: string;
  authorUrl: string;
  authorBanners?: Thumbnail[];
  authorThumbnails?: Thumbnail[];
  subCount?: number;
  description?: string;
  totalViews?: number;
  joined?: number;
  latestVideos?: Video[];
}

export interface SearchResult {
  type: 'video' | 'channel' | 'playlist';
  title: string;
  videoId?: string;
  author?: string;
  authorId?: string;
  lengthSeconds?: number;
  viewCount?: number;
  published?: number;
  videoThumbnails?: Thumbnail[];
}

export interface VideoDetails extends Video {
  dashUrl?: string;
  hlsUrl?: string;
  formatStreams?: VideoFormat[];
  adaptiveFormats?: VideoFormat[];
  recommendedVideos?: Video[];
  captions?: Caption[];
}

export interface VideoFormat {
  url: string;
  itag: string;
  type: string;
  quality: string;
  container: string;
  resolution?: string;
  qualityLabel?: string;
  fps?: number;
  size?: string;
}

export interface Caption {
  label: string;
  languageCode: string;
  url: string;
}

export interface Subscription {
  authorId: string;
  author: string;
  authorUrl: string;
  authorThumbnail?: string;
  subscribedAt: number;
}

export interface HistoryItem {
  videoId: string;
  title: string;
  author: string;
  authorId: string;
  thumbnail: string;
  watchedAt: number;
  progress?: number; // Progression en secondes
}

export interface Playlist {
  playlistId: string;
  title: string;
  author: string;
  authorId: string;
  videoCount: number;
  videos: Video[];
}

export interface TrendingResponse {
  videos: Video[];
}

export interface SearchResponse {
  results: SearchResult[];
}

export type Theme = 'light' | 'dark';

export type VideoQuality = 'auto' | '144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '2160p';
