import { ModalFormItemData, ModalFormItemType, ModalFormItemValidation } from ".";

/** Form field configuration */
export interface ModalFormItem extends ModalFormItemData {
    /** Caption */
    caption: string;

    /** Field type. Native control will use that type to match own type */
    type: ModalFormItemType;

    /** Should field be readonly */
    disabled?: boolean;

    /** Form item validation configuration */
    validationConfiguration?: ModalFormItemValidation;
}
