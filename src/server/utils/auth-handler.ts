import { auth } from "@/lib/auth";
import { MiddlewareHandler } from "hono";

export const authHandler: MiddlewareHandler = async (c, next) => {
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
};
