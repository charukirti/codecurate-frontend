import { Link } from '@tanstack/react-router';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-blue-600/10 blur-[100px] rounded-full" />

      <div className="relative container mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-700 rounded-full px-4 py-1.5 text-xs font-mono text-neutral-100 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Community-driven tutorial reviews
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Find tutorials that
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">actually work.</span>
        </h1>

        <p className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          CodeCurate helps developers cut through the noise — curated YouTube tutorials, rated and reviewed by the
          community.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            to="/resources"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors text-sm"
            search={{ page: 1 }}
          >
            Browse Tutorials
          </Link>
          <Link
            to="/auth/sign-in"
            className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold rounded-lg transition-colors text-sm border border-neutral-700"
          >
            Write a Review
          </Link>
        </div>
      </div>
    </section>
  );
}
