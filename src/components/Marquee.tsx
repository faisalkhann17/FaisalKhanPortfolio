export function Marquee() {
  const items = ["AI Engineering", "★", "Full Stack", "★", "Machine Learning", "★", "Data Analytics", "★", "Deep Learning", "★", "NLP", "★"];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-background py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-5xl md:text-7xl">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className={i % 2 === 0 ? "text-foreground" : "text-[var(--neon)]"}>{t}</span>
        ))}
      </div>
    </div>
  );
}
