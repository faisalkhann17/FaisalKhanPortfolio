import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Faisal Khan — AI Engineer · Full Stack Developer · Data Analyst" },
      { name: "description", content: "Portfolio of Faisal Khan — building intelligent systems, scalable web products and data-driven dashboards across AI, ML and full-stack engineering." },
      { property: "og:title", content: "Faisal Khan — Portfolio" },
      { property: "og:description", content: "AI Engineer, Full Stack Developer & Data Analyst." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground noise">
      <Loader onDone={() => setReady(true)} />
      {ready && <SmoothScroll />}
      <Cursor />
      <Nav />
      <Hero ready={ready} />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
