import { ModalParams } from "@app/models/modal";

/** Modal box module state */
export interface ModalState {
    /** Is modal box displaying */
    isOpen: boolean;

    /** Modal box params for current default modal */
    modalParams?: ModalParams;

    /** Key of custom modal which is displayed */
    customModalKey?: string;
}
