import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { CityField } from './city-field';
import { NumberField } from './number-field';
import { StateField } from './state-field';
import { SubmitButton } from './submit-button';
import { TextField } from './text-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useAddressForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    CityField,
    StateField,
    NumberField
  },
  formComponents: {
    SubmitButton
  }
});
