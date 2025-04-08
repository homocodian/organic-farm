import fs from "fs/promises";
import { product, ProductInsertSchema } from "./schema/product";
import { db } from ".";
import path from "path";
import { exit } from "process";

console.log(path.join(__dirname, "../../lib/data/items.json"));

const seed = async () => {
	const data = await fs.readFile(
		path.join(__dirname, "../../lib/data/items.json"),
		"utf8"
	);
	const items: ProductInsertSchema[] = JSON.parse(data);
	console.log("🚀 ~ seed ~ items:", items);

	const itemsWithUserId = items.map((item) => ({
		userId: "XlCReO5FlaPzafCFSUA6uxiyTmzZ8mn6",
		name: item.name,
		description: item.description,
		category: item.category,
		quantityType: item.quantityType,
		amount: item.amount,
		type: item.type,
		imageUrl: item.imageUrl,
	}));

	await db.insert(product).values(itemsWithUserId).onConflictDoNothing();
};

seed()
	.then(() => {
		console.log("Seed completed successfully.");
		exit(0);
	})
	.catch((error) => {
		console.error("Error during seed:", error);
		exit(1);
	});
