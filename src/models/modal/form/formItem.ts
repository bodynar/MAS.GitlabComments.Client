import { ModalFormItemData, ModalFormItemType, ModalFormItemValidation } from ".";

/** Form field configuration */
export interface ModalFormItem extends ModalFormItemData {
    /** Caption */
    caption: string;

    /** Field type. Native control will use that type to match own type */
    type: ModalFormItemType;

    /** Should field be readonly */
    disabled?: boolean;

    /** Should field be required */
    isRequired?: boolean;

    /** Validation configuration. If provided field will be marked as required */
    validationConfiguration?: ModalFormItemValidation;
}
