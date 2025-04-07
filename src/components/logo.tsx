import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";
import { ComponentProps } from "react";

type LogoProps = ComponentProps<typeof Leaf>;

export function Logo({ className, ...props }: LogoProps) {
	return (
		<Leaf {...props} className={cn("h-6 w-6 text-green-600", className)} />
	);
}
