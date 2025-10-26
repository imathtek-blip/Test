'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VideoGrid from '@/components/VideoGrid';
import Sidebar from '@/components/Sidebar';
import { getChannel, getChannelVideos } from '@/lib/youtube-api';
import { isSubscribed, addSubscription, removeSubscription } from '@/lib/storage';
import type { Channel, Video } from '@/lib/types';

export default function ChannelPage() {
  const params = useParams();
  const channelId = params.id as string;

  const [channel, setChannel] = useState<Channel | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    async function loadChannel() {
      try {
        setLoading(true);
        const [channelData, channelVids] = await Promise.all([
          getChannel(channelId),
          getChannelVideos(channelId),
        ]);

        if (channelData) {
          setChannel(channelData);
          setSubscribed(isSubscribed(channelData.authorId));
        }
        setVideos(channelVids);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadChannel();
  }, [channelId]);

  const handleSubscribe = () => {
    if (!channel) return;

    if (subscribed) {
      removeSubscription(channel.authorId);
      setSubscribed(false);
    } else {
      addSubscription({
        authorId: channel.authorId,
        author: channel.author,
        authorUrl: channel.authorUrl,
        authorThumbnail: channel.authorThumbnails?.[0]?.url,
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

  if (!channel) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Chaîne introuvable</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1">
        {/* Banner */}
        {channel.authorBanners && channel.authorBanners.length > 0 && (
          <div className="h-48 md:h-64 bg-gradient-to-r from-red-500 to-red-600 relative overflow-hidden">
            <img
              src={channel.authorBanners[0].url}
              alt={channel.author}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Channel info */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6 -mt-16 relative z-10 shadow-lg">
            <div className="flex items-start gap-6 flex-wrap">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-red-500 flex items-center justify-center text-white text-5xl font-bold flex-shrink-0">
                {channel.authorThumbnails && channel.authorThumbnails.length > 0 ? (
                  <img
                    src={channel.authorThumbnails[0].url}
                    alt={channel.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  channel.author[0]
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {channel.author}
                </h1>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                  {channel.subCount && (
                    <span>{(channel.subCount / 1000000).toFixed(1)}M abonnés</span>
                  )}
                  {channel.totalViews && (
                    <span>{(channel.totalViews / 1000000).toFixed(1)}M vues</span>
                  )}
                </div>
                {channel.description && (
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {channel.description}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubscribe}
                className={`px-8 py-3 rounded-full font-semibold transition-colors flex-shrink-0 ${
                  subscribed
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {subscribed ? 'Abonné' : "S'abonner"}
              </button>
            </div>
          </div>

          {/* Videos */}
          <VideoGrid videos={videos} title="Vidéos" />
        </div>
      </main>
    </div>
  );
}
