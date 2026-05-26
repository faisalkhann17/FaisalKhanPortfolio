# Video Background Setup — Hero Section

## What was changed
Only `src/components/Hero.tsx` was modified. Everything else is untouched.

## How to add your video
1. Copy `mp_.mp4` into the `public/` folder of your project:
   ```
   faisal-khan-experience-main/
   └── public/
       └── mp_.mp4   ← place your video here
   ```
2. The video is referenced as `src="/mp_.mp4"` in Hero.tsx — Vite serves
   everything in `public/` at the root URL automatically.

## Features added
- **Full-screen background video** — covers the entire hero, looped & autoplayed
- **60% dark overlay** — keeps text legible over any video content
- **Mute / unmute button** — bottom-right corner; starts muted (browser policy),
  click the speaker icon to enable audio
- **Fade-in** — video fades in smoothly once it can play
- **Parallax preserved** — all existing scroll-driven y / scale / opacity transforms still work
- **z-index layered** — video sits behind all text and UI elements
