import { db } from "@/server/db";
import { cart, cartItem } from "@/server/db/schema/cart";
import { eq, sql } from "drizzle-orm";
import { getCurrentUser } from "@/lib/session";
import { Badge } from "./ui/badge";

export async function CartCount() {
	const user = await getCurrentUser();

	if (!user) {
		return null;
	}

	const [{ count }] = await db
		.select({
			count: sql<number>`count(${cartItem.productId})`,
		})
		.from(cart)
		.innerJoin(cartItem, eq(cart.id, cartItem.cartId))
		.where(eq(cart.userId, user.id));

	if (count === null || count <= 0) {
		return null;
	}

	return (
		<Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
			{count}
		</Badge>
	);
}
