import React, { ChangeEvent, useCallback, useState } from 'react';

import { isNullOrUndefined, isStringEmpty } from 'utils/common';

import { ModalFormItem, ModalFormItemValidation } from '../../types';

type TextProps = {
	fieldConfig: ModalFormItem;
};

export default function Text({ fieldConfig }: TextProps): JSX.Element {
	const [value, setValue] = useState<string>(fieldConfig.value || '');
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<string | undefined>();

	const onInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue: string = event.target.value;

			if (newValue !== value) {
				setIsDirty(true);
			}

			fieldConfig.value = newValue;
			setValue(newValue);
		}, [fieldConfig, value]);

	const validate = useCallback(() => {
		if (isDirty && !isNullOrUndefined(fieldConfig.validationConfiguration)) {
			const validationCfg: ModalFormItemValidation =
				fieldConfig.validationConfiguration as ModalFormItemValidation;

			if (validationCfg.isRequired) {
				const validationError: string =
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					!isNullOrUndefined(validationCfg.customRequiredvalidationError) && !isStringEmpty(validationCfg.customRequiredvalidationError!)
						? validationCfg.customRequiredvalidationError as string
						: 'Value is required';

				const validator: (value: string) => string | undefined =
					!isNullOrUndefined(validationCfg.customValidation)
						? validationCfg.customValidation as (value: string) => string | undefined
						: (value: string): string | undefined => value === '' ? validationError : undefined;

				const error: string | undefined = validator(value);
				setValidationError(error);
			}
		}
	}, [fieldConfig.validationConfiguration, isDirty, value]);

	const controlClassName: string = 'input' +
		(isNullOrUndefined(validationError)
			? '' : ' is-danger');

	return (
		<div>
			<label
				htmlFor={fieldConfig.name}
				className="label"
			>
				{fieldConfig.caption || fieldConfig.name}
			</label>
			<div className="control">
				<input
					type="text"
					className={controlClassName}
					id={fieldConfig.name}
					name={fieldConfig.name}
					placeholder={fieldConfig.name}
					onChange={onInputChange}
					onBlur={validate}
					value={value}
				/>
			</div>
			{!isNullOrUndefined(validationError)
				&& <p className="help is-danger">
					{validationError}
				</p>
			}
		</div>
	);
}
