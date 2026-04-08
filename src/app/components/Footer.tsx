"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Dictionary } from "../[locale]/dictionaries";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 18,
    },
  },
};

const noMotion = {
  hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Footer({ dict }: { dict: Dictionary }) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? noMotion : fadeUp;

  return (
    <footer id="contact" className="bg-green-900 py-20 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={variants}
        className="mx-auto max-w-5xl px-6"
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Image
              src="/images/logo-new.png"
              alt="Eto Capital"
              width={160}
              height={44}
              className="h-[23px] w-auto brightness-0 invert opacity-80"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-300/80">
              {dict.footer.tagline}
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brown">
              {dict.footer.getInTouch}
            </p>
            <a
              href="mailto:info@etocapital.se"
              className="mt-3 block text-lg text-cream-200 transition-all duration-250 hover:text-white hover:translate-x-0.5"
            >
              info@etocapital.se
            </a>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-brown">
              {dict.footer.location}
            </p>
            <p className="mt-3 text-sm text-cream-300/80">
              Engelbrektsgatan 9<br />
              114 32 Stockholm
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-cream-400/10 pt-8 text-center">
          <p className="text-xs text-cream-400/40">
            &copy; {new Date().getFullYear()} {dict.footer.copyright}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
