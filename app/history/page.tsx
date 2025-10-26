'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { getHistory, clearHistory } from '@/lib/storage';
import type { HistoryItem } from '@/lib/types';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer tout votre historique ?')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Historique
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {history.length} vidéo{history.length > 1 ? 's' : ''} regardée{history.length > 1 ? 's' : ''}
              </p>
            </div>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Effacer l'historique
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Votre historique est vide
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item) => (
                <Link
                  key={`${item.videoId}-${item.watchedAt}`}
                  href={`/watch/${item.videoId}`}
                  className="flex gap-4 bg-white dark:bg-gray-900 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-48 flex-shrink-0 aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <Link
                      href={`/channel/${item.authorId}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white block mb-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.author}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Regardée le {new Date(item.watchedAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
