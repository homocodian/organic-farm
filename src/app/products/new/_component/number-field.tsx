import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { useFieldContext } from './form';

interface NumberFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
> {
  label: string;
  type?: 'number' | 'price';
}

export function NumberField({
  label,
  className,
  type = 'number',
  ...props
}: NumberFieldProps) {
  const field = useFieldContext<number>();

  return (
    <div className="grid gap-2">
      <Label htmlFor={props.id}>
        {type === 'number' ? label : `${label} (₹)`}
      </Label>

      <Input
        {...props}
        type="number"
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.valueAsNumber)}
        className={cn(
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          className
        )}
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
              <span className="text-sm font-medium">{error?.message}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
