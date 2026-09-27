import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/session';

import { AccountsOverview } from './_components/accounts-overview';
import { BusinessMetrics } from './_components/business-matrics';
import { RecentTransactions } from './_components/recent-transactions';

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role === 'buyer') {
    redirect('/home');
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/products/new">New Product</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AccountsOverview />
        <RecentTransactions />
      </div>

      <BusinessMetrics />
    </div>
  );
}
