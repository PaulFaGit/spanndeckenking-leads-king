import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";
import { toast } from "sonner";

const ConsultationBanner = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast.error("Bitte geben Sie Ihre Telefonnummer ein");
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || window.location.origin;
    const functionUrl = `${supabaseUrl}/functions/v1/send-contact`;

    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Rückruf-Anfrage",
          email: "callback@spanndeckenking.de",
          phone: phoneNumber,
          message: "Kunde wünscht einen Rückruf für eine kostenlose Beratung.",
        }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Senden der Anfrage");
      }

      toast.success("Vielen Dank! Wir rufen Sie zeitnah zurück.");
      setPhoneNumber("");
    } catch (error) {
      console.error("Error sending callback request:", error);
      toast.error("Fehler beim Senden. Bitte rufen Sie uns direkt an.");
    }
  };

  return (
    <div className="py-12 md:py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <div className="container px-4">
        <Card className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Kostenlose Beratung jetzt vereinbaren!
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Rückruf anfordern oder direkt anrufen - Wir sind für Sie da und beraten Sie gerne unverbindlich.
              </p>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-primary" />
                <a 
                  href="tel:+4917621957545" 
                  className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  0176 21957545
                </a>
              </div>
            </div>

            <div>
              <form onSubmit={handleCallback} className="space-y-4">
                <div>
                  <Input
                    type="tel"
                    placeholder="Ihre Telefonnummer"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-lg p-6"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                >
                  Rückruf anfordern
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Unverbindlich und kostenlos
                </p>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConsultationBanner;
