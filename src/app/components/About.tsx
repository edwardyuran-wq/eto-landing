"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Dictionary } from "../[locale]/dictionaries";

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

export default function About({ dict }: { dict: Dictionary }) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? noMotion : fadeUp;

  return (
    <section id="about" className="bg-cream-100 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={variants}
          custom={0}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-green-600">
            {dict.about.label}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-green-900 sm:text-4xl md:text-5xl">
            {dict.about.heading}
          </h2>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={variants}
          custom={1}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-green-500"
        >
          {dict.about.body}
        </motion.p>
      </div>
    </section>
  );
}
