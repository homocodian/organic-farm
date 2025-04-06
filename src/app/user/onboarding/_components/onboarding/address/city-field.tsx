import { useStore } from "@tanstack/react-form";

import { Combobox } from "@/components/combobox";
import { useEffect, useState } from "react";
import { useFieldContext, useFormContext } from "./form";
import { Label } from "@/components/ui/label";

export function CityField() {
	const field = useFieldContext<string>();
	const form = useFormContext();
	const state = useStore(form.store, (state) => state.values.state as string);
	const [stateToCities, setStateToCities] = useState<{
		[key: string]: string[];
	} | null>(() => null);
	const [cities, setCities] = useState<string[]>([]);

	useEffect(() => {
		async function getCities() {
			const response = await fetch("/data/cities.json", {
				cache: "force-cache",
			});
			const data = await response.json();
			setStateToCities(data);
		}
		getCities();
	}, []);

	useEffect(() => {
		if (state && stateToCities) {
			const selectedState = stateToCities[state];
			if (selectedState) {
				setCities(selectedState);
			} else {
				setCities([]);
			}
		}
	}, [state, stateToCities]);

	return (
		<div className="grid gap-2">
			<Label htmlFor="city">City/District</Label>
			<Combobox
				value={field.state.value}
				setValueAction={(v) => field.handleChange(v)}
				selectPlaceholderText="Select a city/district"
				data={cities}
				triggerButtonProps={{
					id: "city",
					disabled: !state,
				}}
				notFoundText="No city/district found."
				inputPlaceholderText="Type to search..."
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
