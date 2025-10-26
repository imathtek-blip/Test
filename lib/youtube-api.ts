// Utilitaires pour l'API Invidious / YouTube

import type { Video, VideoDetails, Channel, SearchResult, TrendingResponse } from './types';

// Instance Invidious par défaut (peut être changée via env)
const INVIDIOUS_INSTANCE = process.env.NEXT_PUBLIC_INVIDIOUS_INSTANCE || 'https://invidious.fdn.fr';

// Fonction helper pour faire des requêtes à l'API Invidious
async function invidiousRequest<T>(endpoint: string): Promise<T> {
  const url = `${INVIDIOUS_INSTANCE}/api/v1${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Invidious API Error:', error);
    throw error;
  }
}

// Récupérer les vidéos tendances
export async function getTrending(type: 'music' | 'gaming' | 'news' | 'movies' = 'music'): Promise<Video[]> {
  try {
    return await invidiousRequest<Video[]>(`/trending?type=${type}`);
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
}

// Récupérer les détails d'une vidéo
export async function getVideoDetails(videoId: string): Promise<VideoDetails | null> {
  try {
    return await invidiousRequest<VideoDetails>(`/videos/${videoId}`);
  } catch (error) {
    console.error('Error fetching video details:', error);
    return null;
  }
}

// Rechercher des vidéos
export async function searchVideos(
  query: string,
  page: number = 1,
  sort_by: 'relevance' | 'rating' | 'upload_date' | 'view_count' = 'relevance'
): Promise<SearchResult[]> {
  try {
    return await invidiousRequest<SearchResult[]>(
      `/search?q=${encodeURIComponent(query)}&page=${page}&sort_by=${sort_by}`
    );
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
}

// Récupérer les informations d'une chaîne
export async function getChannel(channelId: string): Promise<Channel | null> {
  try {
    return await invidiousRequest<Channel>(`/channels/${channelId}`);
  } catch (error) {
    console.error('Error fetching channel:', error);
    return null;
  }
}

// Récupérer les vidéos d'une chaîne
export async function getChannelVideos(channelId: string, page: number = 1): Promise<Video[]> {
  try {
    const data = await invidiousRequest<{ videos: Video[] }>(`/channels/${channelId}/videos?page=${page}`);
    return data.videos || [];
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return [];
  }
}

// Récupérer les vidéos populaires (alternative à trending)
export async function getPopularVideos(): Promise<Video[]> {
  try {
    return await invidiousRequest<Video[]>('/popular');
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    return [];
  }
}

// Obtenir la meilleure thumbnail pour une vidéo
export function getBestThumbnail(video: Video, quality: 'high' | 'medium' | 'default' = 'high'): string {
  if (!video.videoThumbnails || video.videoThumbnails.length === 0) {
    return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
  }

  // Trier par qualité (du plus grand au plus petit)
  const sorted = [...video.videoThumbnails].sort((a, b) => b.width - a.width);

  if (quality === 'high') {
    return sorted[0]?.url || video.videoThumbnails[0].url;
  } else if (quality === 'medium') {
    const mid = Math.floor(sorted.length / 2);
    return sorted[mid]?.url || video.videoThumbnails[0].url;
  } else {
    return sorted[sorted.length - 1]?.url || video.videoThumbnails[0].url;
  }
}

// Formater la durée d'une vidéo (en secondes) en format lisible
export function formatDuration(seconds?: number): string {
  if (!seconds) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Formater le nombre de vues
export function formatViewCount(count?: number): string {
  if (!count) return '0 vues';

  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M vues`;
  } else if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K vues`;
  }

  return `${count} vues`;
}

// Formater la date de publication
export function formatPublishedDate(timestamp?: number): string {
  if (!timestamp) return 'Date inconnue';

  const date = new Date(timestamp * 1000);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    }
    return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  } else if (diffInDays < 7) {
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `Il y a ${months} mois`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `Il y a ${years} an${years > 1 ? 's' : ''}`;
  }
}

// Obtenir l'URL de la meilleure qualité vidéo disponible
export function getBestVideoUrl(video: VideoDetails): string | null {
  // Préférer DASH si disponible
  if (video.dashUrl) {
    return video.dashUrl;
  }

  // Sinon HLS
  if (video.hlsUrl) {
    return video.hlsUrl;
  }

  // Sinon chercher dans les formats adaptatifs
  if (video.adaptiveFormats && video.adaptiveFormats.length > 0) {
    // Trier par qualité (1080p, 720p, etc.)
    const sorted = [...video.adaptiveFormats]
      .filter(f => f.type.includes('video'))
      .sort((a, b) => {
        const aQuality = parseInt(a.qualityLabel || '0');
        const bQuality = parseInt(b.qualityLabel || '0');
        return bQuality - aQuality;
      });

    return sorted[0]?.url || null;
  }

  // En dernier recours, format streams
  if (video.formatStreams && video.formatStreams.length > 0) {
    return video.formatStreams[0].url;
  }

  return null;
}
