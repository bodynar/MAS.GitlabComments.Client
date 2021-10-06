import React, { ChangeEvent, useCallback, useState } from 'react';

import { isNullOrUndefined } from '@app/utils/common';

import { getFieldValueValidationError } from '../../utils';

import { BaseFieldProps } from '../basePropsType';

type TextProps = BaseFieldProps;

// TODO: move to @sharedComponents

/** Single line text editor component */
export default function Text({ fieldConfig, setFieldValidState }: TextProps): JSX.Element {
	const [value, setValue] = useState<string>(fieldConfig.value || '');
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<string | undefined>();

	const validate = useCallback(
		(value: string, isDirty: boolean) => {
			if (isDirty && fieldConfig.isRequired === true) {
				const error: string | undefined = getFieldValueValidationError(value, fieldConfig.validationConfiguration);

				setValidationError(error);
				setFieldValidState(fieldConfig.name, isNullOrUndefined(error));
			}
		}, [fieldConfig.isRequired, fieldConfig.name, fieldConfig.validationConfiguration, setFieldValidState]);

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
		(fieldConfig.isRequired === true
			? ' is-required'
			: '');

	return (
		<div className='field'>
			<label
				htmlFor={fieldConfig.name}
				className={labelClassName}
			>
				{fieldConfig.caption || fieldConfig.name}
			</label>
			<div className='control'>
				<input
					type='text'
					id={fieldConfig.name}
					name={fieldConfig.name}
					disabled={fieldConfig.disabled}
					className={controlClassName}
					placeholder={fieldConfig.name}
					onChange={onInputChange}
					value={value}
				/>
			</div>
			{!isNullOrUndefined(validationError)
				&& <p className='help is-danger'>
					{validationError}
				</p>
			}
		</div>
	);
}
