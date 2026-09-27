'use client';

import React, { useState } from 'react';

import { UserIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useCartStore } from '@/app/context/cart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { defaultTheme } from '@/constants/theme';
import { authClient } from '@/lib/client-auth';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

const options = [
  { id: 'system', label: 'System' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' }
];

export function UserAccount() {
  const session = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const resetCart = useCartStore((state) => state.resetCart);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

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

  const navItems =
    user.role !== 'buyer'
      ? [
          {
            title: 'Dashboard',
            href: '/dashboard'
          }
        ]
      : [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="cursor-pointer">
          {user.image ? (
            <>
              <AvatarImage alt="Picture" src={user.image} />
              <AvatarFallback>
                {user.name ? (
                  // get the first letter of the first name and the first letter of the last name
                  // if the name is only one word, just get the first letter of that word
                  // Example: "Kamlesh Kumar" -> "KK", "Aman" -> "A"
                  `${user.name.split(' ')?.[0]?.[0] ?? ''}${
                    user.name.split(' ')?.at(-1)?.[0] ?? ''
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
              <p className="text-muted-foreground w-[200px] truncate text-sm">
                {user.email}
              </p>
            )}
          </div>
        </div>
        {navItems.length > 0 && <DropdownMenuSeparator />}
        {navItems.map((item) => (
          <DropdownMenuItem asChild key={item.title}>
            <Link href={item.href || '#'}>{item.title}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={mounted ? (theme ?? defaultTheme) : defaultTheme}
            onValueChange={setTheme}
          >
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.id} value={option.id}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={async (event) => {
            event.preventDefault();
            setLoading(true);
            await authClient.signOut();

            const redirectUrl =
              pathname +
              (searchParams.toString() ? `?${searchParams.toString()}` : '');

            resetCart();

            router.push(
              `/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`
            );
            setLoading(false);
          }}
          disabled={loading}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
