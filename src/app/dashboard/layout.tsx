import type React from "react";
import { Sidebar } from "./_components/sidebar";
import { Header } from "@/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen bg-background">
			<Sidebar />
			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />
				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
					{children}
				</main>
			</div>
		</div>
	);
}
