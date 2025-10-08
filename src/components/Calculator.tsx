import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Calculator as CalcIcon } from "lucide-react";

interface CalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Calculator = ({ open, onOpenChange }: CalculatorProps) => {
  const [step, setStep] = useState(1);
  const [roomSize, setRoomSize] = useState("");
  const [lighting, setLighting] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !roomSize || !lighting || !name || !phone || !postalCode) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || window.location.origin;
    const offerData = { roomSize, lighting, name, email, phone, postalCode, message };
    const functionUrl = `${supabaseUrl}/functions/v1/send-offer`;
    console.log("Sending offer request to:", functionUrl);
    console.log("Offer data:", offerData);

    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerData),
      });

      console.log("Response status:", response.status);
      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (!response.ok) {
        // Check for specific Resend errors
        if (responseData.error && responseData.error.includes("verify a domain")) {
          toast.error("⚠️ Resend-Konfiguration erforderlich: Domain muss verifiziert werden.", {
            description: "Bitte verifizieren Sie Ihre Domain bei resend.com/domains"
          });
          return;
        } else if (response.status === 403) {
          toast.error("🔒 Email-Service-Fehler", {
            description: "Die Email-Konfiguration ist nicht vollständig. Kontaktieren Sie den Administrator."
          });
          return;
        }
        throw new Error(`Fehler beim Senden der Anfrage: ${JSON.stringify(responseData)}`);
      }

      toast.success("Vielen Dank! Ihr Angebot wird berechnet und Ihnen zugesendet.");
      
      // Reset form
      setStep(1);
      setRoomSize("");
      setLighting("");
      setName("");
      setEmail("");
      setPhone("");
      setPostalCode("");
      setMessage("");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error sending offer request:", error);
      toast.error("❌ Fehler beim Senden", {
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch."
      });
    }
  };

  const canProceedStep1 = roomSize !== "";
  const canProceedStep2 = lighting !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CalcIcon className="h-6 w-6 text-primary" />
            Angebotsrechner
          </DialogTitle>
          <DialogDescription>
            In 3 Schritten zu Ihrem persönlichen Angebot
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <Label htmlFor="roomSize" className="text-lg">
                Wie groß ist Ihr Raum? (in m²)
              </Label>
              <Input
                id="roomSize"
                type="number"
                placeholder="z.B. 25"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                min="1"
                className="text-lg p-6"
              />
              <Button
                type="button"
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
              >
                Weiter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <Label className="text-lg">Welche Beleuchtung wünschen Sie?</Label>
              <RadioGroup value={lighting} onValueChange={setLighting} className="space-y-3">
                <Label 
                  htmlFor="spots" 
                  className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                >
                  <RadioGroupItem value="spots" id="spots" />
                  <span className="flex-1">LED Spots</span>
                </Label>
                <Label 
                  htmlFor="strips" 
                  className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                >
                  <RadioGroupItem value="strips" id="strips" />
                  <span className="flex-1">LED Strips (indirekte Beleuchtung)</span>
                </Label>
                <Label 
                  htmlFor="hanging" 
                  className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                >
                  <RadioGroupItem value="hanging" id="hanging" />
                  <span className="flex-1">Hängelampe</span>
                </Label>
                <Label 
                  htmlFor="none" 
                  className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                >
                  <RadioGroupItem value="none" id="none" />
                  <span className="flex-1">Keine Beleuchtung</span>
                </Label>
              </RadioGroup>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 text-lg py-6"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Zurück
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-primary hover:bg-primary/90 text-lg py-6"
                >
                  Weiter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 animate-fade-in">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
                <h4 className="font-semibold mb-2 text-foreground text-sm">Ihre Auswahl:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Raumgröße: {roomSize} m²</li>
                  <li>• Beleuchtung: {lighting === "spots" ? "LED Spots" : lighting === "strips" ? "LED Strips (indirekte Beleuchtung)" : lighting === "hanging" ? "Hängelampe" : "Keine Beleuchtung"}</li>
                </ul>
              </div>

              <p className="text-center text-base font-semibold text-primary mb-3">
                Jetzt Daten hinterlassen und Preis erhalten
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">
                  Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ihr Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base p-4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  E-Mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ihre@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base p-4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  Telefon *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0176 21957545"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-base p-4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-sm">
                  PLZ *
                </Label>
                <Input
                  id="postalCode"
                  type="text"
                  placeholder="45356"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="text-base p-4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm">
                  Spezielle Wünsche? (optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Ihre Nachricht..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="text-base p-3 min-h-[80px]"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 text-base py-5"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Zurück
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-base py-5 glow-effect"
                >
                  Angebot anfordern
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Calculator;
