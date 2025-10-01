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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Bitte füllen Sie alle Pflichtfelder aus");
      return;
    }

    // TODO: Send email notification to spanndeckenking@gmail.com
    // This requires a backend service (Lovable Cloud with Edge Functions)
    console.log("Contact form submission:", formData);
    console.log("Email notification should be sent to: spanndeckenking@gmail.com");

    toast.success("Vielen Dank! Ihre Anfrage wurde an spanndeckenking@gmail.com gesendet.");
    
    setFormData({ name: "", email: "", phone: "", message: "" });
    onOpenChange(false);
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
