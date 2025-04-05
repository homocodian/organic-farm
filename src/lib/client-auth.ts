import { createAuthClient } from "better-auth/react";
import { customSessionClient } from "better-auth/client/plugins";
import type { Auth } from "./auth";

export const authClient = createAuthClient({
	plugins: [customSessionClient<Auth>()],
});

export type Session = typeof authClient.$Infer.Session.session;
export type User = typeof authClient.$Infer.Session.user;
export type UserRole = User["role"];
