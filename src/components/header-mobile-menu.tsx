import { links } from "@/constants/links";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

export function HeaderMobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="hidden">Navigation Menu</SheetTitle>
          <SheetDescription className="hidden">
            Navigation menu for mobile screens
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-4">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={buttonVariants({ variant: "link" })}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
