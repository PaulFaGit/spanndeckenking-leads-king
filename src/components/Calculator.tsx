import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !roomSize || !lighting) {
      toast.error("Bitte füllen Sie alle Felder aus");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-offer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomSize, lighting, email }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Senden der Anfrage");
      }

      toast.success("Vielen Dank! Ihr Angebot wird berechnet und Ihnen zugesendet.");
      
      // Reset form
      setStep(1);
      setRoomSize("");
      setLighting("");
      setEmail("");
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending offer request:", error);
      toast.error("Fehler beim Senden. Bitte versuchen Sie es später erneut.");
    }
  };

  const canProceedStep1 = roomSize !== "";
  const canProceedStep2 = lighting !== "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass-card">
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
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="spots" id="spots" />
                  <Label htmlFor="spots" className="cursor-pointer flex-1">
                    LED Spots (empfohlen)
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="panels" id="panels" />
                  <Label htmlFor="panels" className="cursor-pointer flex-1">
                    LED Panels
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="strips" id="strips" />
                  <Label htmlFor="strips" className="cursor-pointer flex-1">
                    LED Strips (indirekte Beleuchtung)
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="cursor-pointer flex-1">
                    Keine Beleuchtung
                  </Label>
                </div>
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
            <div className="space-y-4 animate-fade-in">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2 text-foreground">Ihre Auswahl:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Raumgröße: {roomSize} m²</li>
                  <li>• Beleuchtung: {lighting === "spots" ? "LED Spots" : lighting === "panels" ? "LED Panels" : lighting === "strips" ? "LED Strips" : "Keine"}</li>
                </ul>
              </div>
              
              <Label htmlFor="email" className="text-lg">
                E-Mail für Ihr persönliches Angebot
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ihre@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-lg p-6"
                required
              />
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 text-lg py-6"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Zurück
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-lg py-6 glow-effect"
                >
                  Angebot anfordern
                  <ArrowRight className="ml-2 h-5 w-5" />
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
