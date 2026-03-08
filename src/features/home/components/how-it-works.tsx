const steps = [
  {
    num: '01',
    title: 'Browse Tutorials',
    desc: 'Explore curated YouTube tutorials filtered by topic, language, and rating.',
  },
  {
    num: '02',
    title: 'Read Reviews',
    desc: 'See honest community reviews before investing your time in a tutorial.',
  },
  {
    num: '03',
    title: 'Share Your Take',
    desc: 'Finished a tutorial? Rate it and help other developers make better choices.',
  },
];
export function HowItWorks() {
  return (
    <section className="border-b border-neutral-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-mono text-neutral-100 uppercase tracking-widest mb-10 text-center">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col gap-3">
              <span className="text-4xl font-mono font-bold text-neutral-800">{step.num}</span>
              <h3 className="text-base font-semibold text-neutral-100">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
