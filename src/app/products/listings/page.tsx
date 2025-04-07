import { Header } from "@/components/header";
import { ProductListing } from "../_components/product-listings";
import { db } from "@/server/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

async function getProducts(userId: string) {
	try {
		return await db.query.product.findMany({
			where(fields, operators) {
				return operators.eq(fields.userId, userId);
			},
		});
	} catch {
		return [];
	}
}

export default async function ListingPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const products = await getProducts(user.id);

	return (
		<>
			<Header />
			<main>
				<ProductListing products={products} isOwnerListing={true} />
			</main>
		</>
	);
}
