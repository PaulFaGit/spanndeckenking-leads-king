import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingPhoneButton = () => {
  const handleCall = () => {
    window.location.href = "tel:+49123456789";
  };

  return (
    <Button
      onClick={handleCall}
      size="lg"
      className="fixed bottom-8 right-8 z-50 rounded-full w-16 h-16 shadow-2xl bg-primary hover:bg-primary/90 glow-effect animate-scale-in"
      aria-label="Jetzt anrufen"
    >
      <Phone className="h-6 w-6" />
    </Button>
  );
};

export default FloatingPhoneButton;
