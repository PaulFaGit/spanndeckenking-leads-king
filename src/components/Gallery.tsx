import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import gallery1 from "@/assets/gallery-new-1.jpg";
import gallery2 from "@/assets/gallery-new-2.jpg";
import gallery3 from "@/assets/gallery-new-3.jpg";
import gallery4 from "@/assets/gallery-new-4.jpg";
import gallery5 from "@/assets/gallery-new-5.jpg";
import gallery6 from "@/assets/gallery-new-6.jpg";
import gallery7 from "@/assets/gallery-new-7.jpg";
import gallery8 from "@/assets/gallery-new-8.jpg";
import gallery9 from "@/assets/gallery-new-9.jpg";

const projects = [
  {
    title: "Moderne Gestaltung",
    description: "Hochglanz-Spanndecke mit LED-Beleuchtung",
    image: gallery1,
  },
  {
    title: "Kreative Deckengestaltung",
    description: "Bedruckte Spanndecke mit individuellen Motiven",
    image: gallery2,
  },
  {
    title: "Elegantes Wohnzimmer",
    description: "Langlebige Decke mit indirekter Beleuchtung",
    image: gallery3,
  },
  {
    title: "Stilvolles Design",
    description: "Spanndecke mit LED-Stripes",
    image: gallery4,
  },
  {
    title: "Professionelle Ausführung",
    description: "Hochglanz-Decke mit integrierten Spots und Strips",
    image: gallery5,
  },
  {
    title: "Zeitloses Design",
    description: "Spanndecke mit LED-Spots und indirekter Beleuchtung",
    image: gallery6,
  },
  {
    title: "Moderne Gestaltung",
    description: "Hochglanz-Spanndecke im modernen Stil",
    image: gallery7,
  },
  {
    title: "Elegante Lösungen",
    description: "Hochglanz-Spanndecke mit Kristallleuchter",
    image: gallery8,
  },
  {
    title: "Stilvolle Deckengestaltung",
    description: "Spanndecke mit integrierter Hängelampe",
    image: gallery9,
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
