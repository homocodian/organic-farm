'use client';

import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

interface FilterSidebarProps {
  categories: string[];
  types: string[];
  quantityTypes: string[];
  selectedCategories: string[];
  selectedTypes: string[];
  selectedQuantityTypes: string[];
  toggleCategoryAction: (category: string) => void;
  toggleTypeAction: (type: string) => void;
  toggleQuantityTypeAction: (type: string) => void;
}

export function FilterSidebar(props: FilterSidebarProps) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h2 className="mb-4 text-lg font-semibold">Filters</h2>
      <FilterContent {...props} />
    </div>
  );
}

function MobileFilterSidebar(props: FilterSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-xs pt-6 pl-6">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-88px)]">
          <div className="pb-6">
            <FilterContent {...props} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

FilterSidebar.Mobile = MobileFilterSidebar;

function FilterContent({
  categories,
  types,
  quantityTypes,
  selectedCategories,
  selectedTypes,
  toggleCategoryAction,
  toggleTypeAction,
  selectedQuantityTypes,
  toggleQuantityTypeAction
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-medium">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategoryAction(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="cursor-pointer text-sm font-normal"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-medium">Type</h3>
        <div className="space-y-2">
          {types.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleTypeAction(type)}
              />
              <Label
                htmlFor={`type-${type}`}
                className="cursor-pointer text-sm font-normal"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-medium">Quantity type</h3>
        <div className="space-y-2">
          {quantityTypes.map((qType) => (
            <div key={qType} className="flex items-center space-x-2">
              <Checkbox
                id={`qtype-${qType}`}
                checked={selectedQuantityTypes.includes(qType)}
                onCheckedChange={() => toggleQuantityTypeAction(qType)}
              />
              <Label
                htmlFor={`qtype-${qType}`}
                className="cursor-pointer text-sm font-normal"
              >
                {qType}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
