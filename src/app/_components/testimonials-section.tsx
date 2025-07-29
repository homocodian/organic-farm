import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { AppConfig } from "@/lib/app-config";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Hear from our farmers
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Discover how FarmConnect has helped farmers across the country
              improve their businesses.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            quote={`Since joining ${AppConfig.name}, I've been able to sell my organic vegetables at 30% higher prices than before. The direct market access has transformed my small farm.`}
            name="Kamlesh"
            role="Vegetable Farmer, Ohio"
            image="/placeholder.svg?height=100&width=100"
          />
          <TestimonialCard
            quote="The equipment rental service saved me from taking a huge loan. I was able to use a tractor during harvest season without the financial burden of ownership."
            name="Ashish Kumar"
            role="Grain Farmer, Iowa"
            image="/placeholder.svg?height=100&width=100"
          />
          <TestimonialCard
            quote="The community support and market insights have been invaluable. I've learned so much from other farmers and made better decisions about what crops to grow."
            name="Priya Patel"
            role="Fruit Grower, California"
            image="/placeholder.svg?height=100&width=100"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  image,
}: {
  quote: string;
  name: string;
  role: string;
  image?: string;
}) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="px-6 py-2">
        <div className="flex flex-col gap-y-4">
          <Quote className="h-8 w-8 text-primary/50" />
          <p className="text-muted-foreground line-clamp-5">{quote}</p>
          <div className="flex items-center gap-4 pt-4">
            <Image
              src={image || "/placeholder.svg"}
              width={50}
              height={50}
              alt={name}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">{name}</h4>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
