import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative w-full px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="sticky top-32 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            (01) — About
          </motion.div>
        </div>
        <div className="md:col-span-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display text-[12vw] leading-[0.9] md:text-[8vw]"
          >
            About <span className="text-stroke">me.</span>
          </motion.h2>

          <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-2xl">
            {[
              "I'm Faisal Khan — an AI Engineer, Full-Stack Developer and Data Analyst building intelligent systems and scalable digital products.",
              "I work across machine learning, deep learning, and modern web stacks to ship products that are fast, thoughtful, and genuinely useful.",
              "From training models to shipping interfaces — I care about the entire stack of the experience.",
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4">
            {[
              ["3+", "Years building"],
              ["20+", "Projects shipped"],
              ["12+", "AI models trained"],
              ["∞", "Cups of chai"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-4xl text-[var(--neon)] md:text-6xl">{n}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
