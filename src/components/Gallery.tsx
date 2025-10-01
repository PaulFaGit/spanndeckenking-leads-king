import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const projects = [
  {
    title: "Modernes Wohnzimmer",
    description: "Spanndecke mit integrierter LED-Beleuchtung",
    image: gallery1,
  },
  {
    title: "Elegantes Schlafzimmer",
    description: "Matte Spanndecke mit indirektem Licht",
    image: gallery2,
  },
  {
    title: "Luxuriöses Badezimmer",
    description: "Feuchtraumgeeignete Hochglanz-Spanndecke",
    image: gallery3,
  },
  {
    title: "Geräumige Küche",
    description: "Praktische Spanndecke mit LED-Panels",
    image: gallery4,
  },
  {
    title: "Professionelles Büro",
    description: "Akustik-Spanndecke mit Beleuchtung",
    image: gallery5,
  },
  {
    title: "Stilvolles Esszimmer",
    description: "Design-Spanndecke mit LED-Spots",
    image: gallery6,
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 md:py-32 bg-muted/20">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="mb-4 gradient-text">Unsere Projekte</h2>
          <p className="text-xl text-muted-foreground">
            Entdecken Sie unsere realisierten Projekte und lassen Sie sich inspirieren
          </p>
        </div>

        {/* Carousel for larger screens */}
        <div className="max-w-6xl mx-auto mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="glass-card overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent flex items-end p-6">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Grid view as fallback */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto md:hidden">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass-card overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-xl animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
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
