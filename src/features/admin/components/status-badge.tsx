import { Badge } from '@/components/ui/badge';
import type { Status } from '@/features/submissions/types/submissions.types';

const statusConfig: Record<Status, { text: string; color: string }> = {
  pending: { text: 'Pending', color: '#F8DE22' },
  accepted: { text: 'Accepted', color: '#6FCF97' },
  rejected: { text: 'Rejected', color: '#DB1A1A' },
};

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
