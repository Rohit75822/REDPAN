import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Rivera",
    title: "Lead Developer, Tech Innovators",
    quote: "Redpan's components are unmatched. The Photon Core X1 boosted our build's performance by 40%. The reliability is just what our team needed for mission-critical applications.",
    avatar: "AR",
    imageUrl: "https://picsum.photos/seed/alex/100/100",
    imageHint: "male portrait"
  },
  {
    name: "Samantha Chen",
    title: "Freelance 3D Artist",
    quote: "The Aether-Render GFX is a beast. My render times have been cut in half, and the visual fidelity is breathtaking. It's the best investment I've made for my workstation.",
    avatar: "SC",
    imageUrl: "https://picsum.photos/seed/samantha/100/100",
    imageHint: "female portrait"
  },
  {
    name: "Michael Brandt",
    title: "Overclocking Enthusiast",
    quote: "I pushed the Velocity DDR5 kit to its limits, and it remained perfectly stable. Redpan's engineering is top-notch. The Cryo-Stream cooler also keeps my rig icy cold.",
    avatar: "MB",
    imageUrl: "https://picsum.photos/seed/michael/100/100",
    imageHint: "male portrait"
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-background">
      <div className="container">
        <h2 className="mb-12 text-center font-headline text-4xl font-bold uppercase tracking-wider md:text-5xl">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col overflow-hidden shadow-lg rounded-xl">
              <CardContent className="flex flex-grow flex-col justify-between p-6">
                <blockquote className="italic text-muted-foreground">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
