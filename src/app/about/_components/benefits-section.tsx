import { CircleDollarSign, Clock, Shield, TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

export default function BenefitsSection() {
  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32 xl:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Benefits for Farmers
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform delivers tangible benefits that improve farmers&apos;
              livelihoods and operations.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex flex-col items-center p-6 text-center">
              <CircleDollarSign className="text-primary mb-4 h-12 w-12" />
              <CardContent className="p-0">
                <h3 className="mb-2 text-xl font-medium">Increased Profits</h3>
                <p className="text-muted-foreground text-sm">
                  Earn up to 40% more by selling directly to consumers and
                  businesses without middlemen.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <TrendingUp className="text-primary mb-4 h-12 w-12" />
              <CardContent className="p-0">
                <h3 className="mb-2 text-xl font-medium">
                  Enhanced Productivity
                </h3>
                <p className="text-muted-foreground text-sm">
                  Access to modern equipment improves efficiency and yield,
                  boosting overall farm productivity.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <Clock className="text-primary mb-4 h-12 w-12" />
              <CardContent className="p-0">
                <h3 className="mb-2 text-xl font-medium">Time Savings</h3>
                <p className="text-muted-foreground text-sm">
                  Streamlined processes for selling produce and renting
                  equipment save valuable time for farming activities.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center p-6 text-center">
              <Shield className="text-primary mb-4 h-12 w-12" />
              <CardContent className="p-0">
                <h3 className="mb-2 text-xl font-medium">Reduced Risk</h3>
                <p className="text-muted-foreground text-sm">
                  Lower capital investment requirements and more stable market
                  access reduce financial risks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
