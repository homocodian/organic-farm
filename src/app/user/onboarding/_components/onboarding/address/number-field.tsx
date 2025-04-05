import React from "react";

import { useFieldContext } from "./form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NumberFieldProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"type" | "value" | "onChange"
	> {
	label: string;
}

export function NumberField({ label, className, ...props }: NumberFieldProps) {
	const field = useFieldContext<number>();

	return (
		<div className="grid gap-2">
			<Label htmlFor={field.name}> {label}</Label>
			<Input
				{...props}
				type="number"
				id={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.valueAsNumber)}
				className={cn(
					"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
					className
				)}
			/>
			{field.state.meta.errors.length > 0 ? (
				<div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
					{field.state.meta.errors.map((error) => (
						<div className="flex items-center gap-2" key={error?.message}>
							<span
								className="h-4 w-4 flex-shrink-0 flex items-center justify-center"
								aria-hidden="true"
							>
								•
							</span>
							<span className="text-sm font-medium">{error?.message}</span>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}
