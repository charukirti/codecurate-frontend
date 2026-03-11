import { Button } from '@/components/ui/button';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ResourcePaginationProps {
  totalPages: number;
  currentPage: number;
}

export function ResourcePagination({ totalPages, currentPage }: ResourcePaginationProps) {
  const navigate = useNavigate({ from: '/resources/' });
  const search = useSearch({ from: '/resources/' });

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    navigate({ search: { ...search, page } });
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <Button
        variant={'outline'}
        size={'sm'}
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="bg-neutral-900 border-neutral-700 text-neutral-200 hover:bg-neutral-800 disabled:opacity-30"
      >
        <ArrowLeft />
        Prev
      </Button>

      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <Button
              key={page}
              variant={'ghost'}
              size={'sm'}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 text-xs font-mono ${page === currentPage ? 'bg-neutral-700 text-neutral-100' : 'text-neutral-500 hover:text-neutral-300'}`}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="bg-neutral-900 border-neutral-700 text-neutral-300 hover:bg-neutral-800 disabled:opacity-30"
      >
        Next <ArrowRight />
      </Button>
    </div>
  );
}
