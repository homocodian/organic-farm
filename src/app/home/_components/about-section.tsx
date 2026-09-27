'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function LearnMore() {
  return (
    <section
      className="bg-primary/5 w-full py-12 md:py-24 lg:py-32 xl:py-28"
      id="learn"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="space-y-2">
            <Badge className="bg-primary/10 text-primary" variant="secondary">
              Latest Articles
            </Badge>
            <h2 className="text-primary text-3xl font-bold tracking-tighter sm:text-4xl">
              Learn More About Organic Farming
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore our collection of articles about organic farming
              practices, benefits, and tips.
            </p>
          </div>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'The Benefits of Crop Rotation',
              description:
                'Learn how crop rotation improves soil health and reduces pest problems naturally.',
              date: 'May 15, 2023',
              category: 'Farming Practices',
              imageUrl: '/images/crop-rotation.webp'
            },
            {
              title: 'Seasonal Eating Guide',
              description:
                "Discover the benefits of eating produce that's in season and how it can improve your health.",
              date: 'June 3, 2023',
              category: 'Nutrition',
              imageUrl: '/images/seasonal-guide.png'
            },
            {
              title: 'Composting 101',
              description:
                "A beginner's guide to starting your own compost pile and reducing food waste.",
              date: 'July 22, 2023',
              category: 'Sustainability',
              imageUrl: '/images/compost.jpg'
            }
          ].map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden py-0 transition-all hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="h-48 w-full overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      width={400}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Badge
                    className="bg-primary/10 text-primary"
                    variant="secondary"
                  >
                    {article.category}
                  </Badge>
                  <CardTitle className="text-primary text-xl">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {article.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-6 pt-0">
                  <div className="dark:text-muted-foreground text-sm text-gray-500">
                    {article.date}
                  </div>
                  <Button variant="ghost">
                    Read more
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:text-primary hover:bg-primary/10"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
