'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import VideoGrid from '@/components/VideoGrid';
import { getVideoDetails } from '@/lib/youtube-api';
import { addToHistory, isSubscribed, addSubscription, removeSubscription } from '@/lib/storage';
import type { VideoDetails, Video } from '@/lib/types';
import { formatViewCount, formatPublishedDate } from '@/lib/youtube-api';

export default function WatchPage() {
  const params = useParams();
  const videoId = params.id as string;

  const [video, setVideo] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    async function loadVideo() {
      try {
        setLoading(true);
        const videoData = await getVideoDetails(videoId);

        if (videoData) {
          setVideo(videoData);
          setSubscribed(isSubscribed(videoData.authorId));

          // Ajouter à l'historique
          addToHistory({
            videoId: videoData.videoId,
            title: videoData.title,
            author: videoData.author,
            authorId: videoData.authorId,
            thumbnail: videoData.videoThumbnails?.[0]?.url || '',
            watchedAt: Date.now(),
          });
        } else {
          setError('Vidéo introuvable');
        }
      } catch (err) {
        setError('Erreur lors du chargement de la vidéo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadVideo();
  }, [videoId]);

  const handleSubscribe = () => {
    if (!video) return;

    if (subscribed) {
      removeSubscription(video.authorId);
      setSubscribed(false);
    } else {
      addSubscription({
        authorId: video.authorId,
        author: video.author,
        authorUrl: video.authorUrl || '',
        authorThumbnail: video.videoThumbnails?.[0]?.url,
        subscribedAt: Date.now(),
      });
      setSubscribed(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-xl mb-4">{error}</p>
          <Link href="/" className="text-red-500 hover:text-red-600">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale - Vidéo */}
          <div className="lg:col-span-2">
            {/* Player vidéo */}
            <div className="bg-black rounded-lg overflow-hidden aspect-video mb-4">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Titre et stats */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {video.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
                  <span>{formatViewCount(video.viewCount)}</span>
                  <span>•</span>
                  <span>{formatPublishedDate(video.published)}</span>
                </div>

                {video.likeCount && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{formatViewCount(video.likeCount)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info chaîne */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <Link
                  href={`/channel/${video.authorId}`}
                  className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 -m-2 transition-colors"
                >
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {video.author[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {video.author}
                    </h3>
                  </div>
                </Link>

                <button
                  onClick={handleSubscribe}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                    subscribed
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  {subscribed ? 'Abonné' : "S'abonner"}
                </button>
              </div>

              {/* Description */}
              {video.description && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <p
                    className={`text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap ${
                      !showFullDescription ? 'line-clamp-3' : ''
                    }`}
                  >
                    {video.description}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="mt-2 text-sm text-red-500 hover:text-red-600 font-semibold"
                  >
                    {showFullDescription ? 'Voir moins' : 'Voir plus'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Colonne latérale - Vidéos recommandées */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Vidéos suggérées
            </h2>
            {video.recommendedVideos && video.recommendedVideos.length > 0 ? (
              <div className="space-y-3">
                {video.recommendedVideos.slice(0, 10).map((rec) => (
                  <Link
                    key={rec.videoId}
                    href={`/watch/${rec.videoId}`}
                    className="flex gap-2 group"
                  >
                    <div className="relative w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                      <img
                        src={rec.videoThumbnails?.[0]?.url}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-red-500 transition-colors">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {rec.author}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatViewCount(rec.viewCount)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                Aucune recommandation disponible
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
