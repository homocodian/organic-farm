import { ProductListing } from "./_components/product-listings";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";

const getProducts = unstable_cache(
	async () => {
		try {
			return await db.query.product.findMany();
		} catch {
			return [];
		}
	},
	["products"],
	{
		revalidate: 3600,
		tags: ["products"],
	}
);

export default async function ProductListingPage() {
	const products = await getProducts();
	return (
		<main>
			<ProductListing products={products} />
		</main>
	);
}
