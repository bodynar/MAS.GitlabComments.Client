import React from 'react';

import './common.style.scss';

import { isNullOrUndefined } from 'utils/common';

import Text from 'modules/modalBox/modalForm/components/text/text';

import { ModalFormConfiguration } from '../types';
import Multiline from '../components/multiline/multiline';

type ModalFormProps = {
    formConfig: ModalFormConfiguration;
};

export const ModalForm = ({ formConfig }: ModalFormProps): JSX.Element => {
    if (formConfig.fields.length === 0) {
        throw new Error("No field provided for ModalForm");
    }

    return (
        <div>
            {!isNullOrUndefined(formConfig.caption)
                && <h3>{formConfig.caption}</h3>}
            {formConfig.fields.map(fieldConfig => {
                if (fieldConfig.type === 'text') {
                    return <Text
                        key={fieldConfig.name}
                        fieldConfig={fieldConfig}
                    />;
                } else if (fieldConfig.type === 'multiline') {
                    return <Multiline
                        key={fieldConfig.name}
                        fieldConfig={fieldConfig}
                    />;
                }
                return <>{fieldConfig.type} - {fieldConfig.name}</>;
            })}
        </div>
    );
};
