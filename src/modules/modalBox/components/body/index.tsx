import { ModalParams, ModalType } from "@app/models/modal";

import ModalForm from "@app/modules/modalBox/components/modalForm";
import { useCallback } from "react";

/** Modal body prop types */
interface ModalBodyProps extends ModalParams {
    /** Change save modal button availability */
    setSaveButtonDisabled: (isValid: boolean) => void;

    /** Current form values */
    formValues: Map<string, string | undefined>;

    /** Save new form values */
    updateFormValues: (newValues: Map<string, string | undefined>) => void;
}

/** 
 * Modal body component
 */
const ModalBody = ({
    modalType,
    formData, message,
    setSaveButtonDisabled,

    formValues, updateFormValues
}: ModalBodyProps): JSX.Element => {
    const updateFormValue = useCallback(
        (field: string, value: string | undefined) => {
            formValues.set(field, value);

            updateFormValues(formValues);
        }, [formValues, updateFormValues]);

    if (modalType === ModalType.Form) {
        return (
            <ModalForm
                formConfig={formData!}
                setSaveButtonDisabled={setSaveButtonDisabled}
                updateFormValue={updateFormValue}
            />
        );
    }

    return (
        <p>{message}</p>
    );
};

export default ModalBody;
