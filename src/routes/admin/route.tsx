import { Header } from '@/components/layout/header';
import { currentUserQueryOptions } from '@/features/auth/queries/useGetCurrentUser';
import { createFileRoute, isRedirect, Link, Outlet, redirect } from '@tanstack/react-router';
import { FolderArchive, LayoutDashboard, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.ensureQueryData(currentUserQueryOptions());
      if (user.data.role !== 'admin') throw redirect({ to: '/' });
    } catch (error) {
      if (isRedirect(error)) throw error;
      throw redirect({ to: '/' });
    }
  },
  component: AdminLayout,
});

const sidebarLinks = [
  { to: '/admin/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/submissions', label: 'Submissions', icon: FolderArchive },
  { to: '/admin/resources', label: 'Resources', icon: LayoutDashboard },
];

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header variant="rootLayout" />
      <div className="flex">
        <aside
          className={`shrink-0 border-r border-neutral-800 sticky top-16 h-[calc(100vh-64px)] transition-all duration-300 ${
            collapsed ? 'w-14' : 'w-52'
          }`}
        >
          <div
            className={`flex items-center border-b border-neutral-800 ${collapsed ? 'justify-center px-3 py-3' : 'justify-between px-3 py-3'}`}
          >
            {!collapsed && (
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Admin Panel</span>
            )}
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="text-gray-400 hover:text-gray-100 transition-colors"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-2 mt-1">
            {sidebarLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                title={collapsed ? label : undefined}
                className="flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-400 hover:text-gray-100 hover:bg-neutral-800 transition-colors"
                activeProps={{
                  className: 'flex items-center gap-3 px-2 py-2 rounded-md text-sm text-gray-100 bg-neutral-800',
                }}
              >
                <Icon size={16} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
