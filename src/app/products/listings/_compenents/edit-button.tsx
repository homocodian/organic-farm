import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function EditButton({ productId }: { productId: string }) {
  return (
    <Button asChild>
      <Link href={`/products/listings/${productId}`}>Edit</Link>
    </Button>
  );
}
