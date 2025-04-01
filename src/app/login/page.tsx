"use client";

import { LoginForm } from "@/components/login-form";
import { login } from "@/server/functions/login";
import { useActionState } from "react";

export default function LoginPage() {
	const [errors, formAction, pending] = useActionState(login, null);

	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm
					subHeader={
						<div className="text-center text-sm">
							Don&apos;t have an account?{" "}
							<a href="/register" className="underline underline-offset-4">
								Register
							</a>
						</div>
					}
					submitButtonText="Login"
					shouldShowForgotPassword
					action={formAction}
					loading={pending}
					errorMessage={errors}
				/>
			</div>
		</div>
	);
}
