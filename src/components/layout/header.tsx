import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSignOut } from '@/features/auth/mutations/use-sign-out';
import { useGetCurrentUser } from '@/features/auth/queries/useGetCurrentUser';
import { Link, useNavigate } from '@tanstack/react-router';
import { FolderArchive, Plus, ShieldIcon, User } from 'lucide-react';

interface HeaderProps {
  variant?: 'rootLayout' | 'authLayout';
}

export function Header({ variant }: HeaderProps) {
  const { data, isLoading } = useGetCurrentUser();
  const { mutate: signOut } = useSignOut();
  const navigate = useNavigate();

  const usernameInitial = data?.data.username ? data.data.username[0].toUpperCase() : '';

  function handleSignOut() {
    signOut();
  }

  if (variant === 'authLayout') {
    return (
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-xl">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-200">
            CodeCurate
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-900/95 supports-backdrop-filter:bg-neutral-900/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-200">
            CodeCurate
          </Link>

          {isLoading ? (
            <div className="w-9 h-9 rounded-full bg-neutral-800 animate-pulse" />
          ) : data ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate({ to: '/submissions/create' })}
                size={'icon'}
                aria-label="Suggest Video or Playlist to add"
              >
                <Plus size={20} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button className="w-9 h-9 rounded-full text-white font-semibold text-sm flex items-center justify-center hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 border-2 border-blue-700 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                      {usernameInitial}
                    </Button>
                  }
                />
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-neutral-900 border border-neutral-800 text-gray-200"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-gray-400 text-xs font-normal">
                      @{data.data.username}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-neutral-800" />
                    <DropdownMenuItem
                      className="hover:bg-neutral-800 "
                      render={
                        <Link
                          to="/users/$username"
                          params={{ username: data.data.username }}
                          className="cursor-pointer"
                        >
                          <User /> My Profile
                        </Link>
                      }
                    />
                    <DropdownMenuItem
                      className="hover:bg-neutral-800 "
                      render={
                        <Link to="/admin" search={{ page: 1, limit: 10 }} className="cursor-pointer">
                          <ShieldIcon />
                          Admin Panel
                        </Link>
                      }
                    />

                    <DropdownMenuItem
                      className="hover:bg-neutral-800 "
                      render={
                        <Link to="/submissions" className="cursor-pointer">
                          <FolderArchive /> My Submissions
                        </Link>
                      }
                    />

                    <DropdownMenuItem
                      className="text-red-400 hover:bg-neutral-800 hover:text-red-400 cursor-pointer"
                      variant="destructive"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              to="/auth/sign-in"
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
