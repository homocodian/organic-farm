"use client";

import {
	Product,
	productCategories,
	productInsertSchema,
	ProductInsertSchema,
	productTypes,
	quantityTypes,
} from "@/server/db/schema/product";
import { useProductForm } from "./form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/server/functions/products";

type ProductFormProps = {
	product?: Product;
};

export function ProductForm({ product }: ProductFormProps) {
	const router = useRouter();

	const form = useProductForm({
		defaultValues: getDefaultValues(product),
		validators: {
			onSubmit: productInsertSchema,
		},
		onSubmit: async (values) => {
			const res = product?.id
				? await updateProduct(values.value)
				: await createProduct(values.value);
			if (res?.data) {
				router.push("/dashboard");
			} else {
				if (Array.isArray(res?.error)) {
					res.error.forEach((error) => toast.error(error));
				} else {
					toast.error(res?.error ?? "Failed to create product");
				}
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-6"
		>
			<form.AppField name="name">
				{(field) => (
					<field.TextField
						placeholder="Product name"
						label="Name"
						id="name"
						required
					/>
				)}
			</form.AppField>

			<form.AppField name="description">
				{(field) => (
					<field.TextField
						placeholder="Product description"
						label="Description"
						required
						id="description"
					/>
				)}
			</form.AppField>

			<form.AppField name="category">
				{(field) => (
					<field.SelectField
						label="Category"
						selectPlaceholderText="Product category"
						inputPlaceholderText="Search category"
						triggerButtonProps={{
							id: "category",
							name: "category",
						}}
						data={productCategories}
					/>
				)}
			</form.AppField>

			<form.AppField name="type">
				{(field) => (
					<field.SelectField
						selectPlaceholderText="Product type"
						label="Type"
						data={productTypes}
						triggerButtonProps={{
							id: "type",
							name: "type",
						}}
					/>
				)}
			</form.AppField>

			<form.AppField name="quantityType">
				{(field) => (
					<form.Subscribe
						selector={(state) => [state.values.type, state.values.category]}
					>
						{([type, category]) => {
							let qTypes: string[] = [];

							if (
								(category as ProductInsertSchema["category"]) === "Machinery" ||
								(type as ProductInsertSchema["type"]) === "Rentable"
							) {
								qTypes = quantityTypes.filter(
									(qType) => qType !== "Kg" && qType !== "Quintal"
								);
							} else {
								qTypes = quantityTypes;
							}

							return (
								<field.SelectField
									selectPlaceholderText="Product quantity type"
									label="Quantity Type"
									data={qTypes}
									triggerButtonProps={{
										id: "quantityType",
										name: "quantityType",
									}}
								/>
							);
						}}
					</form.Subscribe>
				)}
			</form.AppField>

			<form.AppField name="amount">
				{(field) => (
					<field.NumberField
						placeholder="Amount"
						label="Amount"
						required
						id="amount"
						name="amount"
						type="price"
					/>
				)}
			</form.AppField>

			<form.AppForm>
				<form.SubmitButton />
			</form.AppForm>
		</form>
	);
}

function getDefaultValues(product?: Partial<Product>): ProductInsertSchema {
	return {
		name: product?.name ?? "",
		description: product?.description ?? "",
		amount: product?.amount ?? ("" as unknown as number),
		category:
			product?.category ?? ("" as unknown as ProductInsertSchema["category"]),
		quantityType:
			product?.quantityType ??
			("" as unknown as ProductInsertSchema["quantityType"]),
		type: product?.type ?? ("" as unknown as ProductInsertSchema["type"]),
	};
}
