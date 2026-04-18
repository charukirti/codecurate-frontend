import { Badge } from '@/components/ui/badge';
import type { Status } from '@/features/submissions/types/submissions.types';
import { statusConfig } from '@/lib/utils';

interface StatusBadgeProps {
  status: Status;
}
export function StatusBadge({ status }: StatusBadgeProps) {
  const { text, color } = statusConfig[status];

  return (
    <Badge variant="outline" style={{ borderColor: color, color: color }}>
      {text}
    </Badge>
  );
}
