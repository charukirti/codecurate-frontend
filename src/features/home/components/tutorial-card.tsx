import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { Resource } from '@/features/resources/types/resources.types';
import { formatDuration, getThumbnailUrl } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

interface TutorialCardProps {
  resource: Resource;
}

export function TutorialCard({ resource }: TutorialCardProps) {
  const thumb = getThumbnailUrl(resource.thumbnails);
  const rating = parseFloat(resource.avgRating);

  return (
    <Link to="/" className="block group">
      <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-600 transition-all duration-200 overflow-hidden h-full">
        {/* Thumbnail */}
        <CardHeader className="p-0 relative">
          <div className="relative aspect-video bg-neutral-800 overflow-hidden">
            {thumb ? (
              <img
                src={thumb}
                alt={resource.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-600">No thumbnail</div>
            )}
            {/* Type badge */}
            <span
              className={`absolute top-2 right-2 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${resource.type === 'playlist' ? 'bg-violet-600/90 text-violet-100' : 'bg-blue-600/90 text-blue-100'}`}
            >
              {resource.type === 'playlist'
                ? `${resource.itemCount ?? '?'} videos`
                : formatDuration(resource.durationSeconds)}
            </span>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4 flex flex-col gap-2">
          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-[11px] font-mono bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded border border-neutral-700">
              {resource.topic}
            </span>
            {resource.codeLang && (
              <span className="text-[11px] font-mono bg-blue-950/60 text-blue-400 px-2 py-0.5 rounded border border-blue-900/50">
                {resource.codeLang}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-neutral-100 leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {resource.title}
          </h3>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
          <p className="text-xs text-neutral-500">{resource.instructorName}</p>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-neutral-400">{rating > 0 ? rating.toFixed(1) : 'No ratings'}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
