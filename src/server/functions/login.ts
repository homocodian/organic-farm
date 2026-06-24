"use server";

import "server-only";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { AppConfig } from "@/lib/app-config";
import { db } from "../db";
import { cookies } from "next/headers";
import { UserRole } from "../db/schema/user";

type LoginState = {
	previousState: {
		email?: string;
	};
	errors: string[];
};

export async function login(
	state: LoginState,
	formData: FormData,
): Promise<LoginState> {
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();

	const returnState = {
		previousState: {
			email: email ?? state.previousState.email ?? "",
		},
		errors: [] as string[],
	};

	if (!email) {
		returnState.errors.push("Email is required");
	}

	if (!password) {
		returnState.errors.push("Password is required");
	}

	if (returnState.errors.length > 0) {
		return returnState;
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
			returnState.errors.push("User not found");
			return returnState;
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
			returnState.errors.push(error.message);
			return returnState;
		}

		returnState.errors.push("Something went wrong. Please try again later.");
		return returnState;
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
