import { Action } from "redux/types";

/** Type of displaying modal */
export type ModalType =
    'info' /** Display some textual information */
    | 'form' /** Display some form to fill */
    | 'confirm' /** Display modal with confirm message and 2 optional buttons */
    ;

export type ModalState = {
    isOpen: boolean;
    modalParams?: ModalParams;
};

export type ModalParams = {
    title: string;
    modalType: ModalType;
    formData?: {
        fields: Array<{
            fieldName: string;
            caption: string;
            isRequired: boolean;
            validationError?: string;
        }>;
    };
    message?: string;
    buttonCaption?: {
        saveCaption?: string;
        cancelCaption?: string;
    };

    // TODO: is this correct?
    callback?: ModalCallback;
};

export type ModalCallback = {
    saveCallback?: (modalData: ModalData) => void;
    cancelCallback?: (modalData: ModalData) => void;
};

export type ModalData = {
    closeCode: 'save' | 'cancel';
    formData?: {
        fields: Array<{
            fieldName: string;
            value: string;
        }>;
    };
};

export type ModalAction = Action & {
    params?: ModalParams;
};
