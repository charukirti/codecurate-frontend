import { Link } from '@tanstack/react-router';
import { FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-neutral-100">CodeCurate</span>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Community-driven reviews for YouTube coding tutorials.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">Navigate</span>
            <Link to="/" className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors w-fit">
              Home
            </Link>
            <Link
              to="/resources"
              search={{ page: 1, limit: 10 }}
              className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors w-fit"
            >
              Browse Tutorials
            </Link>
            <Link
              to="/auth/sign-in"
              className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors w-fit"
            >
              Sign In
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">Project</span>
            <a
              href="https://github.com/charukirti"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200 transition-colors w-fit"
            >
              <FaGithub />
              GitHub
            </a>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-6 text-center">
          <p className="text-xs text-neutral-600 font-mono">
            © {new Date().getFullYear()} CodeCurate. Built for developers, by developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
