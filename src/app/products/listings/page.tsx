import { redirect } from 'next/navigation';

import { Header } from '@/components/header';
import { getCurrentUser } from '@/lib/session';
import { db } from '@/server/db';

import { ProductListing } from '../_components/product-listings';

async function getProducts(userId: string) {
  try {
    return await db.query.product.findMany({
      where(fields, operators) {
        return operators.eq(fields.userId, userId);
      },
      orderBy(fields, operators) {
        return operators.desc(fields.createdAt);
      }
    });
  } catch {
    return [];
  }
}

export default async function ListingPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const products = await getProducts(user.id);

  return (
    <>
      <Header />
      <main>
        <ProductListing products={products} isOwnerListing={true} />
      </main>
    </>
  );
}
