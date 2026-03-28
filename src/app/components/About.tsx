"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="bg-cream-100 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-green-600">
            Who we are
          </p>
          <h2 className="mt-3 font-heading text-3xl text-green-900 sm:text-4xl md:text-5xl">
            A values-driven firm
          </h2>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={1}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-green-500"
        >
          Eto Capital partners with founders and management teams to build
          market-leading companies across the Nordic region. We combine deep
          sector expertise with hands-on operational support, creating
          lasting value in regulated, non-cyclical markets.
        </motion.p>
      </div>
    </section>
  );
}
