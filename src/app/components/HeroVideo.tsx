"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const SLOGAN = "Partnering with next generation leaders";
const CHAR_DELAY = 65;

const HERO_VIDEOS = [
  { src: "/images/hero-1.mp4", rate: 1, filter: "", duration: 8000, startAt: 0 },
  { src: "/images/hero-3.mp4", rate: 1, filter: "", duration: 8000, startAt: 0 },
  { src: "/images/hero-2.mp4", rate: 1, filter: "contrast(1.15) saturate(0.8) sepia(0.12)", duration: 5000, startAt: 3 }, // start after geometry shift
  { src: "/images/hero-4.mp4", rate: 1, filter: "", duration: 8000, startAt: 0 },
];

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const timer = setTimeout(() => setCount((c) => c + 1), CHAR_DELAY);
    return () => clearTimeout(timer);
  }, [started, count, text.length]);

  return (
    <span>
      {text.slice(0, count)}
      {count < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="inline-block w-[3px] h-[0.85em] ml-0.5 align-baseline bg-cream-300/80"
        />
      )}
    </span>
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const setVideoRef = useCallback((el: HTMLVideoElement | null, i: number) => {
    videoRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, HERO_VIDEOS[activeIndex].duration);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      vid.playbackRate = HERO_VIDEOS[i].rate;
      if (i === activeIndex) {
        vid.currentTime = HERO_VIDEOS[i].startAt;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Video carousel */}
      {HERO_VIDEOS.map((vid, i) => (
        <video
          key={vid.src}
          ref={(el) => setVideoRef(el, i)}
          autoPlay={i === 0}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-[1500ms] ease-in-out"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            filter: vid.filter || undefined,
          }}
        >
          <source src={vid.src} type="video/mp4" />
        </video>
      ))}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(17,17,17,0.88), rgba(45,45,45,0.78), rgba(45,45,45,0.50))",
        }}
      />
      {/* Green tint */}
      <div className="absolute inset-0 bg-green-900/35" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" as const }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="font-heading font-medium text-3xl leading-snug text-cream-100 sm:text-4xl md:text-5xl lg:text-6xl min-h-[1.4em]">
          <Typewriter text={SLOGAN} delay={1000} />
        </h1>

        <motion.a
          href="#contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + SLOGAN.length * (CHAR_DELAY / 1000) + 0.8, duration: 0.6 }}
          className="mt-12 inline-block rounded-sm bg-green-800 px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-cream-100 transition-colors hover:bg-green-700"
        >
          Get in touch
        </motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + SLOGAN.length * (CHAR_DELAY / 1000) + 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="h-10 w-6 rounded-full border-2 border-cream-300/50 flex items-start justify-center pt-2"
        >
          <div className="h-2 w-1 rounded-full bg-cream-300/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
