import type { Resource } from '@/features/resources/types/resources.types';
import { Star, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResourceHeroProps {
  resource: Resource;
}

export function ResourceHero({ resource }: ResourceHeroProps) {
  const {
    title,
    topic,
    codeLang,
    type,
    itemCount,
    videoLang,
    instructorName,
    durationSeconds,
    avgRating,
    thumbnails,
    videoId,
    playlistId,
    channelName,
    publishedAt,
  } = resource;

  const rating = parseFloat(avgRating);

  const ytUrl = videoId ? `https://youtube.com/watch?v=${videoId}` : `https://youtube.com/playlist?list=${playlistId}`;

  const thumb =
    thumbnails.maxres?.url ||
    thumbnails.standard?.url ||
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Thumbnail */}
        <div className="w-full md:w-2/5 shrink-0">
          <div className="rounded-xl overflow-hidden aspect-video bg-neutral-800">
            {thumb ? (
              <img src={thumb} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600">No thumbnail</div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 justify-center">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="font-mono text-xs bg-neutral-800 text-neutral-400 border border-neutral-700"
            >
              {topic}
            </Badge>
            {codeLang && (
              <Badge
                variant="secondary"
                className="font-mono text-xs bg-blue-950/60 text-blue-400 border border-blue-900/50"
              >
                {codeLang}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className={`font-mono text-xs ${type === 'playlist' ? 'bg-violet-950/60 text-violet-400 border border-violet-900/50' : 'bg-neutral-800 text-neutral-400 border border-neutral-700'}`}
            >
              {type === 'playlist'
                ? `Playlist · ${itemCount} videos`
                : `Video · ${Math.floor((durationSeconds ?? 0) / 60)}m`}
            </Badge>

            <Badge
              variant="secondary"
              className="font-mono text-xs bg-blue-950/60 text-blue-400 border border-blue-900/50"
            >
              {videoLang}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-100 leading-snug">{title}</h1>

          <div className="flex items-center gap-5">
            {/* Instructor */}
            <p className="text-neutral-400 text-sm">
              Instructor: <span className="text-neutral-200 font-medium">{instructorName}</span>
            </p>

            {/* Channel */}
            <p className="text-neutral-400 text-sm">
              Channel: <span className="text-neutral-200 font-medium">{channelName}</span>
            </p>
          </div>

          <p className="text-neutral-400 text-sm">
            Published at:{' '}
            <span className="text-neutral-200 font-medium">
              {new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`}
              />
            ))}
            <span className="text-sm text-neutral-400 ml-1">{rating > 0 ? rating.toFixed(1) : 'No ratings yet'}</span>
          </div>

          {/* YouTube link */}
          <div>
            <a
              href={ytUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
