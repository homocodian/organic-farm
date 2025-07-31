import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";

export default function ProductLoadingScreen() {
  return (
    <>
      <Header />
      <div className="bg-background">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Products</h1>
          </div>

          <div className="gap-6 flex">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <Card className="bg-card">
                <CardContent className="p-6">
                  {/* Filters Header */}
                  <Skeleton className="h-6 w-16 mb-6" />

                  {/* Category Section */}
                  <div className="mb-6">
                    <Skeleton className="h-5 w-20 mb-4" />

                    {/* Filter Options */}
                    <div className="space-y-3">
                      {Array.from({ length: 16 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <Skeleton className="h-4 w-4 rounded-sm" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="bg-card overflow-hidden p-0">
                    <CardContent className="p-0">
                      {/* Product Image */}
                      <Skeleton className="h-48 w-full rounded-none" />

                      {/* Product Details */}
                      <div className="p-4 space-y-3">
                        {/* Product Name */}
                        <Skeleton className="h-6 w-3/4" />

                        {/* Category and Status */}
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-1 w-1 rounded-full" />
                          <Skeleton className="h-4 w-20" />
                        </div>

                        {/* Price and Button */}
                        <div className="flex items-center justify-between pt-2">
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-9 w-20 rounded-md" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
