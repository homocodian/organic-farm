import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as user from "./schema/user";
import * as address from "./schema/address";
import * as product from "./schema/product";
import * as cart from "./schema/cart";

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle(client, {
	schema: {
		...user,
		...address,
		...product,
		...cart,
	},
});
