'use client';

import { useState } from 'react';

import { CreditCard, Loader2, Wallet } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { transactions } from './recent-transactions';

export type Account = {
  clear: number;
  pending: number;
};

const initialAccounts: Account = {
  clear: transactions.reduce((accu, current) => accu + current.amount, 0),
  pending: 0
};

export function AccountsOverview() {
  const [account, setAccounts] = useState(initialAccounts);
  const [isLoading, setIsLoading] = useState(false);

  const totalBalance = account.clear + account.pending;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Accounts Overview</CardTitle>
        <Wallet className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between">
        <div className="text-2xl font-bold">₹{totalBalance.toFixed(2)}</div>
        <p className="text-muted-foreground text-xs">Total balance</p>
        <div className="mt-4 space-y-2">
          {(Object.keys(account) as (keyof Account)[]).map((name) => (
            <div key={name} className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm capitalize">
                {name}
              </span>
              <span className="text-sm font-medium">
                ₹{account[name].toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button
            size="sm"
            className="w-full"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                toast.success(
                  `Claimed ${account.clear}  from Clear account successfully!`
                );
                setAccounts({
                  ...account,
                  clear: 0
                });
              }, 2000);
            }}
            disabled={isLoading || account.clear === 0}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-4 w-4" />
            )}
            Claim
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
