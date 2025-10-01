import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
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

    toast.success("Vielen Dank! Wir melden uns schnellstmöglich bei Ihnen.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="mb-4 gradient-text">Kontaktieren Sie uns</h2>
          <p className="text-xl text-muted-foreground">
            Haben Sie Fragen oder möchten Sie ein persönliches Beratungsgespräch? Wir sind für Sie da!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <Card className="glass-card p-8 space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Unsere Kontaktdaten</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">Telefon</h4>
                    <a href="tel:+49123456789" className="text-muted-foreground hover:text-primary transition-colors">
                      +49 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">E-Mail</h4>
                    <a href="mailto:info@spanndeckenking.de" className="text-muted-foreground hover:text-primary transition-colors">
                      info@spanndeckenking.de
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-foreground">Adresse</h4>
                    <p className="text-muted-foreground">
                      Musterstraße 123<br />
                      12345 Musterstadt
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="font-semibold mb-4 text-foreground">Öffnungszeiten</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Montag - Freitag:</span>
                  <span className="font-medium">08:00 - 18:00 Uhr</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag:</span>
                  <span className="font-medium">10:00 - 14:00 Uhr</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag:</span>
                  <span className="font-medium">Geschlossen</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Schreiben Sie uns</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name *</Label>
                <Input
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ihr Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">E-Mail *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ihre@email.de"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-phone">Telefon</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+49 123 456 789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Ihre Nachricht *</Label>
                <Textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Beschreiben Sie Ihr Projekt oder stellen Sie Ihre Fragen..."
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                <Send className="mr-2 h-5 w-5" />
                Nachricht senden
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
