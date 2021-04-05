import { ModalParams } from "redux/modal/types";

import { isNullOrUndefined, isStringEmpty } from "utils/common";

/**
 * Get button captions for modal box depending on modal params
 * @param modalParams Params of modal box
 * @returns Object with modal box button captions
 */
export const getButtonCaptions = (modalParams: ModalParams | undefined): {
    saveBtnCaption: string,
    cancelBtnCaption: string;
} => {
    const result: {
        saveBtnCaption: string,
        cancelBtnCaption: string;
    } = {
        saveBtnCaption: "Save",
        cancelBtnCaption: "Cancel"
    };

    if (!isNullOrUndefined(modalParams) && !isNullOrUndefined(modalParams?.buttonCaption)) {
        if (!isNullOrUndefined(modalParams?.buttonCaption?.saveCaption)
            && !isStringEmpty(modalParams?.buttonCaption?.saveCaption as string)
        ) {
            result.saveBtnCaption = modalParams?.buttonCaption?.saveCaption as string;
        }
        if (!isNullOrUndefined(modalParams?.buttonCaption?.cancelCaption)
            && !isStringEmpty(modalParams?.buttonCaption?.cancelCaption as string)
        ) {
            result.cancelBtnCaption = modalParams?.buttonCaption?.cancelCaption as string;
        }
    }

    return result;
};
