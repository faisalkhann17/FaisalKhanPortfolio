import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const playAgain = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setEnded(false);
    }
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
          src="https://res.cloudinary.com/dxboyqwda/video/upload/v1779825370/mp__appemv.mp4"
          autoPlay
          muted
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
          onEnded={() => setEnded(true)}
          className="h-full w-full object-cover"
          style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 1s ease" }}
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 grid-bg opacity-30" />
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

      {/* ── Main hero content ── */}
      <motion.div style={{ y, scale, opacity }} className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <h1 className="font-display font-bold leading-[0.82] tracking-[-0.04em]">
          <span className="block overflow-hidden">
            <motion.span variants={word} custom={0} initial="hidden" animate="show" className="block text-[22vw] md:text-[16vw]">
              FAISAL
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={word} custom={1} initial="hidden" animate="show" className="block text-stroke text-[22vw] md:text-[16vw]">
              KHAN
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          {/* Left side — designation + buttons below */}
          <div className="flex flex-col items-start gap-4">
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

            {/* Buttons row below designation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex items-center gap-3"
            >
              {/* Mute / Unmute toggle */}
              <div className="flex flex-col items-start gap-1">
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md transition-all"
                  style={{
                    color: muted ? "var(--neon)" : "var(--background)",
                    background: muted ? "rgba(0,0,0,0.4)" : "var(--neon)",
                    border: "1px solid var(--neon)",
                  }}
                >
                  {muted ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                      Unmute
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                      Mute
                    </>
                  )}
                </button>
              </div>

              {/* Play Again — only shows after video ends */}
              {ended && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  onClick={playAgain}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-md transition-all hover:border-[var(--neon)] hover:bg-[var(--neon)] hover:text-background"
                  style={{}}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
                  </svg>
                  Play Again
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Right side — scroll to explore */}
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
