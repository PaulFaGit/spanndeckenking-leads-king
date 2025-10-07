import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">Spanndeckenking</h3>
            <p className="text-muted-foreground">
              Ihr professioneller Partner für moderne Spanndecken - von der Planung bis zur Montage.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Kontakt</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+49 176 21957545</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@spanndeckenking.de</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Haus-Berge-Str. 111, 45356 Essen</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Öffnungszeiten</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>Mo - Fr:</span>
                <span>08:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sa:</span>
                <span>10:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>So:</span>
                <span>Geschlossen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <a 
              href="https://spanndeckenking.de/impressum-datenschutz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Impressum
            </a>
            <span className="hidden sm:inline">|</span>
            <a 
              href="https://spanndeckenking.de/impressum-datenschutz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Datenschutz
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Spanndeckenking. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
