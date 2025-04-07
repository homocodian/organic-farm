import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { betterFetch } from "@better-fetch/fetch";
import { FullSession } from "./lib/client-auth";

export async function middleware(request: NextRequest) {
	console.log("Middleware triggered for request:", request.url);

	if (request.nextUrl.pathname === "/reconfirm") {
		const { data: session } = await betterFetch<FullSession>(
			"/api/auth/get-session",
			{
				baseURL: request.nextUrl.origin,
				headers: {
					cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
				},
			}
		);

		console.log("🚀 ~ middleware ~ session:", session);

		if (!session?.user.onboardingCompleted) {
			return NextResponse.redirect(new URL("/user/onboarding", request.url));
		}

		if (session?.user.role === "buyer") {
			return NextResponse.redirect(new URL("/home", request.url));
		}

		return NextResponse.redirect(new URL("/", request.url));
	}

	const sessionCookie = getSessionCookie(request);
	console.log("🚀 ~ middleware ~ sessionCookie:", sessionCookie);

	if (
		sessionCookie &&
		(request.nextUrl.pathname.startsWith("/login") ||
			request.nextUrl.pathname.startsWith("/register"))
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	const role = request.cookies.get("role")?.value;
	console.log("🚀 ~ middleware ~ role:", role);

	if (role === "buyer") {
		return NextResponse.rewrite(new URL("/home", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/reconfirm", "/login", "/register"],
};
