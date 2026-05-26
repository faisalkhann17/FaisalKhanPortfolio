import { motion } from "framer-motion";

export function Education() {
  return (
    <section id="education" className="relative w-full px-6 py-32 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">(04) — Education</div>
        </div>
        <div className="md:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="border-t border-white/10 pt-10"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="font-display text-4xl md:text-6xl">BTech, Computer Science</h3>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon)]">Degree</span>
            </div>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              RGPV University — Bachelor of Technology
            </p>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Focused on computer science fundamentals, AI/ML coursework and hands-on projects across full-stack development and data analytics.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
