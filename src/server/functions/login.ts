"use server";

import "server-only";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { AppConfig } from "@/lib/app-config";
import { db } from "../db";
import { cookies } from "next/headers";
import { UserRole } from "../db/schema/user";

export async function login(
	previousState: unknown,
	formData: FormData
): Promise<string[]> {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	const errors = [];

	if (!email) {
		errors.push("Email is required");
	}

	if (!password) {
		errors.push("Password is required");
	}

	if (errors.length > 0) {
		return errors;
	}

	let role: UserRole = "seller";
	let onboardingCompleted = true;

	try {
		const data = await auth.api.signInEmail({
			body: {
				email: email as string,
				password: password as string,
			},
		});

		const user = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, data.user.id),
		});

		if (!user) {
			errors.push("User not found");
			return errors;
		}

		if (user.onboardingCompleted) {
			onboardingCompleted = user.onboardingCompleted;
		} else {
			role = user.role;

			const cookie = await cookies();

			cookie.set("role", user.role);
		}
	} catch (error) {
		if (error instanceof APIError) {
			console.log(error.message, error.status);
			return [error.message];
		}
		console.error(error);
		return ["Something went wrong. Please try again later."];
	}

	if (!onboardingCompleted) {
		redirect("/user/onboarding");
	}

	if (role === "buyer") {
		redirect("/home");
	} else if (role === "seller" || role === "supplier") {
		redirect("/dashboard");
	} else {
		redirect(AppConfig.callbackURL);
	}
}
