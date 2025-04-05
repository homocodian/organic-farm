import { createFormHookContexts, createFormHook } from "@tanstack/react-form";

import { SubmitButton } from "./submit-button";
import { NumberField } from "./number-field";
import { TextField } from "./text-field";
import { CityField } from "./city-field";
import { StateField } from "./state-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm: useAddressForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		CityField,
		StateField,
		NumberField,
	},
	formComponents: {
		SubmitButton,
	},
});
