import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRejectSubmission } from '@/features/admin/mutations/use-reject-submission';
import { rejectSubmissionSchema, type RejectSubmissionInput } from '@/features/admin/schemas/admin.schema';
import type { submission } from '@/features/admin/types/admin.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface RejectDialogProps {
  submission: submission;
  onClose: () => void;
}
export function RejectDialog({ submission, onClose }: RejectDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RejectSubmissionInput>({
    resolver: zodResolver(rejectSubmissionSchema),
  });

  const { mutate, isPending } = useRejectSubmission();
  function onSubmit(data: RejectSubmissionInput) {
    mutate(
      {
        submissionId: submission.id,
        data,
      },
      {
        onSuccess: onClose,
      },
    );
  }
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className=" max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-neutral-100">Reject Submission</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="adminFeedback">Admin Feedback</Label>
            <Textarea id="adminFeedback" placeholder="Admin feedback..." {...register('adminFeedback')} />

            {errors.adminFeedback && <p className="text-xs text-destructive">{errors.adminFeedback.message}</p>}
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? 'Rejecting...' : 'Reject'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
