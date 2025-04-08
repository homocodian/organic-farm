import { AppConfig } from "@/lib/app-config";
import { auth } from "@/lib/auth";
import { chat } from "@/server/route/chat";
import { product } from "@/server/route/product";
import { user } from "@/server/route/user";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono()
	.basePath("/api")
	.get("/info", (c) => {
		return c.json({
			message: `${AppConfig.name} is running on ${process.env.NODE_ENV} environment`,
		});
	})
	.route("/user", user)
	.route("/products", product)
	.route("/chat", chat);

app.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const DELETE = handler;
export const PUT = handler;
export const PATCH = handler;

export type App = typeof app;
