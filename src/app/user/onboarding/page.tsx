import { getCurrentUser } from "@/lib/session";
import { OnboardingForm } from "./_components/onboarding/onboarding-form";
import { redirect } from "next/navigation";

export default async function NewUserPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/register");
	}

	if (user.onboardingCompleted) {
		redirect("/");
	}

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<OnboardingForm />
				</div>
			</div>
		</div>
	);
}
