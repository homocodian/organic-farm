import { userRoles } from "@/server/db/schema/user";
import { z } from "zod";

export const onboardingSchema = z.object({
	role: z.enum(userRoles),
	phone: z.string().refine(
		(v) => {
			if (v.startsWith("+91")) {
				return v.length === 13;
			} else {
				return v.length === 10;
			}
		},
		{
			message: "Please enter a valid phone number.",
		}
	),
	alternatePhone: z
		.string()
		.optional()
		.refine(
			(v) => {
				if (!v) {
					return true; // Allow empty/undefined values due to .optional()
				}
				if (v.startsWith("+91")) {
					return v.length === 13;
				} else {
					return v.length === 10;
				}
			},
			{
				message: "Please enter a valid phone number.",
			}
		),

	city: z
		.string()
		.min(1, "City is required")
		.max(50, "Please enter a valid city name"),
	state: z
		.string()
		.min(1, "State is required")
		.max(100, "Please enter a valid state name"),
	street: z.string().min(2, "Please enter a valid street name"),
	pinCode: z
		.number()
		.positive("Please enter a valid pin code")
		.min(100000, "Please enter a valid pin code")
		.max(999999, "Please enter a valid pin code"),
	addressPhone: z.string().refine(
		(v) => {
			if (v.startsWith("+91")) {
				return v.length === 13;
			} else {
				return v.length === 10;
			}
		},
		{
			message: "Please enter a valid phone number.",
		}
	),
	addressAlternatePhone: z
		.string()
		.optional()
		.refine(
			(v) => {
				if (!v) {
					return true; // Allow empty/undefined values due to .optional()
				}
				if (v.startsWith("+91")) {
					return v.length === 13;
				} else {
					return v.length === 10;
				}
			},
			{
				message: "Please enter a valid phone number.",
			}
		),
	landmark: z.string().min(1, "Landmark name is required").optional(),

	companyName: z
		.string()
		.min(1, "Company name is required")
		.min(3, "Please enter a valid company name")
		.optional(),
	license: z
		.number()
		.int("Please enter a valid license number")
		.positive("Please enter a valid license number")
		.min(10000000000000, "Please enter a valid license number")
		.max(99999999999999, "Please enter a valid license number")
		.optional(),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
