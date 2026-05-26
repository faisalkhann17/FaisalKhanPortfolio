import { motion } from "framer-motion";
import { useRef, useState } from "react";

function MagneticButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
      data-cursor="hover"
      className="group relative inline-flex h-40 w-40 items-center justify-center rounded-full bg-[var(--neon)] font-display text-xl text-background transition-[transform] duration-300 will-change-transform md:h-56 md:w-56 md:text-3xl"
    >
      Send →
      <span className="absolute inset-0 rounded-full border border-[var(--neon)] opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
    </button>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contact" className="relative w-full px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">(05) — Contact</div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display text-[15vw] leading-[0.85] md:text-[11vw]"
        >
          Let&apos;s build <br />
          <span className="text-stroke">something.</span>
        </motion.h2>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-12">
          <form onSubmit={submit} className="md:col-span-7 space-y-10">
            {[
              { id: "name", label: "What's your name?", type: "text", placeholder: "Jane Doe" },
              { id: "email", label: "Your email", type: "email", placeholder: "jane@studio.com" },
            ].map(f => (
              <div key={f.id}>
                <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground" htmlFor={f.id}>{f.label}</label>
                <input
                  id={f.id} type={f.type} required placeholder={f.placeholder}
                  className="w-full border-b border-white/15 bg-transparent pb-4 font-display text-2xl text-foreground outline-none placeholder:text-white/20 focus:border-[var(--neon)] md:text-4xl"
                />
              </div>
            ))}
            <div>
              <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground" htmlFor="msg">Your message</label>
              <textarea
                id="msg" required rows={3} placeholder="Tell me about the project…"
                className="w-full resize-none border-b border-white/15 bg-transparent pb-4 font-display text-2xl text-foreground outline-none placeholder:text-white/20 focus:border-[var(--neon)] md:text-3xl"
              />
            </div>
            {sent && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon)]">
                ✓ Message queued — I&apos;ll reply shortly.
              </motion.p>
            )}
          </form>

          <div className="flex items-center justify-center md:col-span-5">
            <MagneticButton onClick={() => submit({ preventDefault: () => {} } as React.FormEvent)}>
              Send →
            </MagneticButton>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Email</div>
            <a href="mailto:faisal@portfolio.dev" className="mt-2 block font-display text-2xl hover:text-[var(--neon)]">faisal@portfolio.dev</a>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Socials</div>
            <div className="mt-2 flex gap-6 font-display text-2xl">
              <a href="#" className="hover:text-[var(--neon)]">GitHub</a>
              <a href="#" className="hover:text-[var(--neon)]">LinkedIn</a>
              <a href="#" className="hover:text-[var(--neon)]">X</a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Location</div>
            <div className="mt-2 font-display text-2xl">India — Remote / Worldwide</div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>© 2026 Faisal Khan</span>
          <span>Designed & built with care</span>
        </div>
      </div>
    </section>
  );
}
