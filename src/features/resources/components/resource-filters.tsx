import { useNavigate, useSearch } from '@tanstack/react-router';
import type { ResourcesSearch } from '@/features/resources/schemas/resources.schema';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

export function ResourceFilters() {
  const navigate = useNavigate({ from: '/resources/' });
  const { type, codeLang } = useSearch({ from: '/resources/' });

  function updateFilter(updates: Partial<ResourcesSearch>) {
    navigate({ search: (prev) => ({ ...prev, ...updates, page: 1 }) });
  }

  function clearFilters() {
    navigate({ search: { page: 1, limit: 6 } });
  }

  const hasFilters = !!type || !!codeLang;

  console.log(codeLang);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <div className="flex gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
        {(['all', 'video', 'playlist'] as const).map((t) => (
          <Button
            key={t}
            variant="ghost"
            size="sm"
            onClick={() => updateFilter({ type: t === 'all' ? undefined : t })}
            className={`px-3 py-1.5 text-xs font-mono capitalize ${
              (t === 'all' && !type) || type === t
                ? 'bg-neutral-700 text-neutral-100 hover:bg-neutral-700'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {t}
          </Button>
        ))}
      </div>

      <Select
        value={codeLang ?? 'all'}
        onValueChange={(val) =>
          updateFilter({ codeLang: (val === 'all' ? undefined : val) as ResourcesSearch['codeLang'] })
        }
      >
        <SelectTrigger className="w-44 bg-neutral-900 border-neutral-800 text-neutral-400 text-xs font-mono focus:ring-0 focus:border-neutral-600">
          <SelectValue placeholder="All Languages" />
        </SelectTrigger>
        <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-300">
          <SelectItem value="all">All Languages</SelectItem>
          {CODE_LANGS.map((lang) => (
            <SelectItem key={lang} value={lang} className="text-xs font-mono">
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs font-mono text-neutral-500 hover:text-neutral-300 underline underline-offset-4"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
