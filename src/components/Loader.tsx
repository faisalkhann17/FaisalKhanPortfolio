import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 9 + 3;
      if (v >= 100) { v = 100; clearInterval(id); setTimeout(() => { setGone(true); setTimeout(onDone, 900); }, 350); }
      setPct(Math.floor(v));
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="relative flex w-[min(640px,80vw)] flex-col gap-6">
            <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span>Loading Portfolio</span>
              <span className="tabular-nums text-foreground">{String(pct).padStart(3, "0")}</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-[var(--neon)]"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
            <div className="flex items-center justify-between font-display text-[10vw] leading-none md:text-[7vw]">
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >FAISAL</motion.span>
              <motion.span
                className="text-stroke"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >KHAN</motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
