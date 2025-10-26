'use client';

import { useEffect, useState } from 'react';
import VideoGrid from '@/components/VideoGrid';
import Sidebar from '@/components/Sidebar';
import { getTrending } from '@/lib/youtube-api';
import type { Video } from '@/lib/types';

export default function TrendingPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<'music' | 'gaming' | 'news' | 'movies'>('music');

  useEffect(() => {
    async function loadTrending() {
      try {
        setLoading(true);
        const trending = await getTrending(category);
        setVideos(trending);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadTrending();
  }, [category]);

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tendances</h1>
            <div className="flex gap-2 flex-wrap">
              {(['music', 'gaming', 'news', 'movies'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    category === cat
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat === 'music' && 'Musique'}
                  {cat === 'gaming' && 'Gaming'}
                  {cat === 'news' && 'Actualités'}
                  {cat === 'movies' && 'Films'}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <VideoGrid videos={videos} />
          )}
        </div>
      </main>
    </div>
  );
}
