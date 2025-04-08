import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/server/db";
import { getUser } from "./get-user";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	// make sure nextCookies is the last plugin in the array
	plugins: [
		customSession(async ({ user, session }) => {
			const currentUser = await getUser(user.id);

			if (!currentUser) {
				throw new APIError("NOT_FOUND", {
					message: "User not found.",
				});
			}

			return {
				session,
				user: {
					...user,
					role: currentUser.role,
					phone: currentUser.phone,
					onboardingCompleted: currentUser.onboardingCompleted,
				},
			};
		}),
		nextCookies(),
	],
});

export type Auth = typeof auth;
