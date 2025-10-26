'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import VideoGrid from '@/components/VideoGrid';
import Sidebar from '@/components/Sidebar';
import { searchVideos } from '@/lib/youtube-api';
import type { SearchResult, Video } from '@/lib/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function search() {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const searchResults = await searchVideos(query);
        const videos = searchResults.filter(r => r.type === 'video') as unknown as Video[];
        setResults(videos);
      } catch (err) {
        setError('Erreur lors de la recherche');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [query]);

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Résultats pour : {query}
            </h1>
            {!loading && (
              <p className="text-gray-600 dark:text-gray-400">
                {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
              </p>
            )}
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && results.length === 0 && query && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Aucun résultat pour cette recherche
              </p>
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <VideoGrid videos={results} />
          )}
        </div>
      </main>
    </div>
  );
}
