"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps extends ButtonProps {
	children: React.ReactNode;
}

export function SubmitButton({
	className,
	disabled,
	children,
	...props
}: SubmitButtonProps) {
	const { pending } = useFormStatus();
	return (
		<Button
			{...props}
			type="submit"
			className={cn("w-full", className)}
			disabled={pending || disabled}
		>
			{pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
			{children}
		</Button>
	);
}
