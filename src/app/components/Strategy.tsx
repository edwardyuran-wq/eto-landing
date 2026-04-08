"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "../[locale]/dictionaries";

const pillarIcons = [
  <svg key="wrench" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
  </svg>,
  <svg key="person" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>,
  <svg key="clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

/* Fidelio-style mask reveal */
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
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.18,
      type: "spring" as const,
      stiffness: 70,
      damping: 18,
    },
  }),
};

const noMotion = {
  hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Strategy({ dict }: { dict: Dictionary }) {
  const prefersReduced = useReducedMotion();
  const headingVariants = prefersReduced ? noMotion : maskReveal;
  const cardVariants = prefersReduced ? noMotion : fadeUp;

  return (
    <section id="philosophy" className="relative overflow-hidden py-24 md:py-32">
      {/* Marble texture background with cream overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/philosophy-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cream-200/88" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={headingVariants}
            custom={0}
            className="text-xs font-semibold uppercase tracking-[0.08em] text-green-600"
          >
            {dict.strategy.label}
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={headingVariants}
            custom={0.5}
            className="mt-3 font-heading text-3xl tracking-tight text-green-900 sm:text-4xl md:text-5xl md:tracking-tighter"
          >
            {dict.strategy.heading}
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {dict.strategy.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              custom={i + 1}
              className="group rounded-2xl bg-cream-100 p-8 border border-cream-300/60 shadow-[0_4px_24px_-4px_rgba(28,42,36,0.10)] transition-all duration-300 hover:shadow-[0_12px_32px_-8px_rgba(28,42,36,0.16)] hover:-translate-y-1 text-center"
            >
              <div className="mx-auto inline-flex items-center justify-center rounded-xl bg-green-800 p-3 text-cream-100 transition-colors duration-300 group-hover:bg-green-600 group-hover:text-white">
                {pillarIcons[i]}
              </div>
              <h3 className="mt-5 font-heading text-xl text-green-900">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-green-500">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
