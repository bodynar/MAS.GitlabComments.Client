import React, { ChangeEvent, useCallback, useState } from 'react';

import { isNullOrUndefined } from 'utils/common';

import { ModalFormItem, ModalFormItemValidation } from '../../types';
import { getFieldValueValidationError } from '../../utils';

type MultilineProps = {
	fieldConfig: ModalFormItem;
};

export default function Multiline({ fieldConfig }: MultilineProps): JSX.Element {
	const [value, setValue] = useState<string>(fieldConfig.value || '');
	const [isDirty, setIsDirty] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<string | undefined>();

	const onInputChange = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
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

			const error: string | undefined = getFieldValueValidationError(validationCfg, value);
			setValidationError(error);
		}
	}, [fieldConfig.validationConfiguration, isDirty, value]);

	const controlClassName: string = 'textarea' +
		(isNullOrUndefined(validationError)
			? '' : ' is-danger');

	const labelClassName: string = 'label' +
		(!isNullOrUndefined(fieldConfig.validationConfiguration)
			&& fieldConfig.validationConfiguration?.isRequired === true
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
				<textarea
					id={fieldConfig.name}
					name={fieldConfig.name}
					className={controlClassName}
					disabled={fieldConfig.disabled}
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
