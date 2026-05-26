import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    n: "01",
    title: "Laptop Price Predictor",
    tags: ["Machine Learning", "Regression"],
    desc: "End-to-end ML pipeline predicting laptop prices from specs using gradient-boosted models and a clean React frontend.",
    live: "#",
    github: "#",
    color: "oklch(0.13 0.015 260)",
  },
  {
    n: "02",
    title: "AI Smart Hiring Platform",
    tags: ["NLP", "Full Stack"],
    desc: "AI-powered resume screening, candidate scoring and JD-matching with semantic embeddings + dashboard for recruiters.",
    live: "#",
    github: "#",
    color: "oklch(0.12 0.018 280)",
  },
  {
    n: "03",
    title: "MERN E-Auction Website",
    tags: ["Full Stack", "Realtime"],
    desc: "Real-time bidding platform with auth, live socket updates, and a production-grade Mongo + Express backend.",
    live: "#",
    github: "#",
    color: "oklch(0.11 0.014 250)",
  },
  {
    n: "04",
    title: "Banking Management App",
    tags: ["Full Stack", "Fintech"],
    desc: "Secure account, transaction and ledger management — built for scale with role-based access and audit trails.",
    live: "#",
    github: "#",
    color: "oklch(0.13 0.016 270)",
  },
  {
    n: "05",
    title: "Power BI Analytics Dashboards",
    tags: ["Data", "Visualization"],
    desc: "Executive dashboards turning messy operational data into focused KPIs, trends, and decision-ready stories.",
    live: "#",
    github: "#",
    color: "oklch(0.12 0.012 260)",
  },
];

function ProjectCard({ project, index, total }: { project: typeof projects[0]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [60, 0]);

  // Stack offset so each card peeks from under the previous
  const stackTop = index * 12;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${80 + stackTop}px` }}
    >
      <motion.div
        style={{ scale, opacity, y }}
        className="relative mx-auto w-full max-w-[1200px] rounded-2xl border border-white/8 overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Card background */}
        <div
          className="absolute inset-0"
          style={{ background: project.color }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg opacity-20" />

        <div className="relative p-8 md:p-10">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-6">
              {/* Number */}
              <span className="font-display text-6xl font-bold leading-none text-white/10 md:text-8xl">
                {project.n}
              </span>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={project.live}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm transition-all hover:border-[var(--neon)] hover:bg-[var(--neon)] hover:text-background"
              >
                Live Project <ArrowUpRight className="h-3 w-3" />
              </a>
              <a
                href={project.github}
                aria-label="GitHub"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-all hover:border-[var(--neon)] hover:bg-[var(--neon)] hover:text-background"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Title */}
          <h3 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {project.desc}
          </p>

          {/* Bottom neon line */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-[var(--neon)]/40 via-[var(--neon)]/10 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative w-full px-6 pb-48 pt-32 md:px-12">
      <div className="mx-auto max-w-[1200px]">
        {/* Section header */}
        <div className="mb-20 flex items-end justify-between">
          <div>
            <div className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
              (03) — Selected work
            </div>
            <h2 className="font-display text-[12vw] leading-[0.9] md:text-[7vw]">
              Projects<span className="text-[var(--neon)]">.</span>
            </h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
            {projects.length} / featured
          </div>
        </div>
      </div>

      {/* Stacked cards */}
      <div className="relative px-6 md:px-12" style={{ paddingBottom: `${projects.length * 20}px` }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.n} project={project} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
