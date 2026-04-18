import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAcceptSubmission } from '@/features/admin/mutations/use-accept-submission';
import { acceptSubmissionSchema, type AcceptSubmissionInput } from '@/features/admin/schemas/admin.schema';
import type { submission } from '@/features/admin/types/admin.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

const CODE_LANGS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Tailwind',
  'React',
  'TypeScript',
  'Node.js',
  'Go',
  'Python',
  'Rust',
  'Java',
  'C',
  'C++',
  'C#',
] as const;

interface AcceptDialogProps {
  submission: submission;
  onClose: () => void;
}
export function AcceptDialog({ submission, onClose }: AcceptDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AcceptSubmissionInput>({
    resolver: zodResolver(acceptSubmissionSchema),
    defaultValues: {
      codeLang: undefined,
    },
  });

  const { mutate, isPending } = useAcceptSubmission();
  function onSubmit(data: AcceptSubmissionInput) {
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
          <DialogTitle className="text-neutral-100">Accept Submission</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="videoLang">Video Lang</Label>
            <Input id="videoLang" type="text" placeholder="Enter video language..." {...register('videoLang')} />

            {errors.videoLang && <p className="text-xs text-destructive">{errors.videoLang.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructorName">Instructor Name</Label>
            <Input
              id="instructorName"
              type="text"
              placeholder="Enter instructor name..."
              {...register('instructorName')}
            />

            {errors.instructorName && <p className="text-xs text-destructive">{errors.instructorName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="codeLang">Select coding language</Label>
            <Controller
              control={control}
              name="codeLang"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language..." />
                  </SelectTrigger>
                  <SelectContent>
                    {CODE_LANGS.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.codeLang && <p className="text-xs text-destructive">{errors.codeLang.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminFeedback">Admin Feedback</Label>
            <Textarea id="adminFeedback" placeholder="Admin feedback..." {...register('adminFeedback')} />

            {errors.adminFeedback && <p className="text-xs text-destructive">{errors.adminFeedback.message}</p>}
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Accepting...' : 'Accept'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
