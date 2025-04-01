"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

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

	try {
		await auth.api.signInEmail({
			body: {
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

	redirect("/");
}
