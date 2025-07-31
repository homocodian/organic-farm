import { ProductListing } from "./_components/product-listings";
import { unstable_cache } from "next/cache";
import { db } from "@/server/db";
import { Header } from "@/components/header";

const getProducts = unstable_cache(
  async () => {
    try {
      return await db.query.product.findMany({
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
      });
    } catch {
      return [];
    }
  },
  ["products"],
  {
    revalidate: 3600,
    tags: ["products"],
  },
);

export default async function ProductListingPage() {
  const products = await getProducts();
  return (
    <>
      <Header />
      <main>
        <ProductListing products={products} />
      </main>
    </>
  );
}
