import { GalleryVerticalEnd, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppConfig } from "@/lib/app-config";
import { Google } from "./auth/continue-with-google";

interface LoginFormProps {
	action?: React.FormHTMLAttributes<HTMLFormElement>["action"];
	shouldShowForgotPassword?: boolean;
	subHeader: React.ReactNode;
	submitButtonText: string;
	className?: string;
	loading?: boolean;
	errorMessage?: string[] | null;
	startExtraFields?: React.ReactNode[];
	endExtraFields?: React.ReactNode[];
}

export function LoginForm({
	className,
	action,
	shouldShowForgotPassword = false,
	subHeader,
	submitButtonText = "Login",
	loading = false,
	errorMessage = null,
	startExtraFields = [],
	endExtraFields = [],
}: LoginFormProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col items-center gap-2">
					<a href="#" className="flex flex-col items-center gap-2 font-medium">
						<div className="flex size-8 items-center justify-center rounded-md">
							<GalleryVerticalEnd className="size-6" />
						</div>
						<span className="sr-only">{AppConfig.name}</span>
					</a>
					<h1 className="text-xl font-bold">Welcome to {AppConfig.name}.</h1>
					{subHeader ? subHeader : null}
				</div>
				<form action={action} className="flex flex-col gap-6">
					{startExtraFields.map((field) => field)}
					<TextField
						name="email"
						type="email"
						placeholder="m@example.com"
						required
						label="Email"
						id="email"
					/>
					<PasswordField
						shouldShowForgotPassword={shouldShowForgotPassword}
						label="Password"
						name="password"
						id="password"
						required
						placeholder="********"
					/>
					{endExtraFields.map((field) => field)}
					{errorMessage?.length ? (
						<div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
							{errorMessage.map((error) => (
								<div className="flex items-center gap-2" key={error}>
									<span
										className="h-4 w-4 flex-shrink-0 flex items-center justify-center"
										aria-hidden="true"
									>
										•
									</span>
									<span className="text-sm font-medium">{error}</span>
								</div>
							))}
						</div>
					) : null}
					<Button type="submit" className="w-full" disabled={loading}>
						{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{submitButtonText}
					</Button>
				</form>
				<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
					<span className="bg-background text-muted-foreground relative z-10 px-2">
						Or
					</span>
				</div>
				<Google />
			</div>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

function TextField({ label, ...props }: TextFieldProps) {
	return (
		<div className="grid gap-2">
			<Label htmlFor={props.id}>{label}</Label>
			<Input {...props} />
		</div>
	);
}

interface PasswordFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	shouldShowForgotPassword?: boolean;
	label: string;
	name: string;
}

function PasswordField({
	shouldShowForgotPassword = false,
	label,
	name,
	...props
}: PasswordFieldProps) {
	return (
		<div className="grid gap-2">
			<div className="flex items-center">
				<Label htmlFor={props.id}>{label}</Label>
				{shouldShowForgotPassword && (
					<a
						href="#"
						className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
					>
						Forgot your password?
					</a>
				)}
			</div>
			<Input name={name} {...props} type="password" />
		</div>
	);
}

LoginForm.TextField = TextField;
LoginForm.PasswordField = PasswordField;
