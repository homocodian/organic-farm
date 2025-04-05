import { Button } from "@/components/ui/button";
import { useFormContext } from "./form";
import { Loader2 } from "lucide-react";

export function SubmitButton() {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button
					disabled={isSubmitting as boolean}
					aria-disabled={isSubmitting as boolean}
				>
					{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					{"Next"}
				</Button>
			)}
		</form.Subscribe>
	);
}
