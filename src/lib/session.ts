import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "./auth";

export const getCurrentUser = cache(async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return null;
	}

	return session.user;
});
