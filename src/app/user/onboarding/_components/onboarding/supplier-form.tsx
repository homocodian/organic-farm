'use client';

import type { z } from 'zod';

import { useForm } from '@tanstack/react-form';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { onboardingSchema } from '@/lib/schema/onboarding';
import { useOnboardingStore } from '@/lib/store/onboarding';

const supplierFormSchema = onboardingSchema.pick({
  companyName: true,
  license: true
});

type SupplierFormSchema = z.infer<typeof supplierFormSchema>;

export function SupplierForm() {
  const setCurrentStep = useOnboardingStore((state) => state.setCurrentStep);
  const setData = useOnboardingStore((state) => state.setData);

  const form = useForm({
    defaultValues: {
      companyName: '',
      license: '' as unknown as number
    } as SupplierFormSchema,
    validators: {
      onChange: supplierFormSchema
    },
    onSubmit: async (values) => {
      // Handle form submission here
      console.log(values);
      setData(values.value);
      setCurrentStep((step) => step + 1);
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <form.Field name="companyName">
        {(field) => (
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Company Name"
              autoComplete="organization"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors.length > 0 ? (
              <div className="border-destructive bg-destructive/10 text-destructive rounded-md border p-4">
                {field.state.meta.errors.map((error) => (
                  <div className="flex items-center gap-2" key={error?.message}>
                    <span
                      className="flex h-4 w-4 flex-shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      •
                    </span>
                    <span className="text-sm font-medium">
                      {error?.message}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </form.Field>
      <form.Field name="license">
        {(field) => (
          <div className="grid gap-2">
            <Label htmlFor="license">License</Label>
            <Input
              id="license"
              name="license"
              placeholder="License Number"
              autoComplete="off"
              value={field.state.value}
              type="number"
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            {field.state.meta.errors.length > 0 ? (
              <div className="border-destructive bg-destructive/10 text-destructive rounded-md border p-4">
                {field.state.meta.errors.map((error) => (
                  <div className="flex items-center gap-2" key={error?.message}>
                    <span
                      className="flex h-4 w-4 flex-shrink-0 items-center justify-center"
                      aria-hidden="true"
                    >
                      •
                    </span>
                    <span className="text-sm font-medium">
                      {error?.message}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </form.Field>
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Back
            </Button>
            <Button disabled={isSubmitting} aria-disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Next
            </Button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
}
