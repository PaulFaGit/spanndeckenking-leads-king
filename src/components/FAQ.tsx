import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "Was ist eine Spanndecke?",
    answer:
      "Eine Spanndecke ist ein modernes Deckensystem aus einem speziellen Gewebe oder PVC, das unter die bestehende Decke gespannt wird. Sie ermöglicht eine perfekt ebene Oberfläche und bietet zahlreiche Gestaltungsmöglichkeiten mit integrierten Beleuchtungskonzepten.",
  },
  {
    question: "Wie lange dauert die Montage?",
    answer:
      "Meist nur wenige Stunden. Bei großen Decken dauert es maximal 1-2 Tage. Der große Vorteil: Die Montage ist staubfrei und sauber.",
  },
  {
    question: "Sind Spanndecken für alle Räume geeignet?",
    answer:
      "Ja, Spanndecken eignen sich für nahezu alle Räume - vom Wohnzimmer über Schlafzimmer und Küche bis hin zum Badezimmer. Es gibt spezielle feuchtraumgeeignete Materialien für Nassbereiche. Auch für gewerbliche Räume sind sie ideal.",
  },
  {
    question: "Welche Beleuchtungsmöglichkeiten gibt es?",
    answer:
      "Sie haben vielfältige Möglichkeiten: LED-Spots für punktuelles Licht, LED-Panels für flächige Beleuchtung, LED-Strips für indirekte Beleuchtung oder eine Kombination daraus. Wir beraten Sie gerne zu den besten Optionen für Ihre Räume.",
  },
  {
    question: "Was kostet eine Spanndecke?",
    answer:
      "Die Kosten variieren je nach Raumgröße, gewähltem Material und Beleuchtungskonzept. Nutzen Sie unseren kostenlosen Angebotsrechner für eine erste Einschätzung. Gerne erstellen wir Ihnen nach einer Vor-Ort-Besichtigung ein detailliertes Angebot.",
  },
  {
    question: "Wie pflege ich eine Spanndecke?",
    answer:
      "Spanndecken sind sehr pflegeleicht. Staub kann einfach mit einem Staubwedel entfernt werden. Bei Bedarf können Sie die Oberfläche mit einem feuchten, weichen Tuch und mildem Reinigungsmittel abwischen. Aggressive Reiniger sollten vermieden werden.",
  },
  {
    question: "Kann ich eine Spanndecke später wieder entfernen?",
    answer:
      "Ja, Spanndecken sind komplett rückbaubar. Das macht sie ideal für Mietwohnungen. Bei einem Umzug kann die Decke in der Regel sogar mitgenommen und im neuen Raum wieder montiert werden.",
  },
  {
    question: "Wie lange hält eine Spanndecke?",
    answer:
      "Bei fachgerechter Montage und normaler Nutzung hält eine Spanndecke viele Jahrzehnte. Auf unsere Arbeiten geben wir 10 Jahre Garantie. Die Materialien sind UV-beständig und vergilben nicht.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/20">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in pb-4">
          <h2 className="mb-4 gradient-text pb-2">Häufig gestellte Fragen</h2>
          <p className="text-xl text-muted-foreground">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um Spanndecken
          </p>
        </div>

        <Card className="glass-card p-6 md:p-8 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:text-primary transition-colors">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
};

export default FAQ;
