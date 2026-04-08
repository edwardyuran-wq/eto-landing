export type Locale = "sv" | "en";

export type Dictionary = {
  nav: { about: string; philosophy: string; contact: string };
  hero: { slogan: string; cta: string };
  about: { label: string; heading: string; body: string };
  strategy: {
    label: string;
    heading: string;
    pillars: { title: string; description: string }[];
  };
  footer: {
    tagline: string;
    ctaHeading: string;
    getInTouch: string;
    location: string;
    copyright: string;
  };
  langToggle: string;
};

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  sv: () => import("./dictionaries/sv.json").then((m) => m.default as Dictionary),
  en: () => import("./dictionaries/en.json").then((m) => m.default as Dictionary),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
