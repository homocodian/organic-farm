import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { Cart } from "./_components/cart";
import { Header } from "@/components/header";

export default async function CartPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<>
			<Header showCart={false} />
			<div className="container mx-auto px-4 py-12 md:py-16">
				<Cart />
			</div>
		</>
	);
}
