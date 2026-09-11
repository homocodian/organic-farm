"use client";

import { LoginForm } from "@/components/login-form";
import { Shell } from "@/components/shell";
import { login } from "@/server/functions/login";
import { useActionState } from "react";
import { CaptureRedirectUrl } from "./_components/capture-redirect-url";

export default function LoginPage() {
	const [state, formAction, pending] = useActionState(login, {
		previousState: {
			email: "",
		},
		errors: [],
	});

	return (
		<Shell className="min-h-svh">
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
				loginFormState={state}
				endExtraFields={[<CaptureRedirectUrl key="capture-redirect" />]}
			/>
		</Shell>
	);
}
