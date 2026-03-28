"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-green-900 py-20 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
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
              Eto Capital partners with entrepreneurs to build
              market-leading companies in regulated, non-cyclical
              Nordic sectors.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brown">
              Get in touch
            </p>
            <a
              href="mailto:info@etocapital.se"
              className="mt-3 block text-lg text-cream-200 transition-colors hover:text-white"
            >
              info@etocapital.se
            </a>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-brown">
              Location
            </p>
            <p className="mt-3 text-sm text-cream-300/80">
              Engelbrektsgatan 9<br />
              114 32 Stockholm
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-cream-400/10 pt-8 text-center">
          <p className="text-xs text-cream-400/40">
            &copy; {new Date().getFullYear()} Eto Capital. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
