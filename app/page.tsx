import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChoose from "./components/WhyChoose";
import Companies from "./components/Companies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <Companies />
      <Contact />
      <Footer />
    </>
  );
}