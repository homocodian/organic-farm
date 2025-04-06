"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxProps = {
	value: string;
	setValueAction: (value: string) => void;
	selectPlaceholderText: string;
	triggerButtonProps?: React.ComponentPropsWithoutRef<typeof Button>;
	data: string[];
	notFoundText?: string;
	inputPlaceholderText?: string;
};

export function Combobox({
	value,
	setValueAction,
	selectPlaceholderText,
	triggerButtonProps,
	data,
	notFoundText = "Not found.",
	inputPlaceholderText = "Select an option",
}: ComboboxProps) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					{...triggerButtonProps}
					variant="outline"
					role="combobox"
					className={cn(
						"w-full justify-between",
						triggerButtonProps?.className
					)}
				>
					{value ? (
						data.find((item) => item.toLowerCase() === value.toLowerCase())
					) : (
						<span className="text-muted-foreground">
							{selectPlaceholderText}
						</span>
					)}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder={inputPlaceholderText} />
					<CommandList>
						<CommandEmpty>{notFoundText}</CommandEmpty>
						<CommandGroup>
							{data.map((item) => (
								<CommandItem
									key={item}
									value={item}
									onSelect={(currentValue) => {
										setValueAction(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === item ? "opacity-100" : "opacity-0"
										)}
									/>
									{item}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
