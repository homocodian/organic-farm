import { Combobox } from "@/components/combobox";
import { states } from "@/lib/data/states";
import { useFieldContext } from "./form";
import { Label } from "@/components/ui/label";

export function StateField() {
	const field = useFieldContext<string>();

	return (
		<div className="grid gap-2">
			<Label htmlFor="state">State</Label>
			<Combobox
				value={field.state.value}
				setValueAction={(v) => field.handleChange(v)}
				selectPlaceholderText="Select a state"
				data={states}
				triggerButtonProps={{
					id: "state",
				}}
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
