import { ModalFormItem } from ".";

/** Modal form configuration */
export interface ModalFormConfiguration {
    /** Form fields configuration */
    fields: Array<ModalFormItem>;

    /** Is form in read only mode */
    readonly: boolean;

    /** Optional caption. Will be shown if provided */
    caption?: string;
}
