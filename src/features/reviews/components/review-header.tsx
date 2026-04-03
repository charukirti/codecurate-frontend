import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WriteReview } from '@/features/reviews/components/write-review';
import type { SortType } from '@/features/reviews/schemas/reviews.schema';

interface ReviewHeaderProps {
  resourceId: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
  sort: SortType;
  setSort: (sort: SortType) => void;
  totalItems: number;
  isLoggedIn: boolean;
}

export function ReviewHeader({
  resourceId,
  open,
  setIsOpen,
  sort,
  setSort,
  totalItems,
  isLoggedIn,
}: ReviewHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <h2 className="text-lg font-semibold text-neutral-100">
          Reviews <span className="text-neutral-500 font-normal text-sm">({totalItems})</span>
        </h2>

        <Select value={sort} onValueChange={(val) => setSort(val as SortType)}>
          <SelectTrigger className="w-36 bg-neutral-900 border-neutral-800 text-neutral-400 text-xs font-mono">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-300">
            <SelectItem value="newest" className="text-xs  font-mono">
              Newest
            </SelectItem>
            <SelectItem value="oldest" className="text-xs font-mono">
              Oldest
            </SelectItem>
            <SelectItem value="highest" className="text-xs font-mono">
              Highest Rated
            </SelectItem>
            <SelectItem value="lowest" className="text-xs font-mono">
              Lowest Rated
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoggedIn && (
        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogTrigger
            render={
              <Button variant={'outline'} size="sm" className=" text-white text-xs">
                Write a Review
              </Button>
            }
          />

          <DialogContent className="bg-neutral-900 border-neutral-800 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-neutral-100">Write a Review</DialogTitle>
            </DialogHeader>

            <WriteReview resourceId={resourceId} onSuccess={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
