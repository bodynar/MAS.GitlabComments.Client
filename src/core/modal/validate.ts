import { isNullOrEmpty, isNullOrUndefined, isStringEmpty } from "@bodynarf/utils";

import { ModalFormItem, ModalParams, ModalType } from "@app/models/modal";

/**
 * Validate modal window configuration params
 * @param modalParams Modal window configuration params
 * @returns Params validation error is found; otherwise undefined
 */
export const validateModalParams = (modalParams: ModalParams): string | undefined => {
    if (isStringEmpty(modalParams.title)) {
        return "Title is empty.";
    }

    const isValidatorDeclared = modalTypeToValidateParamFuncMap.has(modalParams.modalType);

    if (isValidatorDeclared) {
        const errorFromValidator = modalTypeToValidateParamFuncMap.get(modalParams.modalType)!(modalParams);

        return errorFromValidator;
    }

    return undefined;
};

/**
 * Validate modal configuration for `ModalType.Form` type
 * @param modalConfig Modal open configuration
 * @returns Error message if config isn"t correct; otherwise - `undefined`
 */
const validateFormType = (modalConfig: ModalParams): string | undefined => {
    if (isNullOrUndefined(modalConfig.formData)) {
        return "Form data is not defined.";
    }
    if (modalConfig.formData!.fields.length === 0) {
        return "Form data fields array is empty.";
    }

    const invalidItems: Array<ModalFormItem> =
        modalConfig.formData!.fields
            .map((x, index) => ({ ...x, position: index }))
            .filter(item => isStringEmpty(item.name) || isStringEmpty(item.caption));

    if (invalidItems.length !== 0) {
        return `Form configuration contains invalid fields: [${invalidItems.map(({ name }) => name).join(", ")}].`;
    }

    if (!modalConfig.formData!.readonly
        && (isNullOrUndefined(modalConfig.callback)
            || isNullOrUndefined(modalConfig.callback!.saveCallback)
        )
    ) {
        return "Save button callback is not defined.";
    }

    return undefined;
};

/**
 * Validate modal configuration for `ModalType.Confirm` type
 * @param modalConfig Modal open configuration
 * @returns Error message if config isn"t correct; otherwise - `undefined`
 */
const validateConfirmType = (modalConfig: ModalParams): string | undefined => {
    if (isNullOrEmpty(modalConfig.message)) {
        return "Message is not defined or empty.";
    }

    if (isNullOrUndefined(modalConfig.callback)
        || isNullOrUndefined(modalConfig.callback!.saveCallback)
    ) {
        return "Confirm callback is not defined.";
    }

    return undefined;
};

/**
 * Validate modal configuration for `ModalType.Info` type
 * @param modalConfig Modal open configuration
 * @returns Error message if config isn"t correct; otherwise - `undefined`
 */
const validateInfoType = (modalConfig: ModalParams): string | undefined => {
    if (isNullOrEmpty(modalConfig.message)) {
        return "Message is not defined.";
    }

    return undefined;
};

/**
 * Map for modal type to validator params.
 * Contains custom validators of modal params for specific modal types
 */
const modalTypeToValidateParamFuncMap = new Map<ModalType, (modalParams: ModalParams) => string | undefined>([
    [ModalType.Form, validateFormType],
    [ModalType.Confirm, validateConfirmType],
    [ModalType.Info, validateInfoType],
]);
