import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { OnboardingSchema } from "../schema/onboarding";

type OnboardingState = Partial<OnboardingSchema> & {
	setData: (data: Partial<OnboardingSchema>) => void;
	currentStep: number;
	setCurrentStep: (step: number | ((step: number) => number)) => void;
	getValues: () => Partial<OnboardingSchema>;
};

export const useOnboardingStore = create<OnboardingState>()(
	persist(
		(set, get) => ({
			currentStep: 0,
			setData: (data) => set((state) => ({ ...state, ...data })),
			setCurrentStep: (currentStep) => {
				if (typeof currentStep === "function") {
					set((state) => ({ currentStep: currentStep(state.currentStep) }));
				} else {
					set({ currentStep });
				}
			},
			getValues: () => {
				const state = get();
				return {
					role: state.role,
					phone: state.phone,
					alternatePhone: state.alternatePhone,

					companyName: state.companyName,
					license: state.license,

					city: state.city,
					state: state.state,
					street: state.street,
					pinCode: state.pinCode,
					addressPhone: state.addressPhone,
					addressAlternatePhone: state.addressAlternatePhone,
					landmark: state.landmark,
				};
			},
		}),
		{
			name: "onboarding-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
