import { OnboardingSchema, onboardingSchema } from "@/lib/schema/onboarding";
import { useAddressForm } from "./address/form";
import { useOnboardingStore } from "@/lib/store/onboarding";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const addressFormSchema = onboardingSchema.pick({
	state: true,
	city: true,
	street: true,
	pinCode: true,
	addressPhone: true,
	addressAlternatePhone: true,
	landmark: true,
});

export type AddressFormSchema = typeof addressFormSchema._type;

export function AddressForm() {
	const router = useRouter();

	const form = useAddressForm({
		defaultValues: {
			city: "",
			state: "",
			street: "",
			pinCode: "" as unknown as number,
			addressPhone: "",
			addressAlternatePhone: "",
			landmark: "",
		} as AddressFormSchema,
		validators: {
			onSubmit: addressFormSchema,
		},
		onSubmit: async (values) => {
			// Handle form submission here
			console.log({
				...useOnboardingStore.getState().getValues(),
				...values.value,
			});

			const res = await api.user.onboarding.$post({
				json: {
					...useOnboardingStore.getState().getValues(),
					...values.value,
				} as OnboardingSchema,
			});

			if (!res.ok) {
				const { error } = (await res.json()) as { error: string | string[] };

				if (typeof error === "string") {
					toast.error(error);
				} else {
					error.forEach((err) => {
						toast.error(err, { duration: 5000 });
					});
				}

				return;
			}
			useOnboardingStore.persist.clearStorage();
			router.replace("/");
		},
	});

	const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-6"
		>
			<form.AppField name="state">
				{(field) => <field.StateField />}
			</form.AppField>

			<form.AppForm>
				<form.AppField name="city">
					{(field) => <field.CityField />}
				</form.AppField>
			</form.AppForm>

			<form.AppField name="street">
				{(field) => <field.TextField label="Street/Village" />}
			</form.AppField>

			<form.AppField name="landmark">
				{(field) => <field.TextField label="Landmark" />}
			</form.AppField>

			<form.AppField name="pinCode">
				{(field) => (
					<field.NumberField label="Pin Code" autoComplete="postal-code" />
				)}
			</form.AppField>

			<form.AppField name="addressPhone">
				{(field) => (
					<field.TextField
						label="Phone"
						name="phone"
						autoComplete="tel-local"
					/>
				)}
			</form.AppField>

			<form.AppField name="addressAlternatePhone">
				{(field) => (
					<field.TextField
						label="Alternate Phone (Optional)"
						name="phone"
						autoComplete="tel-local"
					/>
				)}
			</form.AppField>

			<form.AppForm>
				<div className="flex items-center justify-between gap-4">
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<Button
								variant="secondary"
								type="button"
								onClick={() => setCurrentStep((prev) => prev - 1)}
								disabled={isSubmitting}
							>
								Back
							</Button>
						)}
					</form.Subscribe>
					<form.SubmitButton />
				</div>
			</form.AppForm>
		</form>
	);
}
