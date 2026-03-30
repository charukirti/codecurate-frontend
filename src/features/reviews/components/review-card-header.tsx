import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ReviewCardHeaderProps {
  username: string;
  createdAt: Date;
  isOwner: boolean;
  onDelete: () => void;
  isDeleting: boolean;
}

export function ReviewCardHeader({ username, createdAt, isOwner, onDelete, isDeleting }: ReviewCardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-neutral-200">@{username}</span>
      <div className="flex items-center gap-3">
        {isOwner && (
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={onDelete}
            disabled={isDeleting}
            className="text-xs text-red-500 hover:text-red-400 font-mono transition-colors"
          >
            <Trash2 size={20} />
          </Button>
        )}
        <span className="text-xs text-neutral-500 font-mono">
          {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
}
