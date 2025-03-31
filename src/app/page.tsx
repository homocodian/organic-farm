"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/client-auth";

export default function Home() {
	const [message, setMessage] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/info");
			const { message } = await res.json();
			setMessage(message);
		};
		fetchData();
	}, []);

	const session = authClient.useSession();

	if (!message) return <p>Loading...</p>;

	return (
		<div className="flex h-screen flex-col items-center justify-center gap-8">
			<ModeToggle />
			<p className="text-3xl font-bold">{message}</p>
			{session.data ? (
				<pre className="text-left whitespace-pre-wrap">
					{JSON.stringify(session.data, null, 2)}
				</pre>
			) : null}
			{session.isPending ? (
				<p>Loading...</p>
			) : session.data ? (
				<Button asChild variant="destructive">
					<Link href="/login" onClick={() => authClient.signOut()}>
						Logout
					</Link>
				</Button>
			) : (
				<Button asChild>
					<Link href="/login">Login</Link>
				</Button>
			)}
		</div>
	);
}
