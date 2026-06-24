import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
	leadingComponent?: React.ReactNode;
	trailingComponent?: React.ReactNode;
};

function Input({
	className,
	type,
	leadingComponent,
	trailingComponent,
	...props
}: InputProps) {
	return (
		<div className="relative w-full">
			{leadingComponent ? (
				<div className="text-muted-foreground absolute inset-y-0 start-0 z-10 flex items-center">
					<div className="pointer-events-auto">{leadingComponent}</div>
				</div>
			) : null}
			<input
				type={type}
				data-slot="input"
				className={cn(
					"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					leadingComponent && "ps-11",
					trailingComponent && "pe-11",
					className,
				)}
				{...props}
			/>
			{trailingComponent ? (
				<div className="text-muted-foreground absolute inset-y-0 end-0 z-10 flex items-center">
					<div className="pointer-events-auto">{trailingComponent}</div>
				</div>
			) : null}
		</div>
	);
}

export { Input };
