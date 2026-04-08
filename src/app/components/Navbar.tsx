"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Dictionary, Locale } from "../[locale]/dictionaries";

export default function Navbar({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: dict.nav.about, href: "#about" },
    { label: dict.nav.philosophy, href: "#philosophy" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  const otherLocale = locale === "sv" ? "en" : "sv";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-cream-100/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href={`/${locale}`} className="flex items-center">
            <Image
              src="/images/logo-new.png"
              alt="Eto Capital"
              width={140}
              height={40}
              className={`h-[23px] w-auto transition-all duration-300 ${
                scrolled || menuOpen ? "" : "brightness-0 invert"
              }`}
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-200 hover:-translate-y-px ${
                  scrolled
                    ? "text-green-800 hover:text-green-600"
                    : "text-cream-200 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={`/${otherLocale}`}
              className={`text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-px ${
                scrolled
                  ? "text-green-800 hover:text-green-600"
                  : "text-cream-200 hover:text-white"
              }`}
            >
              {dict.langToggle}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex w-5 flex-col gap-[5px]">
              <motion.span
                animate={menuOpen
                  ? { rotate: 45, y: 7, backgroundColor: "#1C2A24" }
                  : { rotate: 0, y: 0, backgroundColor: scrolled ? "#1C2A24" : "#FAF8F5" }
                }
                transition={{ duration: 0.25 }}
                className="block h-[2px] w-full rounded-full origin-center"
              />
              <motion.span
                animate={menuOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block h-[2px] w-full rounded-full"
                style={{ backgroundColor: scrolled || menuOpen ? "#1C2A24" : "#FAF8F5" }}
              />
              <motion.span
                animate={menuOpen
                  ? { rotate: -45, y: -7, backgroundColor: "#1C2A24" }
                  : { rotate: 0, y: 0, backgroundColor: scrolled ? "#1C2A24" : "#FAF8F5" }
                }
                transition={{ duration: 0.25 }}
                className="block h-[2px] w-full rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-cream-100/98 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 100,
                  damping: 18,
                }}
                className="font-heading text-2xl text-green-900 transition-colors hover:text-green-600"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={`/${otherLocale}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                delay: navLinks.length * 0.08,
                type: "spring",
                stiffness: 100,
                damping: 18,
              }}
              className="text-sm font-semibold uppercase tracking-widest text-green-600 transition-colors hover:text-green-800"
            >
              {dict.langToggle}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
