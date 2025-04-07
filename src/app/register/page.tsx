"use client";

import React, { useActionState } from "react";

import { LoginForm } from "@/components/login-form";
import { register } from "@/server/functions/register";
import { Shell } from "@/components/shell";

export default function RegisterPage() {
	const [errors, formAction, pending] = useActionState(register, null);

	return (
		<Shell className="min-h-svh">
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
		</Shell>
	);
}
