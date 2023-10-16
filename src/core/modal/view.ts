import { isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils";

import { ModalParams, ModalType } from "@app/models/modal";

/**
 * Get button captions for modal box depending on modal params
 * @param modalParams Params of modal box
 * @returns Object with modal box button captions
 */
export const getButtonCaptions = (modalParams: ModalParams): {
    saveBtnCaption: string,
    cancelBtnCaption: string;
} => {
    const result: {
        saveBtnCaption: string,
        cancelBtnCaption: string;
    } = {
        saveBtnCaption: modalParams.modalType === ModalType.Confirm ? "Yes" : "Save",
        cancelBtnCaption: modalParams.modalType === ModalType.Confirm ? "Cancel" : "Close"
    };

    if (!isNullOrUndefined(modalParams.buttonCaption)) {
        if (!isNullOrEmpty(modalParams.buttonCaption!.saveCaption)) {
            result.saveBtnCaption = modalParams.buttonCaption!.saveCaption!;
        }
        if (!isNullOrEmpty(modalParams.buttonCaption!.cancelCaption)) {
            result.cancelBtnCaption = modalParams.buttonCaption!.cancelCaption!;
        }
    }

    return result;
};

/**
 * Get initial value for save button disabled flag
 * @param params Modal window configuration params
 * @returns Initial disabled flag value for save button
 */
export const getInitIsSaveButtonDisabled = (params: ModalParams): boolean => {
    if (params.modalType === ModalType.Form
        && !isNullOrUndefined(params.formData)
    ) {
        return params.formData!.fields
            .some(({ isRequired, value }) =>
                (isRequired ?? false) && isNullOrEmpty(value)
            );
    }

    return false;
};
