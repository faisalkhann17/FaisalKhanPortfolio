import { motion } from "framer-motion";

const items = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 mix-blend-difference"
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12">
        <a href="#top" className="font-mono text-xs uppercase tracking-[0.3em] text-white">
          FK<span className="text-[var(--neon)]">.</span>
        </a>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-[0.3em] text-white md:flex">
          {items.map((i, idx) => (
            <a key={i.label} href={i.href} className="group relative">
              <span className="mr-1 text-[10px] opacity-50">0{idx + 1}</span>
              {i.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden font-mono text-xs uppercase tracking-[0.3em] text-white md:block">
          Let&apos;s Talk →
        </a>
      </div>
    </motion.header>
  );
}
