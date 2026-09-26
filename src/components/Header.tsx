export function Header() {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-line">
      <div className="flex items-center gap-2 font-display font-extrabold text-xl tracking-wide">
        <span className="w-2 h-2 bg-accent rounded-sm rotate-45 inline-block" />
        LOOM
      </div>

      <nav className="hidden md:flex gap-8">
        {["What's New", "Women", "Men", "Gear", "Training", "Sale"].map((item) => (
          <a
            key={item}
            href="#"
            
            className="text-sm font-medium text-cream/70 hover:text-cold hover:opacity-100 transition"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <input
          className="hidden md:block bg-panel border border-line rounded-md px-3.5 py-2 text-sm text-muted w-52"
          placeholder="Search products"
        />
        <button className="text-cream/85 text-base">♡</button>
        <button className="relative text-cream/85 text-base">
          ⊙
          <span className="absolute -top-2 -right-2.5 bg-accent text-cream text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
            0
          </span>
        </button>
        <button className="md:hidden text-cream text-xl">☰</button>
      </div>
    </header>
  );
}