import Link from 'next/link';
import Image from 'next/image';
import type { Video } from '@/lib/types';
import { getBestThumbnail, formatDuration, formatViewCount, formatPublishedDate } from '@/lib/youtube-api';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = getBestThumbnail(video, 'high');
  const duration = formatDuration(video.lengthSeconds);
  const views = formatViewCount(video.viewCount);
  const publishedDate = formatPublishedDate(video.published);

  return (
    <Link href={`/watch/${video.videoId}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
          <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Duration badge */}
          {video.lengthSeconds && (
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          {/* Title */}
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors mb-2">
            {video.title}
          </h3>

          {/* Channel name */}
          <Link
            href={`/channel/${video.authorId}`}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors block mb-1"
            onClick={(e) => e.stopPropagation()}
          >
            {video.author}
          </Link>

          {/* Views and date */}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-2">
            <span>{views}</span>
            <span>•</span>
            <span>{publishedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
