import { AppConfig } from "@/lib/app-config";
import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

app.get("/info", (c) => {
	return c.json({
		message: `${AppConfig.name} is running on ${process.env.NODE_ENV} environment`,
	});
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const DELETE = handler;
export const PUT = handler;
export const PATCH = handler;
