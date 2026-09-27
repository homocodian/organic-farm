import { ComponentProps } from 'react';

import { Trees } from 'lucide-react';

import { cn } from '@/lib/utils';

type LogoProps = ComponentProps<typeof Trees>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Trees {...props} className={cn('h-6 w-6 text-green-600', className)} />
  );
}
