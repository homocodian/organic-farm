import { Combobox, ComboboxProps } from '@/components/combobox';
import { Label } from '@/components/ui/label';

import { useFieldContext } from './form';

interface SelectFieldProps extends Omit<
  ComboboxProps,
  'value' | 'onChange' | 'setValueAction'
> {
  label: string;
}

export function SelectField({ label, ...props }: SelectFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className="grid gap-2">
      <Label
        htmlFor={props.triggerButtonProps?.id ?? props.triggerButtonProps?.name}
      >
        {label}
      </Label>
      <Combobox
        {...props}
        value={field.state.value}
        setValueAction={field.handleChange}
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
