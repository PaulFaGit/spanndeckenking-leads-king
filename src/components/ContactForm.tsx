import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactForm = ({ open, onOpenChange }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || window.location.origin;
    const functionUrl = `${supabaseUrl}/functions/v1/send-contact`;
    console.log("Sending contact form to:", functionUrl);
    console.log("Form data:", formData);

    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
        throw new Error(`Fehler beim Senden der Nachricht: ${JSON.stringify(responseData)}`);
      }

      toast.success("Vielen Dank! Ihre Anfrage wurde gesendet.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      onOpenChange(false);
    } catch (error: any) {
      console.error("Error sending contact form:", error);
      toast.error("❌ Fehler beim Senden", {
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch."
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl">Kontaktieren Sie uns</DialogTitle>
          <DialogDescription>
            Haben Sie Fragen? Wir beraten Sie gerne kostenlos und unverbindlich.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mb-6">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-5 w-5 text-primary" />
            <span>+49 176 21957545</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-5 w-5 text-primary" />
            <span>spanndeckenking@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Musterstraße 123, 12345 Musterstadt</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ihr Name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ihre@email.de"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+49 123 456 789"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Ihre Nachricht *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Beschreiben Sie Ihr Projekt..."
              rows={5}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
            Nachricht senden
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;
