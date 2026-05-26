import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Snake Game ────────────────────────────────────────────────────────────────

const COLS = 20;
const ROWS = 20;
const TICK = 130; // ms per step

type Pt = { x: number; y: number };
type Dir = "U" | "D" | "L" | "R";

function rnd(max: number) {
  return Math.floor(Math.random() * max);
}
function newFood(snake: Pt[]): Pt {
  let f: Pt;
  do { f = { x: rnd(COLS), y: rnd(ROWS) }; }
  while (snake.some(s => s.x === f.x && s.y === f.y));
  return f;
}

type GameState = "idle" | "playing" | "dead";

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef<GameState>("idle");
  const snakeRef  = useRef<Pt[]>([{ x: 10, y: 10 }]);
  const dirRef    = useRef<Dir>("R");
  const nextDirRef = useRef<Dir>("R");
  const foodRef   = useRef<Pt>(newFood([{ x: 10, y: 10 }]));
  const scoreRef  = useRef(0);
  const tickRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore]         = useState(0);
  const [hiScore, setHiScore]     = useState(0);

  // ── Draw ──────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cw = W / COLS;
    const ch = H / ROWS;

    // Background
    ctx.fillStyle = "oklch(0.08 0.01 260)";
    ctx.fillRect(0, 0, W, H);

    // Grid dots
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let x = 0; x < COLS; x++)
      for (let y = 0; y < ROWS; y++)
        ctx.fillRect(x * cw + cw / 2 - 0.5, y * ch + ch / 2 - 0.5, 1, 1);

    // Food — pulsing neon circle
    const f = foodRef.current;
    const grd = ctx.createRadialGradient(
      (f.x + 0.5) * cw, (f.y + 0.5) * ch, 0,
      (f.x + 0.5) * cw, (f.y + 0.5) * ch, cw * 0.7,
    );
    grd.addColorStop(0, "oklch(0.88 0.2 130)");
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc((f.x + 0.5) * cw, (f.y + 0.5) * ch, cw * 0.38, 0, Math.PI * 2);
    ctx.fill();

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const alpha = 0.35 + 0.65 * (i === 0 ? 1 : 1 - i / snake.length);
      const radius = i === 0 ? cw * 0.42 : cw * 0.35;
      ctx.beginPath();
      ctx.roundRect(
        seg.x * cw + cw * 0.08,
        seg.y * ch + ch * 0.08,
        cw * 0.84, ch * 0.84, radius,
      );
      ctx.fillStyle = i === 0
        ? `oklch(0.88 0.2 130 / ${alpha})`
        : `oklch(0.75 0.18 130 / ${alpha})`;
      ctx.fill();

      // Head glow
      if (i === 0) {
        ctx.shadowColor = "oklch(0.88 0.2 130)";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Score overlay
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = `bold ${Math.round(cw * 0.7)}px 'JetBrains Mono', monospace`;
    ctx.fillText(`${scoreRef.current}`, cw * 0.5, ch * 1.1);
  }, []);

  // ── Game loop ─────────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    if (stateRef.current !== "playing") return;
    dirRef.current = nextDirRef.current;
    const head = snakeRef.current[0];
    const d = dirRef.current;
    const next: Pt = {
      x: (head.x + (d === "R" ? 1 : d === "L" ? -1 : 0) + COLS) % COLS,
      y: (head.y + (d === "D" ? 1 : d === "U" ? -1 : 0) + ROWS) % ROWS,
    };

    // Self collision
    if (snakeRef.current.some(s => s.x === next.x && s.y === next.y)) {
      stateRef.current = "dead";
      setGameState("dead");
      if (tickRef.current) clearInterval(tickRef.current);
      setHiScore(h => Math.max(h, scoreRef.current));
      draw();
      return;
    }

    const ate = next.x === foodRef.current.x && next.y === foodRef.current.y;
    snakeRef.current = [next, ...snakeRef.current.slice(0, ate ? undefined : -1)];
    if (ate) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      foodRef.current = newFood(snakeRef.current);
    }
    draw();
  }, [draw]);

  // ── Start / Restart ───────────────────────────────────────────────────────
  const start = useCallback(() => {
    snakeRef.current  = [{ x: 10, y: 10 }];
    dirRef.current    = "R";
    nextDirRef.current = "R";
    foodRef.current   = newFood([{ x: 10, y: 10 }]);
    scoreRef.current  = 0;
    setScore(0);
    stateRef.current  = "playing";
    setGameState("playing");
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(tick, TICK);
    draw();
  }, [tick, draw]);

  // ── Keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const map: Record<string, Dir> = {
      ArrowUp: "U", ArrowDown: "D", ArrowLeft: "L", ArrowRight: "R",
      w: "U", s: "D", a: "L", d: "R",
      W: "U", S: "D", A: "L", D: "R",
    };
    const opp: Record<Dir, Dir> = { U: "D", D: "U", L: "R", R: "L" };

    const onKey = (e: KeyboardEvent) => {
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      if (stateRef.current === "idle" || stateRef.current === "dead") { start(); return; }
      if (d !== opp[dirRef.current]) nextDirRef.current = d;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [start]);

  // ── Touch / swipe ─────────────────────────────────────────────────────────
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      if (stateRef.current !== "playing") start();
      return;
    }
    const opp: Record<Dir, Dir> = { U: "D", D: "U", L: "R", R: "L" };
    const d: Dir = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? "R" : "L")
      : (dy > 0 ? "D" : "U");
    if (stateRef.current === "idle" || stateRef.current === "dead") { start(); return; }
    if (d !== opp[dirRef.current]) nextDirRef.current = d;
  };

  // ── Initial draw ──────────────────────────────────────────────────────────
  useEffect(() => { draw(); return () => { if (tickRef.current) clearInterval(tickRef.current); }; }, [draw]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Header row */}
      <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="text-[var(--neon)]">// mini game</span>
        <span>
          {hiScore > 0 && <span className="mr-4">hi {String(hiScore).padStart(2, "0")}</span>}
          <span>score {String(score).padStart(2, "0")}</span>
        </span>
      </div>

      {/* Canvas */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ imageRendering: "pixelated", touchAction: "none" }}
        />

        {/* Idle overlay */}
        {gameState === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm">
            <div className="font-display text-3xl font-bold text-[var(--neon)]">SNAKE</div>
            <button
              onClick={start}
              className="rounded-full border border-[var(--neon)] px-6 py-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--neon)] transition-all hover:bg-[var(--neon)] hover:text-background"
            >
              Press any key / tap to play
            </button>
          </div>
        )}

        {/* Dead overlay */}
        {gameState === "dead" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/75 backdrop-blur-sm"
          >
            <div className="font-display text-2xl font-bold text-foreground">Game Over</div>
            <div className="font-mono text-xs text-muted-foreground uppercase tracking-[0.3em]">
              Score — {score}
            </div>
            <button
              onClick={start}
              className="mt-2 rounded-full border border-[var(--neon)] px-6 py-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--neon)] transition-all hover:bg-[var(--neon)] hover:text-background"
            >
              Play again
            </button>
          </motion.div>
        )}
      </div>

      {/* Controls hint */}
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50">
        Arrow keys / WASD · Swipe on mobile
      </p>
    </div>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" className="relative w-full px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-2">

        {/* ── Left: bio ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground"
          >
            (01) — About
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-6 font-display text-[12vw] leading-[0.9] lg:text-[5.5vw]"
          >
            About <span className="text-stroke">me.</span>
          </motion.h2>

          <div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
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

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            {[
              ["3+", "Years building"],
              ["20+", "Projects shipped"],
              ["12+", "AI models trained"],
              ["∞", "Cups of chai"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-4xl text-[var(--neon)] md:text-5xl">{n}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Snake game ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="flex items-center justify-center lg:justify-end"
        >
          <div className="w-full max-w-[420px]">
            <SnakeGame />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
