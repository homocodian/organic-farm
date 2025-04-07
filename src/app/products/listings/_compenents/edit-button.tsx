import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EditButton({ productId }: { productId: string }) {
	return (
		<Button asChild>
			<Link href={`/products/listings/${productId}`}>Edit</Link>
		</Button>
	);
}
