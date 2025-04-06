import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";

export const authHandler = createMiddleware(async (c, next) => {
	console.log("🚀 ~ authHandler:MiddlewareHandler");

	try {
		const session = await auth.api.getSession({
			headers: c.req.raw.headers,
		});

		if (!session) {
			return c.json({ message: "Unauthorized" }, 401);
		}

		c.set("session", session.session);
		c.set("user", session.user);
	} catch (error) {
		console.log("🚀 ~ constauthMiddleware:MiddlewareHandler= ~ error:", error);
		return c.json({ message: "Unauthorized" }, 401);
	}

	await next();
});
