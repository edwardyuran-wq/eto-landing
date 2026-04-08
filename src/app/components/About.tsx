"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "../[locale]/dictionaries";

/* Fidelio-style mask reveal: text rises up from behind an invisible edge */
const maskReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 20 },
  visible: (i: number) => ({
    clipPath: "inset(0 0 -20% 0)",
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18,
      type: "spring" as const,
      stiffness: 70,
      damping: 18,
    },
  }),
};

const noMotion = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export default function About({ dict }: { dict: Dictionary }) {
  const prefersReduced = useReducedMotion();
  const headingVariants = prefersReduced ? noMotion : maskReveal;
  const bodyVariants = prefersReduced ? noMotion : fadeUp;

  return (
    <section id="about" className="relative overflow-hidden bg-cream-100 py-24 md:py-32">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, #E5DFD4 0%, transparent 70%)",
            animation: "drift-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-24 right-0 h-[400px] w-[400px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #D5CDC0 0%, transparent 70%)",
            animation: "drift-2 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #F0EBE3 0%, transparent 65%)",
            animation: "drift-3 18s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headingVariants}
          custom={0}
          className="text-xs font-semibold uppercase tracking-[0.08em] text-green-600"
        >
          {dict.about.label}
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headingVariants}
          custom={0.5}
          className="mt-3 font-heading text-3xl tracking-tight text-green-900 sm:text-4xl md:text-5xl md:tracking-tighter"
        >
          {dict.about.heading}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={bodyVariants}
          custom={1}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-green-500"
        >
          {dict.about.body}
        </motion.p>
      </div>
    </section>
  );
}
