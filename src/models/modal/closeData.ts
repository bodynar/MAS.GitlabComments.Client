import { ModalFormItemData } from ".";

/** Modal close data params */
export interface ModalCloseData {
    /** 
     * Close reason.
     * Cross sign (x on the top right) will be evaluated as cancel
     */
    closeCode: "save" | "cancel";

    /** Form data state */
    formData?: {
        /** Form fields states */
        fields: Array<ModalFormItemData>;
    };
}
