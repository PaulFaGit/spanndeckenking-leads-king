import { CheckCircle2, Award, Users, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const reasons = [
  {
    icon: Award,
    title: "15+ Jahre Erfahrung",
    description: "Über ein Jahrzehnt Expertise in der Planung und Montage von Spanndecken.",
  },
  {
    icon: Users,
    title: "Hunderte zufriedene Kunden",
    description: "Unsere Arbeit spricht für sich - zahlreiche erfolgreiche Projekte deutschlandweit.",
  },
  {
    icon: Clock,
    title: "Schnelle Montage",
    description: "In der Regel sind wir in 1-2 Tagen fertig - sauber, staubfrei und zuverlässig.",
  },
  {
    icon: CheckCircle2,
    title: "10 Jahre Garantie",
    description: "Wir stehen zu unserer Qualität mit einer umfassenden Garantie auf alle Arbeiten.",
  },
];

const benefits = [
  "Kostenlose Erstberatung und Besichtigung vor Ort",
  "Hochwertige Materialien von führenden Herstellern",
  "Präzise Vermessung und professionelle Planung",
  "Saubere und staubfreie Montage ohne Schmutz",
  "Integrierte Beleuchtungskonzepte nach Ihren Wünschen",
  "Faire Preise ohne versteckte Kosten",
  "Umfassender Service auch nach der Montage",
  "Flexible Terminvereinbarung nach Ihren Wünschen",
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="mb-6 gradient-text">Warum Spanndeckenking?</h2>
          <p className="text-xl text-muted-foreground">
            Vertrauen Sie auf Qualität, Erfahrung und erstklassigen Service
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="glass-card p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <reason.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </Card>
          ))}
        </div>

        {/* Benefits List */}
        <Card className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center text-foreground">
            Das erwartet Sie bei uns
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default WhyUs;
