import { Button } from '@/components/ui/button';
import type { Status } from '@/features/submissions/types/submissions.types';

interface ActionButtonsProps {
  status: Status;
}
export function ActionButtons({ status }: ActionButtonsProps) {
  const isPending = status === 'pending';
  return (
    <div className="flex items-center gap-5">
      <Button size="sm" disabled={!isPending}>
        Accept
      </Button>
      <Button size="sm" variant="destructive" disabled={!isPending}>
        Reject
      </Button>
    </div>
  );
}
