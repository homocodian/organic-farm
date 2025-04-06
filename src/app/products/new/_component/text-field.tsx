import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "./form";

interface TextFieldProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"value" | "onChange"
	> {
	label: string;
}

export function TextField({ label, ...props }: TextFieldProps) {
	const field = useFieldContext<string>();
	return (
		<div className="grid gap-2">
			<Label htmlFor={props.id}>{label}</Label>
			<Input
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				{...props}
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
