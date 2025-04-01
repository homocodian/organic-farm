"use client";

import React, { useActionState } from "react";

import { LoginForm } from "@/components/login-form";
import { register } from "@/server/functions/register";

export default function RegisterPage() {
	const [errors, formAction, pending] = useActionState(register, null);

	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm
					subHeader={
						<div className="text-center text-sm">
							Have an account?{" "}
							<a href="/login" className="underline underline-offset-4">
								Login
							</a>
						</div>
					}
					submitButtonText="Register"
					action={formAction}
					loading={pending}
					errorMessage={errors}
					startExtraFields={[
						<LoginForm.TextField
							key={"name"}
							label="Name"
							type="text"
							required
							name="name"
							placeholder="Kamlesh Kumar Bajewala"
						/>,
					]}
					endExtraFields={[
						<LoginForm.PasswordField
							key="confirm-password"
							label="Confirm Password"
							name="confirm-password"
							id="confirm-password"
							required
							placeholder="********"
						/>,
					]}
				/>
			</div>
		</div>
	);
}
