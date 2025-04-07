import { Header } from "@/components/header";
import { Shell } from "@/components/shell";
import { AppConfig } from "@/lib/app-config";
import { ProductForm } from "../../new/_component/product-form";
import { db } from "@/server/db";
import { notFound } from "next/navigation";

type ProductEditingPageProps = {
	params: Promise<{
		id: string;
	}>;
};

function getProduct(productId: string) {
	return db.query.product.findFirst({
		where(fields, operators) {
			return operators.eq(fields.id, productId);
		},
	});
}

export default async function ProductEditingPage({
	params,
}: ProductEditingPageProps) {
	const { id } = await params;
	const product = await getProduct(id);

	if (!product) {
		notFound();
	}

	return (
		<>
			<Header />
			<Shell
				header={
					<div className="flex flex-col items-center gap-2 font-medium">
						<div className="flex size-8 items-center justify-center rounded-md">
							<AppConfig.logo className="size-8" />
						</div>
						<span className="sr-only">{AppConfig.name}</span>
					</div>
				}
			>
				<ProductForm product={product} />
			</Shell>
		</>
	);
}
