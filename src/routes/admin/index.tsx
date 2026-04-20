import { adminSubmissionsQueryOptions } from '@/features/admin/queries/query-options';
import { resourcesQueryOptions } from '@/features/resources/queries/query-options';
import { resourcesSearchSchema } from '@/features/resources/schemas/resources.schema';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { FolderArchive, LayoutDashboard } from 'lucide-react';

export const Route = createFileRoute('/admin/')({
  validateSearch: (search) => resourcesSearchSchema.parse(search),
  loaderDeps: ({ search }) => ({
    page: search.page,
    limit: search.limit,
    codeLang: search.codeLang,
    topic: search.topic,
    type: search.type,
    search: search.search,
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const search = Route.useSearch();
  const { data: submissionsData } = useSuspenseQuery(adminSubmissionsQueryOptions());
  const { data: resourcesData } = useSuspenseQuery(resourcesQueryOptions(search));

  const pendingCount = submissionsData?.data.filter((s) => s.status === 'pending').length ?? '—';
  const totalResources = resourcesData?.data.length ?? '—';
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome back, Admin</p>
      </div>

      {/* Stat cards - static for now */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Pending Submissions</p>
          <p className="text-3xl font-bold text-gray-100 mt-2">{pendingCount}</p>
          <p className="text-xs text-yellow-500 mt-1">needs action</p>
        </div>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Total Resources</p>
          <p className="text-3xl font-bold text-gray-100 mt-2">{totalResources}</p>
          <p className="text-xs text-gray-500 mt-1">all time</p>
        </div>
      </div>
      {/* Quick nav cards */}
      <div>
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/admin/submissions"
            className="group rounded-lg border border-neutral-800 bg-neutral-900 p-5 hover:border-blue-600 transition-colors"
          >
            <FolderArchive size={20} className="text-blue-500 mb-3" />
            <p className="font-semibold text-gray-100">Submissions</p>
            <p className="text-xs text-gray-400 mt-1">Review and approve user submitted resources</p>
          </Link>

          <Link
            to="/admin/resources"
            search={{ page: 1, limit: 10 }}
            className="group rounded-lg border border-neutral-800 bg-neutral-900 p-5 hover:border-blue-600 transition-colors"
          >
            <LayoutDashboard size={20} className="text-blue-500 mb-3" />
            <p className="font-semibold text-gray-100">Resources</p>
            <p className="text-xs text-gray-400 mt-1">Manage all published resources</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
