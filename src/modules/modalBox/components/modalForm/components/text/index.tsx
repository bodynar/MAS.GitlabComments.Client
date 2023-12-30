import { useCallback, useState } from "react";

import { getClassName, isNullOrUndefined } from "@bodynarf/utils";
import { ValidationStatus } from "@bodynarf/react.components";
import Text from "@bodynarf/react.components/components/primitives/text";

import { validateFieldValue } from "@app/core/modal";

import { BaseFieldProps } from "../basePropsType";

/** Single line text editor component */
export default function ModalFormText({
	fieldConfig, readonly,
	updateFormValue,
}: BaseFieldProps): JSX.Element {
	const [value, setValue] = useState<string>(fieldConfig.value || "");
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const [validationErrors, setValidationErrors] = useState<Array<string>>([]);

	const validate = useCallback(
		(value: string, isDirty: boolean) => {
			if (isDirty && !isNullOrUndefined(fieldConfig.validationConfiguration)) {
				const errors = validateFieldValue(value, fieldConfig.validationConfiguration!);

				setValidationErrors(errors);
			}
		}, [fieldConfig.validationConfiguration]);

	const onValueChange = useCallback(
		(newValue?: string) => {
			let isFieldDirty: boolean = isDirty;

			if (newValue !== value) {
				setIsDirty(true);
				isFieldDirty = true;
			}

			updateFormValue(fieldConfig.name, newValue);
			setValue(newValue ?? "");
			validate(newValue ?? "", isFieldDirty);
		}, [fieldConfig.name, isDirty, updateFormValue, validate, value]
	);

	const labelClassName: string = getClassName([
		(fieldConfig.validationConfiguration?.required ?? false) ? "is-required" : "",
	]);

	const validationState = {
		messages: validationErrors,
		status: validationErrors.length === 0 ? ValidationStatus.None : ValidationStatus.Invalid,
	};

	return (
		<Text
			onValueChange={onValueChange}
			defaultValue={value}
			placeholder={fieldConfig.caption}
			disabled={fieldConfig.disabled ?? readonly}
			name={fieldConfig.name}
			label={{
				className: labelClassName,
				caption: fieldConfig.caption || fieldConfig.name,
				horizontal: false,
			}}
			validationState={validationState}
		/>
	);
}
