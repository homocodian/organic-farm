import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Transaction = {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
};

export const transactions: Transaction[] = [
  {
    id: 1,
    name: 'Wheat',
    amount: 1200,
    date: '2025-4-7',
    type: 'income'
  },
  {
    id: 2,
    name: 'Pulses',
    amount: 5200,
    date: '2025-4-8',
    type: 'income'
  },
  {
    id: 3,
    name: 'Harvester',
    amount: 1200,
    date: '2025-4-7',
    type: 'expense'
  }
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">{transaction.name}</p>
                <p className="text-muted-foreground text-xs">
                  {transaction.date}
                </p>
              </div>
              <div className="flex items-center">
                <span
                  className={`text-sm font-medium ${
                    transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </span>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="ml-1 h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDownRight className="ml-1 h-4 w-4 text-red-600 dark:text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4 w-full" variant="outline" asChild>
          <Link href="/transactions">View All Transactions</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
