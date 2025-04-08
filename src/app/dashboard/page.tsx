import { Button } from "@/components/ui/button";
import { AccountsOverview } from "./_components/accounts-overview";
import { BusinessMetrics } from "./_components/business-matrics";
import { RecentTransactions } from "./_components/recent-transactions";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	if (user.role === "buyer") {
		redirect("/home");
	}

	return (
		<div className="space-y-6 p-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
				<Button asChild>
					<Link href="/products/new">New Product</Link>
				</Button>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<AccountsOverview />
				<RecentTransactions />
			</div>

			<BusinessMetrics />
		</div>
	);
}
