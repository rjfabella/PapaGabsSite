import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { About } from "@/components/About";
import { Packages } from "@/components/Packages";
import { RateCalculator } from "@/components/RateCalculator";
import { RateCards } from "@/components/RateCards";
import { Gallery } from "@/components/Gallery";
import { PromoVideo } from "@/components/PromoVideo";
import { Faq } from "@/components/Faq";
import { TeamGallery } from "@/components/TeamGallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingLinks } from "@/components/FloatingLinks";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Highlights />
        <About />
        <Packages />
        <RateCalculator />
        <RateCards />
        <Gallery />
        <PromoVideo />
        <Faq />
        <TeamGallery />
        <Contact />
      </main>
      <Footer />
      <FloatingLinks />
    </>
  );
}
