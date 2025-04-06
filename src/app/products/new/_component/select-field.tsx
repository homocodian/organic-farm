import { Label } from "@/components/ui/label";
import { useFieldContext } from "./form";
import { Combobox, ComboboxProps } from "@/components/combobox";

interface SelectFieldProps
	extends Omit<ComboboxProps, "value" | "onChange" | "setValueAction"> {
	label: string;
}

export function SelectField({ label, ...props }: SelectFieldProps) {
	const field = useFieldContext<string>();

	return (
		<div className="grid gap-2">
			<Label
				htmlFor={props.triggerButtonProps?.id ?? props.triggerButtonProps?.name}
			>
				{label}
			</Label>
			<Combobox
				{...props}
				value={field.state.value}
				setValueAction={field.handleChange}
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
