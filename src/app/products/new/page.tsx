import { Shell } from "@/components/shell";
import { ProductForm } from "./_component/product-form";
import { Header } from "@/components/header";

export default function NewProductPage() {
	return (
		<>
			<Header />
			<Shell>
				<ProductForm />
			</Shell>
		</>
	);
}
