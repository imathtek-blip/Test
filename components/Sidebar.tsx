'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSubscriptions } from '@/lib/storage';
import { useEffect, useState } from 'react';
import type { Subscription } from '@/lib/types';

export default function Sidebar() {
  const pathname = usePathname();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    setSubscriptions(getSubscriptions());
  }, []);

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { icon: '🏠', label: 'Accueil', href: '/' },
    { icon: '🔥', label: 'Tendances', href: '/trending' },
    { icon: '📺', label: 'Abonnements', href: '/subscriptions' },
    { icon: '🕒', label: 'Historique', href: '/history' },
  ];

  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Menu principal */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Abonnements */}
        {subscriptions.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2">
              Mes abonnements
            </h3>
            <nav className="space-y-1">
              {subscriptions.slice(0, 10).map((sub) => (
                <Link
                  key={sub.authorId}
                  href={`/channel/${sub.authorId}`}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {sub.authorThumbnail ? (
                    <img
                      src={sub.authorThumbnail}
                      alt={sub.author}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs">
                      {sub.author[0]}
                    </div>
                  )}
                  <span className="text-sm truncate">{sub.author}</span>
                </Link>
              ))}
            </nav>
            {subscriptions.length > 10 && (
              <Link
                href="/subscriptions"
                className="block px-4 py-2 text-sm text-red-500 hover:text-red-600 dark:hover:text-red-400"
              >
                Voir tout ({subscriptions.length})
              </Link>
            )}
          </div>
        )}

        {/* Footer links */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2 px-4">
            <p>FreeTube Modern</p>
            <p>Version web open-source</p>
            <p className="pt-2">
              <a
                href="https://github.com/FreeTubeApp/FreeTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
              >
                Voir sur GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
