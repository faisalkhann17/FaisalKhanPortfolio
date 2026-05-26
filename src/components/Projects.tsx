import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  { n: "01", title: "Laptop Price Predictor", tag: "Machine Learning / Regression", desc: "End-to-end ML pipeline predicting laptop prices from specs using gradient-boosted models and a clean React frontend." },
  { n: "02", title: "AI Smart Hiring Platform", tag: "NLP / Full Stack", desc: "AI-powered resume screening, candidate scoring and JD-matching with semantic embeddings + dashboard for recruiters." },
  { n: "03", title: "MERN E-Auction Website", tag: "Full Stack / Realtime", desc: "Real-time bidding platform with auth, live socket updates, and a production-grade Mongo + Express backend." },
  { n: "04", title: "Banking Management App", tag: "Full Stack / Fintech", desc: "Secure account, transaction and ledger management — built for scale with role-based access and audit trails." },
  { n: "05", title: "Power BI Analytics Dashboards", tag: "Data / Visualization", desc: "Executive dashboards turning messy operational data into focused KPIs, trends, and decision-ready stories." },
];

export function Projects() {
  return (
    <section id="projects" className="relative w-full px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="mb-6 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">(03) — Selected work</div>
            <h2 className="font-display text-[12vw] leading-[0.9] md:text-[7vw]">
              Projects<span className="text-[var(--neon)]">.</span>
            </h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
            {projects.length} / featured
          </div>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {projects.map((p, i) => (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              data-cursor="hover"
              className="group relative grid grid-cols-12 items-center gap-4 py-10 md:py-14"
            >
              <div className="col-span-2 font-display text-3xl text-muted-foreground transition-colors group-hover:text-[var(--neon)] md:text-5xl">
                {p.n}
              </div>
              <div className="col-span-10 md:col-span-6">
                <h3 className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-6xl">
                  {p.title}
                </h3>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {p.tag}
                </div>
              </div>
              <p className="col-span-12 hidden text-sm text-muted-foreground md:col-span-3 md:block">{p.desc}</p>
              <div className="col-span-12 flex gap-3 md:col-span-1 md:justify-end">
                <a href="#" aria-label="Live demo" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all hover:border-[var(--neon)] hover:bg-[var(--neon)] hover:text-background">
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-all hover:border-[var(--neon)] hover:bg-[var(--neon)] hover:text-background">
                  <Github className="h-4 w-4" />
                </a>
              </div>

              {/* underline reveal */}
              <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-[var(--neon)] transition-all duration-700 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
