import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '@/env.mjs';

import * as address from './schema/address';
import * as cart from './schema/cart';
import * as order from './schema/order';
import * as product from './schema/product';
import * as relations from './schema/relations';
import * as user from './schema/user';

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(env.DATABASE_URL!, { prepare: false });
export const db = drizzle(client, {
  schema: {
    ...user,
    ...address,
    ...product,
    ...cart,
    ...order,
    ...relations
  }
});
