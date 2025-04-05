"use client";

import { ProfileForm } from "./profile-form";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import { AppConfig } from "@/lib/app-config";
import { useOnboardingStore } from "@/lib/store/onboarding";
import { useEffect, useMemo, useState } from "react";
import { AddressForm } from "./address-form";
import { SupplierForm } from "./supplier-form";

export function OnboardingForm() {
	const currentStep = useOnboardingStore((state) => state.currentStep);
	const role = useOnboardingStore((state) => state.role ?? "buyer");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const unsub1 = useOnboardingStore.persist.onHydrate((state) => {
			console.log("rehydrating", state);
			setLoading(true);
		});

		const unsub2 = useOnboardingStore.persist.onFinishHydration((state) => {
			console.log("hydration finished", state);
			setLoading(false);
		});

		return () => {
			unsub1();
			unsub2();
		};
	}, []);

	const CurrentStepComponent = useMemo(() => {
		if (loading) return null;

		switch (currentStep) {
			case 0:
				return ProfileForm;
			case 1:
				if (role === "supplier") {
					return SupplierForm;
				}
				return AddressForm;
			case 2:
				if (role === "supplier") {
					return AddressForm;
				}
				throw new Error("Invalid step for non-supplier user");
			default:
				throw new Error("Invalid step");
		}
	}, [currentStep, loading, role]);

	if (loading) {
		return (
			<div className="flex h-full w-full items-center justify-center">
				<Loader2 className="h-6 w-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col items-center gap-2">
				<a href="#" className="flex flex-col items-center gap-2 font-medium">
					<div className="flex h-8 w-8 items-center justify-center rounded-md">
						<GalleryVerticalEnd className="size-6" />
					</div>
					<span className="sr-only">{AppConfig.name}</span>
				</a>
				<h1 className="text-xl font-bold">Welcome to Organic Farm</h1>
			</div>

			{CurrentStepComponent && <CurrentStepComponent />}
		</div>
	);
}
