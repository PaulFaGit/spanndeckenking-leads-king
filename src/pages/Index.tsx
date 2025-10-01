import { useState } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Calculator from "@/components/Calculator";
import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingPhoneButton from "@/components/FloatingPhoneButton";

const Index = () => {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Hero 
        onCalculatorOpen={() => setCalculatorOpen(true)}
        onContactOpen={() => setContactOpen(true)}
      />
      <Services />
      <Gallery />
      <Footer />
      
      <Calculator open={calculatorOpen} onOpenChange={setCalculatorOpen} />
      <ContactForm open={contactOpen} onOpenChange={setContactOpen} />
      <FloatingPhoneButton />
    </div>
  );
};

export default Index;
