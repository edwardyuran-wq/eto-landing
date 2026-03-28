"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SLOGAN = "Partnering with next generation leaders";
const CHAR_DELAY = 65;

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
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-forest.jpg"
        alt="Nordic forest landscape"
        fill
        className="object-cover"
        priority
        quality={75}
      />

      {/* Green overlay */}
      <div className="absolute inset-0 bg-green-900/80" />

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
