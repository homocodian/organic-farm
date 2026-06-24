import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ReconfirmPage() {
	const user = await getCurrentUser();
	if (!user) {
		redirect("/login");
	}

	if (!user.onboardingCompleted) {
		redirect("/user/onboarding");
	}

	if (user.role === "buyer") {
		redirect("/products");
	}

	if (user.role === "seller") {
		redirect("/dashboard");
	}

	redirect("/");
}
