import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Submission } from '@/features/submissions/types/submissions.types';
import { statusConfig, truncateUrl } from '@/lib/utils';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface SubmissionCardProps {
  data: Submission;
}

export function SubmissionCard({ data }: SubmissionCardProps) {
  const { text, color } = statusConfig[data.status];
  return (
    <Card className="w-full max-w-md border border-neutral-800 hover:border-neutral-700 transition-colors">
      <CardContent className="flex flex-col gap-3 pt-3">
        <div className="flex items-center justify-between">
          <Badge>{data.topic}</Badge>
          <Badge variant="outline" style={{ borderColor: color, color: color }}>
            {text}
          </Badge>
        </div>

        <h2 className="text-lg font-semibold">{data.title}</h2>

        <a
          href={data.youtubeURL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors w-fit"
        >
          <ExternalLink className="size-3 shrink-0" />
          {truncateUrl(data.youtubeURL)}
        </a>

        {data.description && (
          <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">{data.description}</p>
        )}

        <p className="text-[11px] font-mono text-neutral-400">
          Submitted{' '}
          {new Date(data.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
        </p>

        {data.status === 'rejected' && data.adminFeedback && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-md p-3">
            <AlertTriangle className="size-3.5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-400 leading-relaxed">
              <span className="font-medium">Admin feedback:</span> {data.adminFeedback}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
