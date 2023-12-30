import { ModalCallback, ModalFormConfiguration, ModalType } from ".";

/** Modal box configuration params */
export interface ModalParams {
    /** Modal box title */
    title: string;

    /** Modal type */
    modalType: ModalType;

    /** 
     * Modal box form configuration.
     * Applies only to form modal type
    */
    formData?: ModalFormConfiguration;

    /**
     * Modal message.
     * Applies only to info and confirm modal types
    */
    message?: string;

    /** Modal button caption configuration */
    buttonCaption?: {
        /**
         * Save button caption.
         * Button visible only in form and confirm modal type
        */
        saveCaption?: string;

        /** Cancel button caption */
        cancelCaption?: string;
    };

    /**
     * Callback modal configuration.
     * Will be invoked after modal close
    */
    callback?: ModalCallback;
}
