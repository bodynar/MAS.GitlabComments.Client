/** Form field validation configuration */
export interface ModalFormItemValidation {
    /** Is value required */
    required?: boolean;

    /** Manual validators */
    customValidators: Array<FormItemValidator>;
}

/** Form item validation function */
export type FormItemValidator = (value: string) => string | undefined;
