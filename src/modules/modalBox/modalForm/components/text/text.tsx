import React, { ChangeEvent, useCallback, useState } from 'react';

import { isNullOrUndefined } from 'utils/common';

import { ModalFormItemValidation } from '../../types';
import { getFieldValueValidationError } from '../../utils';

import { BaseFieldProps } from '../basePropsType';

type TextProps = BaseFieldProps;

export default function Text({ fieldConfig, setFieldValidState }: TextProps): JSX.Element {
	const [value, setValue] = useState<string>(fieldConfig.value || '');
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<string | undefined>();

	const validate = useCallback(
		(value: string, isDirty: boolean) => {
			if (isDirty && !isNullOrUndefined(fieldConfig.validationConfiguration)) {
				const validationCfg: ModalFormItemValidation =
					fieldConfig.validationConfiguration as ModalFormItemValidation;
				const error: string | undefined = getFieldValueValidationError(validationCfg, value);
				setValidationError(error);
				setFieldValidState(fieldConfig.name, isNullOrUndefined(error));
			}
		}, [fieldConfig.name, fieldConfig.validationConfiguration, setFieldValidState]);

	const onInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue: string = event.target.value;
			let isFieldDirty: boolean = isDirty;

			if (newValue !== value) {
				setIsDirty(true);
				isFieldDirty = true;
			}

			fieldConfig.value = newValue;
			setValue(newValue);
			validate(newValue, isFieldDirty);
		}, [fieldConfig, isDirty, validate, value]);

	const controlClassName: string = 'input' +
		(isNullOrUndefined(validationError)
			? '' : ' is-danger');

	const labelClassName: string = 'label' +
		(!isNullOrUndefined(fieldConfig.validationConfiguration)
			? ' is-required'
			: '');

	return (
		<div className="field">
			<label
				htmlFor={fieldConfig.name}
				className={labelClassName}
			>
				{fieldConfig.caption || fieldConfig.name}
			</label>
			<div className="control">
				<input
					type="text"
					id={fieldConfig.name}
					name={fieldConfig.name}
					disabled={fieldConfig.disabled}
					className={controlClassName}
					placeholder={fieldConfig.name}
					onChange={onInputChange}
					// onBlur={validate}
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
