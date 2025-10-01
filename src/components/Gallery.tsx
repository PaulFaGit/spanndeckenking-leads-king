import { Card } from "@/components/ui/card";

const projects = [
  {
    title: "Modernes Wohnzimmer",
    description: "Spanndecke mit integrierter LED-Beleuchtung",
  },
  {
    title: "Elegantes Schlafzimmer",
    description: "Matte Spanndecke mit indirektem Licht",
  },
  {
    title: "Luxuriöses Badezimmer",
    description: "Feuchtraumgeeignete Hochglanz-Spanndecke",
  },
  {
    title: "Geräumige Küche",
    description: "Praktische Spanndecke mit LED-Panels",
  },
];

const Gallery = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/20">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="mb-4 gradient-text">Unsere Projekte</h2>
          <p className="text-xl text-muted-foreground">
            Entdecken Sie einige unserer realisierten Projekte und lassen Sie sich inspirieren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass-card overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-xl animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
