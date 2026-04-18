import { Button } from '@/components/ui/button';
import type { Status } from '@/features/submissions/types/submissions.types';

interface ActionButtonsProps {
  status: Status;
  onAccept: () => void;
  onReject: () => void;
}
export function ActionButtons({ status, onAccept, onReject }: ActionButtonsProps) {
  const isPending = status === 'pending';
  return (
    <div className="flex items-center gap-5">
      <Button size="sm" disabled={!isPending} onClick={onAccept}>
        Accept
      </Button>
      <Button size="sm" variant="destructive" disabled={!isPending} onClick={onReject}>
        Reject
      </Button>
    </div>
  );
}
