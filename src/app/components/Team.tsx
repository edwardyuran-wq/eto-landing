"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Edward Yuran",
    title: "Co-Founder & Partner",
    bio: "Former BCG consultant and J.P. Morgan investment banker. Edward brings deep experience in strategy, M&A execution, and operational transformation across industrial and regulated sectors.",
    image: "/images/edward.jpg",
  },
  {
    name: "Edwin Ashnai",
    title: "Co-Founder & Partner",
    bio: "Stockholm School of Economics graduate with extensive experience in Nordic private equity and corporate development. Edwin specializes in deal sourcing, due diligence, and value creation planning.",
    image: "/images/edwin.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Team() {
  return (
    <section id="team" className="bg-cream-100 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-green-600">
            Leadership
          </p>
          <h2 className="mt-3 font-heading text-3xl text-green-900 sm:text-4xl md:text-5xl">
            Our team
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={i + 1}
              className="text-center"
            >
              <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full bg-cream-200">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 font-heading text-2xl text-green-900">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-brown">
                {member.title}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-green-500">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
