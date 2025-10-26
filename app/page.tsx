'use client';

import { useEffect, useState } from 'react';
import VideoGrid from '@/components/VideoGrid';
import Sidebar from '@/components/Sidebar';
import { getTrending } from '@/lib/youtube-api';
import type { Video } from '@/lib/types';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVideos() {
      try {
        setLoading(true);
        const trending = await getTrending();
        setVideos(trending);
      } catch (err) {
        setError('Erreur lors du chargement des vidéos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Accueil
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Découvrez les vidéos tendances et vos abonnements
            </p>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Videos grid */}
          {!loading && !error && (
            <VideoGrid videos={videos} title="Tendances" />
          )}
        </div>
      </main>
    </div>
  );
}
