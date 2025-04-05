"use client";

import { userRoles } from "@/server/db/schema/user";
import { useForm } from "@tanstack/react-form";
import { onboardingSchema } from "@/lib/schema/onboarding";
import { Loader2 } from "lucide-react";
import { useOnboardingStore } from "@/lib/store/onboarding";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const profileFormSchema = onboardingSchema.pick({
	role: true,
	phone: true,
	alternatePhone: true,
});

type ProfileFormSchema = typeof profileFormSchema._type;
type UserRole = ProfileFormSchema["role"];

export function ProfileForm() {
	const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
	const setData = useOnboardingStore((state) => state.setData);
	const role = useOnboardingStore((state) => state.role ?? "buyer");
	const phone = useOnboardingStore((state) => state.phone ?? "");
	const alternatePhone = useOnboardingStore(
		(state) => state.alternatePhone ?? ""
	);

	const form = useForm({
		defaultValues: {
			role,
			phone,
			alternatePhone,
		} as ProfileFormSchema,
		validators: {
			onChange: profileFormSchema,
		},
		onSubmit: async (values) => {
			// Handle form submission here
			console.log(values);
			setData(values.value);
			setCurrentStep((step) => step + 1);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-6"
		>
			<form.Field name="role">
				{(field) => (
					<div className="grid gap-2">
						<Label htmlFor="role">Role</Label>
						<Select
							value={field.state.value}
							onValueChange={(v) => field.handleChange(v as UserRole)}
						>
							<SelectTrigger
								className="w-full capitalize placeholder:normal-case"
								id="role"
								name="role"
							>
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								{userRoles.map((role) => (
									<SelectItem key={role} value={role} className="capitalize">
										{role}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
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
										<span className="text-sm font-medium">
											{error?.message}
										</span>
									</div>
								))}
							</div>
						) : null}
					</div>
				)}
			</form.Field>
			<form.Field name="phone">
				{(field) => (
					<div className="grid gap-2">
						<Label htmlFor="phone">Phone</Label>
						<Input
							id="phone"
							name="phone"
							placeholder="+91xxxxxxxxxxx"
							autoComplete="tel-local"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
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
										<span className="text-sm font-medium">
											{error?.message}
										</span>
									</div>
								))}
							</div>
						) : null}
					</div>
				)}
			</form.Field>
			<form.Field name="alternatePhone">
				{(field) => (
					<div className="grid gap-2">
						<Label htmlFor="alt-phone">Alternate Phone (Optional)</Label>
						<Input
							id="alt-phone"
							name="alt-phone"
							placeholder="+91xxxxxxxxxxx"
							autoComplete="tel-local"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
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
										<span className="text-sm font-medium">
											{error?.message}
										</span>
									</div>
								))}
							</div>
						) : null}
					</div>
				)}
			</form.Field>
			<form.Subscribe
				selector={(state) => [
					state.isSubmitting,
					state.canSubmit,
					state.values.role,
				]}
			>
				{([isSubmitting, canSubmit, role]) => (
					<Button
						disabled={(!canSubmit || isSubmitting) as boolean}
						aria-disabled={(!canSubmit || isSubmitting) as boolean}
					>
						{isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{(role as UserRole) === "buyer" ? "Continue" : "Next"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
