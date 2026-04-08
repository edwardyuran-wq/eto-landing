import { getDictionary, type Locale } from "./dictionaries";
import Navbar from "../components/Navbar";
import HeroVideo from "../components/HeroVideo";
import About from "../components/About";
import Strategy from "../components/Strategy";
import Footer from "../components/Footer";

export function generateStaticParams() {
  return [{ locale: "sv" }, { locale: "en" }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Navbar dict={dict} locale={locale as Locale} />
      <HeroVideo dict={dict} />
      <About dict={dict} />
      <Strategy dict={dict} />
      <Footer dict={dict} />
    </>
  );
}
