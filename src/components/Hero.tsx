import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const word = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 1.1, delay: 0.2 + i * 0.08, ease: EASE },
  }),
} as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Keep video in sync with mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden pb-16 pt-32 md:pb-24"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/mp_.mp4"
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          className="h-full w-full object-cover"
          style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 1s ease" }}
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-background/60" />
        {/* Subtle noise / grid on top */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        {/* Neon glow at top */}
        <div className="absolute inset-0" style={{ background: "var(--grad-glow)" }} />
      </div>

      {/* ── Top meta ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute left-6 top-28 z-10 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:left-12 md:top-32"
      >
        Portfolio — 2026 / Edition 01
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-6 top-28 z-10 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:right-12 md:top-32 md:block"
      >
        Based in India / Available worldwide
      </motion.div>

      {/* ── Audio toggle ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: EASE }}
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-colors hover:border-[var(--neon)] hover:bg-black/60 md:bottom-8 md:right-12"
      >
        {muted ? (
          /* Muted icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          /* Unmuted / sound waves icon */
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--neon)]">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </motion.button>

      {/* ── Main hero content ── */}
      <motion.div style={{ y, scale, opacity }} className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <h1 className="font-display font-bold leading-[0.82] tracking-[-0.04em]">
          <span className="block overflow-hidden">
            <motion.span
              variants={word}
              custom={0}
              initial="hidden"
              animate="show"
              className="block text-[22vw] md:text-[16vw]"
            >
              FAISAL
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={word}
              custom={1}
              initial="hidden"
              animate="show"
              className="block text-stroke text-[22vw] md:text-[16vw]"
            >
              KHAN
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground"
          >
            AI Engineer<span className="mx-3 text-[var(--neon)]">/</span>
            Full Stack Developer<span className="mx-3 text-[var(--neon)]">/</span>
            Data Analyst
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.8 }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--neon)]" />
            </span>
            Scroll to explore
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
