type HeroProps = {
  gearCount: number;
  categoryCount: number;
};

export function Hero({ gearCount, categoryCount }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line px-6 md:px-16 py-14 md:py-24 flex flex-col justify-center min-h-[auto] md:min-h-[520px]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#232328 1px, transparent 1px), linear-gradient(90deg, #232328 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 30% 40%, black 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2.5 text-accent text-sm font-semibold mb-6">
          <span className="w-5 h-px bg-accent inline-block" />
          New Season
        </div>

        <h1
          className="text-4xl md:text-[58px] leading-[1.03] mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(180deg, #eeeceb 55%, #6f6d72)",
          }}
        >
          Built for the work before the workout.
        </h1>

        <p className="text-muted text-base max-w-md leading-relaxed mb-10">
          Gear tested past the point most people stop training. Shop the
          pieces that hold up to the sessions that actually matter.
        </p>

        <button className="bg-accent text-cream rounded-md px-8 py-4 text-sm font-semibold">
          Shop New Arrivals
        </button>
      </div>

      <div className="relative z-10 md:absolute md:right-16 md:bottom-24 flex gap-11 mt-10 md:mt-0">
        <div>
          <div className="font-display font-bold text-3xl text-cold">
            {gearCount}
          </div>
          <div className="text-muted text-sm mt-1">Gear pieces</div>
        </div>
        <div>
          <div className="font-display font-bold text-3xl text-cold">
            {categoryCount}
          </div>
          <div className="text-muted text-sm mt-1">Categories</div>
        </div>
      </div>
    </section>
  );
}