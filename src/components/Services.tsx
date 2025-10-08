import { Ruler, Hammer, Shield, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Ruler,
    title: "Professionelle Planung",
    description: "Individuelle Beratung und präzise Vermessung für Ihr Projekt. Wir planen jedes Detail.",
  },
  {
    icon: Hammer,
    title: "Fachgerechte Montage",
    description: "Erfahrene Monteure sorgen für eine schnelle und saubere Installation Ihrer Spanndecke.",
  },
  {
    icon: Lightbulb,
    title: "Beleuchtungskonzepte",
    description: "Moderne LED-Lösungen perfekt integriert in Ihre neue Spanndecke für optimale Atmosphäre.",
  },
  {
    icon: Shield,
    title: "10 Jahre Garantie",
    description: "Wir stehen zu unserer Qualität. Auf alle Arbeiten erhalten Sie 10 Jahre Garantie.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in pb-4">
          <h2 className="mb-6 gradient-text pb-2">Unsere Leistungen</h2>
          <p className="text-xl text-muted-foreground">
            Von der ersten Beratung bis zur finalen Montage - bei Spanndeckenking erhalten Sie alles aus einer Hand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="glass-card p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
