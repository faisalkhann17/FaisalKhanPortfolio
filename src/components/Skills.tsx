import { motion } from "framer-motion";

const groups = [
  { title: "Frontend", items: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
  { title: "AI / ML", items: ["Python", "Scikit-learn", "PyTorch", "Deep Learning", "NLP", "Machine Learning"] },
  { title: "Data", items: ["Power BI", "SQL", "Data Analysis", "Dashboards"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative w-full px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-20 flex items-end justify-between">
          <div>
            <div className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">(02) — Capabilities</div>
            <h2 className="font-display text-[12vw] leading-[0.9] md:text-[7vw]">
              Stack & <span className="text-stroke">tools.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              data-cursor="hover"
              className="group relative overflow-hidden bg-background p-8 transition-colors hover:bg-card md:p-12"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--neon)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-20" />
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-display text-3xl md:text-5xl">{g.title}</h3>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground/80 transition-all hover:border-[var(--neon)] hover:text-[var(--neon)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
