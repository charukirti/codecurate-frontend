import { Link } from '@tanstack/react-router';

interface HeaderProps {
  variant?: 'rootLayout' | 'authLayout';
}
export function Header({ variant }: HeaderProps) {
  if (variant === 'authLayout') {
    // TODO: add conditional rendering based on authentication status and buttons for sign in/sign up
    return (
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-xl">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-200">
            CodeCurate
          </Link>

          {/* conditional buttons based on authentication status */}
        </nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/95 supports-backdrop-filter:bg-gray-900/60">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-gray-200">
            CodeCurate
          </Link>
        </nav>

        {/* TODO: add navigation links or other elements here */}
      </div>
    </header>
  );
}
