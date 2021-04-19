import { ModalFormItem } from "..";

export type BaseFieldProps = {
    fieldConfig: ModalFormItem;
    setFieldValidState: (fieldName: string, isValid: boolean) => void;
};
