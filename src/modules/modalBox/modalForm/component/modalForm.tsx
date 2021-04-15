import React from 'react';

import './common.style.scss';

import { isNullOrUndefined } from 'utils/common';

import { ModalFormConfiguration } from '../types';

import Text from '../components/text/text';
import Multiline from '../components/multiline/multiline';

type ModalFormProps = {
    formConfig: ModalFormConfiguration;
    setSaveButtonDisabled: (isValid: boolean) => void;
};

interface FormFieldValidationState {
    fieldName: string;
    isValid: boolean;
}

export const ModalForm = ({ formConfig, setSaveButtonDisabled }: ModalFormProps): JSX.Element => {
    if (formConfig.fields.length === 0) {
        throw new Error("No field provided for ModalForm");
    }

    const requiredFields: Array<FormFieldValidationState> =
        formConfig.fields
            .filter(field =>
                !isNullOrUndefined(field.validationConfiguration))
            .map(({ name }) => ({ fieldName: name, isValid: false }));

    const [fieldValidStates, setFieldValidStates] = React.useState<Array<FormFieldValidationState>>(requiredFields);

    const setFieldValidState = React.useCallback(
        (fieldName: string, isValid: boolean) => {
            if (isValid) {
                const hasInvalidField: boolean =
                    fieldValidStates.some(x => x.fieldName !== fieldName && !x.isValid);

                setSaveButtonDisabled(hasInvalidField);
            } else {
                setSaveButtonDisabled(true);
            }

            const updatedStatesArray: Array<FormFieldValidationState> =
                fieldValidStates.map(x =>
                    x.fieldName === fieldName ? ({ fieldName, isValid }) : x);

            setFieldValidStates([...updatedStatesArray]);
        }, [fieldValidStates, setSaveButtonDisabled]);

    return (
        <div>
            {!isNullOrUndefined(formConfig.caption)
                && <h3>{formConfig.caption}</h3>}
            {formConfig.fields.map(fieldConfig => {
                if (fieldConfig.type === 'text') {
                    return <Text
                        key={fieldConfig.name}
                        fieldConfig={fieldConfig}
                        setFieldValidState={setFieldValidState}
                    />;
                } else if (fieldConfig.type === 'multiline') {
                    return <Multiline
                        key={fieldConfig.name}
                        fieldConfig={fieldConfig}
                        setFieldValidState={setFieldValidState}
                    />;
                }
                return <>{fieldConfig.type} - {fieldConfig.name}</>;
            })}
        </div>
    );
};
