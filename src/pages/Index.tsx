import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ConsultationBanner from "@/components/ConsultationBanner";
import WhyUs from "@/components/WhyUs";
import Calculator from "@/components/Calculator";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingPhoneButton from "@/components/FloatingPhoneButton";

const Index = () => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header onCalculatorOpen={() => setCalculatorOpen(true)} />
      <Hero 
        onCalculatorOpen={() => setCalculatorOpen(true)}
        onContactOpen={() => setContactOpen(true)}
      />
      <Services />
      <ConsultationBanner />
      <WhyUs />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
      
      <Calculator open={calculatorOpen} onOpenChange={setCalculatorOpen} />
      <ContactForm open={contactOpen} onOpenChange={setContactOpen} />
      <FloatingPhoneButton />
    </div>
  );
};

export default Index;
