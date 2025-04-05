"use server";

import "server-only";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { AppConfig } from "@/lib/app-config";

export async function register(
	previousState: unknown,
	formData: FormData
): Promise<string[]> {
	const name = formData.get("name")?.toString();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const confirmPassword = formData.get("confirm-password")?.toString();

	const errors = [];

	if (!name) {
		errors.push("Name is required");
	}

	if (!email) {
		errors.push("Email is required");
	}

	if (!password) {
		errors.push("Password is required");
	}

	if (password && password !== confirmPassword) {
		errors.push("Passwords do not match");
	}

	if (errors.length > 0) {
		return errors;
	}

	try {
		await auth.api.signUpEmail({
			body: {
				name: name as string,
				email: email as string,
				password: password as string,
			},
		});
	} catch (error) {
		if (error instanceof APIError) {
			console.log(error.message, error.status);
			return [error.message];
		}
		console.error(error);
		return ["Something went wrong. Please try again later."];
	}

	redirect(AppConfig.onboardingRoute);
}
