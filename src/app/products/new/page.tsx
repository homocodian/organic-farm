import { redirect, unauthorized } from 'next/navigation';

import { Header } from '@/components/header';
import { Shell } from '@/components/shell';
import { AppConfig } from '@/lib/app-config';
import { getCurrentUser } from '@/lib/session';

import { ProductForm } from './_component/product-form';

export default async function NewProductPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('login');
  }

  if (user.role === 'buyer') {
    unauthorized();
  }

  return (
    <>
      <Header />
      <Shell
        header={
          <div className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <AppConfig.logo className="size-8" />
            </div>
            <span className="sr-only">{AppConfig.name}</span>
          </div>
        }
      >
        <ProductForm />
      </Shell>
    </>
  );
}
