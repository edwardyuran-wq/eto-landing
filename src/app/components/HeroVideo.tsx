"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "../[locale]/dictionaries";

const HERO_VIDEOS = [
  { src: "/images/hero-1.mp4", rate: 1, filter: "", duration: 7000, startAt: 0 },
  { src: "/images/hero-5.mp4", rate: 1, filter: "", duration: 7000, startAt: 0 },
  { src: "/images/hero-2.mp4", rate: 1, filter: "", duration: 7000, startAt: 0 },
  { src: "/images/hero-6.mp4", rate: 1, filter: "", duration: 7000, startAt: 0 },
  { src: "/images/hero-4.mp4", rate: 1, filter: "", duration: 7000, startAt: 4 },
  { src: "/images/hero-3.mp4", rate: 1, filter: "", duration: 7000, startAt: 0 },
];

/* Mask reveal — text rises into view from behind an invisible edge */
const maskReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 30 },
  visible: {
    clipPath: "inset(0 0 -20% 0)",
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function HeroVideo({ dict }: { dict: Dictionary }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const slogan = dict.hero.slogan;
  const prefersReduced = useReducedMotion();

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
        vid.muted = true;
        const start = HERO_VIDEOS[i].startAt;
        const tryPlay = () => {
          vid.currentTime = start;
          vid.play().catch(() => {});
        };
        if (vid.readyState >= 2) {
          tryPlay();
        } else {
          vid.addEventListener("canplay", tryPlay, { once: true });
          vid.load();
        }
      } else {
        vid.pause();
      }
    });
  }, [activeIndex]);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Video carousel */}
      {HERO_VIDEOS.map((vid, i) => (
        <video
          key={vid.src}
          ref={(el) => setVideoRef(el, i)}
          autoPlay={i === 0}
          loop
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-[1500ms]"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            filter: vid.filter || undefined,
          }}
        >
          <source src={vid.src} type="video/mp4" />
        </video>
      ))}

      {/* Green-tinted overlay */}
      <div className="absolute inset-0 bg-green-900/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={prefersReduced ? "visible" : "hidden"}
          animate="visible"
          variants={maskReveal}
          className="font-heading font-medium text-3xl leading-snug tracking-tight text-cream-100 sm:text-4xl md:text-5xl md:tracking-tighter lg:text-6xl"
        >
          {slogan}
        </motion.h1>

        <motion.a
          href="#contact"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: prefersReduced ? 0 : 1.2,
            type: "spring",
            stiffness: 80,
            damping: 16,
          }}
          className="mt-12 inline-block rounded-sm bg-green-800 px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-cream-100 transition-all duration-250 hover:bg-green-700 hover:scale-[1.03] hover:shadow-[0_8px_24px_-6px_rgba(28,42,36,0.35)] active:scale-[0.98]"
        >
          {dict.hero.cta}
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReduced ? 0 : 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReduced ? {} : { y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border-2 border-cream-300/50 flex items-start justify-center pt-2"
        >
          <div className="h-2 w-1 rounded-full bg-cream-300/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
