import { ModalCloseData } from ".";

/** Modal callback after close configuration */
export interface ModalCallback {
    /** Callback for closing modal on clicking Save button */
    saveCallback?: (modalData: ModalCloseData) => void;

    /** Callback for closing modal on clicking Cancel button */
    cancelCallback?: (modalData: ModalCloseData) => void;
}
