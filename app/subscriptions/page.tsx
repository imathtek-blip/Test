'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { getSubscriptions } from '@/lib/storage';
import type { Subscription } from '@/lib/types';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    setSubscriptions(getSubscriptions());
  }, []);

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Mes abonnements
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {subscriptions.length} abonnement{subscriptions.length > 1 ? 's' : ''}
            </p>
          </div>

          {subscriptions.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                Vous n'êtes abonné à aucune chaîne
              </p>
              <Link
                href="/trending"
                className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Découvrir des chaînes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {subscriptions.map((sub) => (
                <Link
                  key={sub.authorId}
                  href={`/channel/${sub.authorId}`}
                  className="bg-white dark:bg-gray-900 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col items-center text-center">
                    {sub.authorThumbnail ? (
                      <img
                        src={sub.authorThumbnail}
                        alt={sub.author}
                        className="w-24 h-24 rounded-full mb-3"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3">
                        {sub.author[0]}
                      </div>
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {sub.author}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Abonné depuis{' '}
                      {new Date(sub.subscribedAt).toLocaleDateString('fr-FR')}
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
