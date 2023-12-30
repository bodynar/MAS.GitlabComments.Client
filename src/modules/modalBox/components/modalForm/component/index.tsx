import { isNullOrUndefined } from "@bodynarf/utils";

import "./style.scss";

import { ModalFormConfiguration } from "@app/models/modal";

import ModalFormText from "../components/text";
import Multiline from "../components/multiline";
import { BaseFieldProps } from "../components/basePropsType";

interface ModalFormProps {
    /** Form configuration */
    formConfig: ModalFormConfiguration;

    /** Save new form item value */
    updateFormValue: (field: string, value: string | undefined) => void;
}

/**
 * Modal form container component
 * @throws Form configuration does not contain any field
 */
const ModalForm = ({
    formConfig, updateFormValue
}: ModalFormProps): JSX.Element => {
    if (formConfig.fields.length === 0) {
        throw new Error("No field provided for ModalForm");
    }

    return (
        <>
            {!isNullOrUndefined(formConfig.caption)
                && <h3>{formConfig.caption}</h3>
            }
            {formConfig.fields.map(fieldConfig => {
                const config: BaseFieldProps = {
                    fieldConfig: fieldConfig,
                    updateFormValue: updateFormValue,
                    readonly: formConfig.readonly ?? false,
                };

                if (fieldConfig.type === "text") {
                    return <ModalFormText
                        key={fieldConfig.name}
                        {...config}
                    />;
                } else if (fieldConfig.type === "multiline") {
                    return <Multiline
                        key={fieldConfig.name}
                        {...config}
                    />;
                }
                else {
                    console.error(`Field type ${fieldConfig.type} is not supported at the moment.`);
                    return <span key={fieldConfig.name}>Error during form building</span>;
                }
            })}
        </>
    );
};

export default ModalForm;
