"use server";

import "server-only";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { AppConfig } from "@/lib/app-config";

type SocialSession = Awaited<
	ReturnType<
		typeof auth.api.signInSocial<
			[
				{
					body: {
						provider: "google";
					};
				}
			]
		>
	>
>;

export async function googleLogin() {
	let session: SocialSession | null = null;

	try {
		session = await auth.api.signInSocial({
			body: {
				callbackURL: "/reconfirm",
				newUserCallbackURL: AppConfig.onboardingRoute,
				provider: "google",
			},
		});
	} catch (error) {
		if (error instanceof APIError) {
			console.log(error.message, error.status);
		} else {
			console.error(error);
		}
		return void 0;
	}

	if (session.redirect) {
		redirect(session.url!);
	}

	throw new Error("Never reached");
}
