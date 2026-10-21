import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import More from "@/components/More";
import Apps from "@/components/Apps";
import HowWeStart from "@/components/HowWeStart";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Effects from "@/components/Effects";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <More />
        <Apps />
        <Services />
        <HowWeStart />
        <About />
        <Contact />
      </main>
      <Effects />
    </>
  );
}
