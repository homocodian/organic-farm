import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/server/db";
import { EmptyCart } from "./_components/empty";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function CartPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const cart = await db.query.cart.findFirst({
		with: {
			cartItems: true,
		},
		where(fields, operators) {
			return operators.eq(fields.userId, user.id);
		},
	});

	if (!cart) {
		return <EmptyCart />;
	}

	return (
		<div className="container mx-auto px-4 py-12 md:py-16">
			<div className="flex items-center gap-2 mb-8">
				<ShoppingCart className="h-6 w-6" />
				<h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
			</div>

			{/* Cart with items */}
			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<Card>
						<CardContent className="p-6">
							<div className="grid gap-6">
								{/* Cart Item 1 */}
								<div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:gap-6">
									<div className="grid gap-4 sm:grid-cols-[80px_1fr] sm:gap-6">
										<div className="relative aspect-square h-20 w-20 min-w-fit overflow-hidden rounded-md bg-muted">
											<Image
												src="/placeholder.svg?height=80&width=80"
												alt="Product 1"
												fill
												className="object-cover"
											/>
										</div>
										<div className="grid gap-1">
											<h3 className="font-semibold">
												Premium Wireless Headphones
											</h3>
											<div className="text-sm text-muted-foreground">Black</div>
											<div className="font-medium">$129.99</div>
											<div className="flex items-center gap-2 sm:hidden">
												<Button
													variant="outline"
													size="icon"
													className="h-8 w-8"
												>
													<Minus className="h-3 w-3" />
													<span className="sr-only">Decrease quantity</span>
												</Button>
												<span className="text-sm">1</span>
												<Button
													variant="outline"
													size="icon"
													className="h-8 w-8"
												>
													<Plus className="h-3 w-3" />
													<span className="sr-only">Increase quantity</span>
												</Button>
												<Button
													variant="outline"
													size="icon"
													className="h-8 w-8 ml-auto"
												>
													<Trash2 className="h-3 w-3" />
													<span className="sr-only">Remove item</span>
												</Button>
											</div>
										</div>
									</div>
									<div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-2">
										<div className="flex items-center gap-2">
											<Button variant="outline" size="icon" className="h-8 w-8">
												<Minus className="h-3 w-3" />
												<span className="sr-only">Decrease quantity</span>
											</Button>
											<span className="text-sm w-4 text-center">1</span>
											<Button variant="outline" size="icon" className="h-8 w-8">
												<Plus className="h-3 w-3" />
												<span className="sr-only">Increase quantity</span>
											</Button>
										</div>
										<Button
											variant="ghost"
											size="sm"
											className="text-sm text-muted-foreground"
										>
											<Trash2 className="h-3 w-3 mr-2" />
											Remove
										</Button>
									</div>
								</div>

								<Separator />

								{/* Cart Item 2 */}
								<div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:gap-6">
									<div className="grid gap-4 sm:grid-cols-[80px_1fr] sm:gap-6">
										<div className="relative aspect-square h-20 w-20 min-w-fit overflow-hidden rounded-md bg-muted">
											<Image
												src="/placeholder.svg?height=80&width=80"
												alt="Product 2"
												fill
												className="object-cover"
											/>
										</div>
										<div className="grid gap-1">
											<h3 className="font-semibold">Smart Watch Series 5</h3>
											<div className="text-sm text-muted-foreground">
												Silver
											</div>
											<div className="font-medium">$249.99</div>
											<div className="flex items-center gap-2 sm:hidden">
												<Button
													variant="outline"
													size="icon"
													className="h-8 w-8"
												>
													<Minus className="h-3 w-3" />
													<span className="sr-only">Decrease quantity</span>
												</Button>
												<span className="text-sm">2</span>
												<Button
													variant="outline"
													size="icon"
													className="h-8 w-8"
												>
													<Plus className="h-3 w-3" />
													<span className="sr-only">Increase quantity</span>
												</Button>
												<Button
													variant="outline"
													size="icon"
													className="h-8 w-8 ml-auto"
												>
													<Trash2 className="h-3 w-3" />
													<span className="sr-only">Remove item</span>
												</Button>
											</div>
										</div>
									</div>
									<div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-2">
										<div className="flex items-center gap-2">
											<Button variant="outline" size="icon" className="h-8 w-8">
												<Minus className="h-3 w-3" />
												<span className="sr-only">Decrease quantity</span>
											</Button>
											<span className="text-sm w-4 text-center">2</span>
											<Button variant="outline" size="icon" className="h-8 w-8">
												<Plus className="h-3 w-3" />
												<span className="sr-only">Increase quantity</span>
											</Button>
										</div>
										<Button
											variant="ghost"
											size="sm"
											className="text-sm text-muted-foreground"
										>
											<Trash2 className="h-3 w-3 mr-2" />
											Remove
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 pt-0">
							<Button variant="outline" asChild>
								<Link href="/products">Continue Shopping</Link>
							</Button>
							<Button variant="outline">Update Cart</Button>
						</CardFooter>
					</Card>
				</div>

				{/* Order Summary */}
				<div>
					<Card>
						<CardContent className="p-6">
							<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
							<div className="grid gap-3">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span>$629.97</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Shipping</span>
									<span>$9.99</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Tax</span>
									<span>$63.00</span>
								</div>
								<Separator className="my-2" />
								<div className="flex items-center justify-between font-semibold">
									<span>Total</span>
									<span>$702.96</span>
								</div>
							</div>
						</CardContent>
						<CardFooter className="p-6 pt-0">
							<Button className="w-full">Proceed to Checkout</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
