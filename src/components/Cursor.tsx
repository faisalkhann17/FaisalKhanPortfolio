import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    const onMove = (e: MouseEvent) => { target.x = e.clientX; target.y = e.clientY; };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const enter = () => setHover(true);
    const leave = () => setHover(false);
    const bind = () => {
      document.querySelectorAll<HTMLElement>("[data-cursor='hover'], a, button").forEach(el => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    bind();
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block rounded-full border border-[oklch(0.88_0.2_130)] transition-[width,height,background-color,opacity] duration-200 ease-out"
        style={{
          width: hover ? 56 : 32,
          height: hover ? 56 : 32,
          backgroundColor: hover ? "oklch(0.88 0.2 130 / 0.12)" : "transparent",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block h-1.5 w-1.5 rounded-full bg-[oklch(0.88_0.2_130)]"
      />
    </>
  );
}
