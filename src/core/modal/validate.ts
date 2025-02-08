import { isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils";

import { FormItemValidator, ModalFormItemValidation } from "@app/models/modal";

/**
 * Validate form item value
 * @param value New value
 * @param configuration Form item validation configuration
 * @returns Validation errors if any found
 */
export const validateFieldValue = (
    value: string, { required, customValidators }: ModalFormItemValidation
): Array<string> => {
    const validators: Array<FormItemValidator> = [];

    validators.push(...customValidators ?? []);

    if (required ?? false) {
        validators.push(getRequiredValidator());
    }

    return validators
        .map(validator => validator(value))
        .filter(result => !isNullOrUndefined(result))
        .map(result => result as string);
};

/**
 * Get length validator function
 * @param maxLength Maximum allowed value length
 * @param minLength Minimum allowed value length
 * @returns Validator function
 */
export const getLengthValidator = (maxLength: number, minLength: number = 0): FormItemValidator => {
    if (maxLength <= minLength) {
        throw new Error(`maxLength "${maxLength}" must be greater that minLength "${minLength}"`);
    }

    return (value: string): string | undefined => {
        if (isNullOrEmpty(value)) {
            return undefined;
        }

        if (value.length > maxLength) {
            return `Value must be ${maxLength} symbols long max`;
        }

        if (minLength > 0 && value.length > minLength) {
            return `Value must be at least ${minLength} symbols long`;
        }

        return undefined;
    };
};

/**
 * Get required value validator function
 * @returns Validator function
 */
const getRequiredValidator = (): FormItemValidator => {
    return (value: string): string | undefined => {
        if (isNullOrEmpty(value)) {
            return "Value is required";
        }

        return undefined;
    };
};
