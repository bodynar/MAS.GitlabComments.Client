import React from 'react';

import { ModalFormConfiguration } from './types';

type ModalFormProps = {
    formConfig: ModalFormConfiguration;
};

export const ModalForm = ({ formConfig }: ModalFormProps): JSX.Element => {
    if (formConfig.fields.length === 0) {
        throw new Error("No field provided for ModalForm");
    }

    return <>{formConfig.fields.map(x => x.name).join(", ")}</>;
};
