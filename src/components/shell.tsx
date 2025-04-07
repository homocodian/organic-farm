import { cn } from "@/lib/utils";
import { HtmlHTMLAttributes, ReactNode } from "react";

interface ShellProps extends HtmlHTMLAttributes<HTMLDivElement> {
	header?: ReactNode;
	children?: ReactNode;
}

export function Shell({ children, header, className }: ShellProps) {
	return (
		<div
			className={cn(
				"bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10",
				className
			)}
		>
			{header}
			<div className="w-full max-w-md">{children}</div>
		</div>
	);
}
