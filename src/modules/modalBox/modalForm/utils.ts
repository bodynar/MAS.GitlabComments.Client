import { isNullOrUndefined, isStringEmpty } from "utils/common";

import { ModalFormItemValidation } from "./types";

/**
 * Validate field value
 * @param validationCfg Field validation configuration
 * @param value Field value which needs to be validated
 * @returns Validation error if field value is not valid; otherwise undefuned
 */
export const getFieldValueValidationError = (validationCfg: ModalFormItemValidation, value: string): string | undefined => {
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

    return error;
};
