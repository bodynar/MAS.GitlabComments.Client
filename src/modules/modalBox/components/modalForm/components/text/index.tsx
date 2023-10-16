import { useCallback, useState } from "react";

import { isNullOrUndefined, getClassName } from "@bodynarf/utils";
import { ValidationStatus } from "@bodynarf/react.components";
import Text from "@bodynarf/react.components/components/primitives/text";

import { getFieldValueValidationError } from "../../utils";

import { BaseFieldProps } from "../basePropsType";

/** Single line text editor component */
export default function ModalFormText({
	fieldConfig, readonly,
	updateFormValue,
}: BaseFieldProps): JSX.Element {
	const [value, setValue] = useState<string>(fieldConfig.value || "");
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<string | undefined>();

	const validate = useCallback(
		(value: string, isDirty: boolean) => {
			if (isDirty && fieldConfig.isRequired === true) {
				const error: string | undefined = getFieldValueValidationError(value, fieldConfig.validationConfiguration);

				setValidationError(error);
			}
		}, [fieldConfig.isRequired, fieldConfig.validationConfiguration]);

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
		fieldConfig.isRequired === true ? "is-required" : "",
	]);

	const validationState = isNullOrUndefined(validationError)
		? { status: ValidationStatus.None, messages: [] }
		: { status: ValidationStatus.Invalid, messages: [validationError!] };

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
