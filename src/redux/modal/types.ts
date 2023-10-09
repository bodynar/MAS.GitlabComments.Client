import { ModalParams } from "@app/models/modal";

/** Modal box module state */
export interface ModalState {
    /** Is modal box displaying */
    isOpen: boolean;

    /** Last modal box params */
    modalParams?: ModalParams;
}
