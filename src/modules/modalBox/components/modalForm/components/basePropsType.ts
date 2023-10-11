import { ModalFormItem } from "@app/models/modal";

/** Base field editor props */
export interface BaseFieldProps {
    /** Field configuration */
    fieldConfig: ModalFormItem;

    /** Is field in read only mode */
    readonly: boolean;

    /**
     * Additional handler for validating field value.
     * Required for changing modal form save button accessibility.
    */
    setFieldValidState: (fieldName: string, isValid: boolean) => void;

    /** Save new field value in values storage */
    updateFormValue: (field: string, value: string | undefined) => void;
}
