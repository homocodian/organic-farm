"use client";
import Link from "next/link";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserIcon } from "lucide-react";
import { authClient } from "@/lib/client-auth";
import { Button } from "./ui/button";

const navItems = [
	{
		title: "Dashboard",
		href: "/dashboard",
	},
	{
		title: "Settings",
		href: "/settings",
	},
];

export function UserAccount() {
	const session = authClient.useSession();

	if (session.isPending) {
		return (
			<Avatar>
				<AvatarFallback>
					<UserIcon className="h-4 w-4" />
				</AvatarFallback>
			</Avatar>
		);
	}

	if (!session.data?.user) {
		return (
			<Button asChild>
				<Link href="/login">Login</Link>
			</Button>
		);
	}

	const user = session.data.user;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="rounded-full">
				<Avatar>
					{user.image ? (
						<>
							<AvatarImage alt="Picture" src={user.image} />
							<AvatarFallback>
								{user.name ? (
									`${user.name.split(" ")?.[0]?.[0] ?? ""}${
										user.name.split(" ")?.at(-1)?.[0] ?? ""
									}`
								) : (
									<>
										<span className="sr-only">{user.name}</span>
										<UserIcon className="h-4 w-4" />
									</>
								)}
							</AvatarFallback>
						</>
					) : (
						<AvatarFallback>
							<span className="sr-only">{user.name}</span>
							<UserIcon className="h-4 w-4" />
						</AvatarFallback>
					)}
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{user.name && <p className="font-medium">{user.name}</p>}
						{user.email && (
							<p className="w-[200px] truncate text-sm text-muted-foreground">
								{user.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />
				{navItems.map((item) => (
					<DropdownMenuItem asChild key={item.title}>
						<Link href={item.href || "#"}>{item.title}</Link>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer"
					onSelect={(event) => {
						event.preventDefault();
						authClient.signOut();
					}}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
