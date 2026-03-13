import { useGetTags } from '@/features/reviews/queries/use-get-tags';
import { createReviewSchema, type CreateReviewInput } from '@/features/reviews/schemas/reviews.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCreateReview } from '@/features/reviews/mutations/use-create-review';
import { Label } from '@/components/ui/label';

interface WriteReviewProps {
  resourceId: string;
  onSuccess?: () => void;
}

export function WriteReview({ resourceId, onSuccess }: WriteReviewProps) {
  const { data: tagsData, isLoading: tagsLoading } = useGetTags();
  const { mutate, isPending } = useCreateReview(resourceId);
  const tags = tagsData?.data ?? [];

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateReviewInput>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: { tagIds: [] },
  });

  const selectedRating = watch('rating');
  const selectedTags = watch('tagIds');

  function toggleTag(tagId: string) {
    const current = selectedTags ?? [];
    if (current.includes(tagId)) {
      setValue(
        'tagIds',
        current.filter((id) => id !== tagId),
      );
    } else {
      setValue('tagIds', [...current, tagId]);
    }
  }

  function onSubmit(data: CreateReviewInput) {
    mutate(data, {
      onSuccess: () => onSuccess?.(),
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label className="text-sm text-neutral-400">Select Rating</Label>
          <Controller
            control={control}
            name="rating"
            render={() => (
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Button
                    key={num}
                    type="button"
                    onClick={() => setValue('rating', num)}
                    className={`w-9 h-9 rounded-lg text-sm font-mono font-semibold transition-colors ${
                      selectedRating === num
                        ? 'bg-amber-400 text-neutral-900'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            )}
          />
          {errors.rating && <p className="text-red-500 text-xs">{errors.rating.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm text-neutral-400">
            Select Tags <span className="text-neutral-600 text-xs">(select 2-3)</span>
          </Label>
          {tagsLoading ? (
            <div className="flex gap-2 flex-wrap animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-7 w-24 bg-neutral-800 rounded-full" />
              ))}
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                    selectedTags?.includes(tag.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                  }`}
                >
                  {tag.displayName}
                </Button>
              ))}
            </div>
          )}
          {errors.tagIds && <p className="text-red-500 text-xs">{errors.tagIds.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm text-neutral-400">
            Write Review <span className="text-neutral-600 text-xs">(optional)</span>
          </Label>
          <Textarea
            {...register('reviewText')}
            placeholder="Write your thoughts about this tutorial..."
            className="bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-600 resize-none min-h-24"
          />
          {errors.reviewText && <p className="text-red-500 text-xs">{errors.reviewText.message}</p>}
        </div>

        <Button type="submit" className="text-white w-full" disabled={isPending}>
          Submit Review
        </Button>
      </form>
    </>
  );
}
