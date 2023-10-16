import { ModalFormItem } from "@app/models/modal";

/** Base field editor props */
export interface BaseFieldProps {
    /** Field configuration */
    fieldConfig: ModalFormItem;

    /** Is field in read only mode */
    readonly: boolean;

    /** Save new field value in values storage */
    updateFormValue: (field: string, value: string | undefined) => void;
}
