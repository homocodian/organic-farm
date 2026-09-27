'use client';

import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

import { NumberField } from './number-field';
import { SelectField } from './select-field';
import { SubmitButton } from './submit-button';
import { TextField } from './text-field';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm: useProductForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    NumberField,
    SelectField
  },
  formComponents: {
    SubmitButton
  }
});
