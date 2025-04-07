"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./product-card";
import { FilterSidebar } from "./filter-sidebar";
import { ShoppingBag } from "lucide-react";
import {
	Product,
	productCategories,
	productTypes,
	quantityTypes,
} from "@/server/db/schema/product";

type ProductListingPageProps = {
	products: Product[];
	isOwnerListing?: boolean;
};

export function ProductListing({
	products,
	isOwnerListing = false,
}: ProductListingPageProps) {
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedQuantityTypes, setSelectedQuantityTypes] = useState<string[]>(
		[]
	);

	// Apply filters
	useEffect(() => {
		let result = products;

		if (selectedCategories.length > 0) {
			result = result.filter((product) =>
				selectedCategories.includes(product.category)
			);
		}

		if (selectedTypes.length > 0) {
			result = result.filter((product) => selectedTypes.includes(product.type));
		}

		if (selectedQuantityTypes.length > 0) {
			result = result.filter((product) =>
				selectedQuantityTypes.includes(product.quantityType)
			);
		}

		setFilteredProducts(result);
	}, [selectedCategories, selectedTypes, selectedQuantityTypes, products]);

	// Toggle category selection
	const toggleCategory = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	// Toggle type selection
	const toggleType = (type: string) => {
		setSelectedTypes((prev) =>
			prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
		);
	};

	// Toggle quantity type selection
	const toggleQuantityType = (type: string) => {
		setSelectedQuantityTypes((prev) =>
			prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
		);
	};

	return (
		<>
			<div className="container mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Products</h1>
					<FilterSidebar.Mobile
						categories={productCategories}
						types={productTypes}
						quantityTypes={quantityTypes}
						selectedCategories={selectedCategories}
						selectedTypes={selectedTypes}
						toggleCategoryAction={toggleCategory}
						toggleTypeAction={toggleType}
						selectedQuantityTypes={selectedQuantityTypes}
						toggleQuantityTypeAction={toggleQuantityType}
					/>
				</div>

				<div className="flex flex-col lg:flex-row gap-6">
					{/* Sidebar for desktop */}
					<div className="w-full lg:w-64 shrink-0 hidden lg:block">
						<FilterSidebar
							categories={productCategories}
							types={productTypes}
							quantityTypes={quantityTypes}
							selectedCategories={selectedCategories}
							selectedTypes={selectedTypes}
							toggleCategoryAction={toggleCategory}
							toggleTypeAction={toggleType}
							toggleQuantityTypeAction={toggleQuantityType}
							selectedQuantityTypes={selectedQuantityTypes}
						/>
					</div>

					{/* Product grid */}
					<div className="flex-1">
						{filteredProducts.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-64 text-center">
								<ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
								<h3 className="text-lg font-medium">No products found</h3>
								<p className="text-muted-foreground mt-2">
									Try changing your filter criteria
								</p>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
								{filteredProducts.map((product) => (
									<ProductCard
										key={product.id}
										product={product}
										isOwner={isOwnerListing}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
