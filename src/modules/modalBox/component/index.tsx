import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";

import { isNullish, isNullOrUndefined } from "@bodynarf/utils";
import { ButtonProps } from "@bodynarf/react.components/components/button";

import "./style.dark.scss";

import { ModalCallback, ModalCloseData, ModalParams, ModalType } from "@app/models/modal";
import { getButtonCaptions, getInitIsSaveButtonDisabled, validateModalParams } from "@app/core/modal";

import { CompositeAppState } from "@app/redux";
import { closeModal } from "@app/redux/modal";
import ModalWrapper from "@app/modal";

import ModalBody from "../components/body";

/** Props type of `ModalBox` */
type ModalBoxProps = {
    /** Is modal currently shown */
    isOpen: boolean;

    /** Modal window configuration */
    params?: ModalParams;

    /** Close modal handler */
    closeModal: (closeModalData: ModalCloseData, modalCallback?: ModalCallback) => void;
};

/** Types of modal which can be handled by current component */
const handledTypes = [
    ModalType.Info,
    ModalType.Form,
    ModalType.Confirm,
];

/**
 * Modal window component
 * @throws Modal params is invalid
 */
const ModalBox: FC<ModalBoxProps> = ({
    isOpen, params,
    closeModal
}) => {
    const validationError =
        isOpen && !isNullOrUndefined(params)
            ? validateModalParams(params!)
            : undefined;

    if (!isNullOrUndefined(validationError)) {
        throw new Error(`Modal configuration error: ${validationError}`);
    }

    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
    const [formData, setFormData] = useState<Map<string, string | undefined>>(new Map());
    const isSaveButtonVisible = useMemo(() => {
        if (!isOpen) {
            return false;
        }

        if (params!.modalType === ModalType.Info) {
            return false;
        }

        if (params!.modalType === ModalType.Form && params!.formData!.readonly) {
            return false;
        }

        return true;
    }, [isOpen, params]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const initIsSaveButtonDisabled: boolean = getInitIsSaveButtonDisabled(params!);
        setSaveButtonDisabled(initIsSaveButtonDisabled);
    }, [isOpen, params]);

    useEffect(() => {
        if (!isOpen || params!.modalType !== ModalType.Form) {
            return;
        }

        setFormData(
            new Map(
                params!.formData!.fields.map(x => [x.name, x.value])
            )
        );

    }, [isOpen, params]);

    const onCloseClick = useCallback(() => closeModal({ closeCode: "cancel" }, params!.callback), [closeModal, params]);

    const onSaveClick = useCallback(() => {
        if (isSaveButtonDisabled) {
            return;
        }

        const closeConfig: ModalCloseData = { closeCode: "save" };

        if (params!.modalType === ModalType.Form) {
            closeConfig.formData = {
                fields: Array.from(formData.entries()).map(([name, value]) => ({ name, value }))
            };
        }

        closeModal(closeConfig, params!.callback);
    }, [closeModal, formData, isSaveButtonDisabled, params]);

    if (!isOpen) {
        return <></>;
    }

    const parametersValues = params!;

    const { saveBtnCaption, cancelBtnCaption } = getButtonCaptions(parametersValues);

    const actions: Array<ButtonProps> = [
        !isSaveButtonVisible
            ? undefined
            : {
                type: "success",
                caption: saveBtnCaption,
                onClick: onSaveClick,
                disabled: isSaveButtonDisabled,
            } as ButtonProps,
        {
            type: "default",
            caption: cancelBtnCaption,
            onClick: onCloseClick,
        } as ButtonProps
    ]
        .filter(x => !isNullish(x))
        .map(x => x as ButtonProps);

    return (
        <ModalWrapper
            title={parametersValues.title}
            onCloseClick={onCloseClick}
            actions={actions}
        >
            <ModalBody
                {...parametersValues}
                setSaveButtonDisabled={setSaveButtonDisabled}
                formValues={formData}
                updateFormValues={setFormData}
            />
        </ModalWrapper>
    );
};

/**
 * Modal window component
 * @throws Modal params is invalid
 */
export default connect(
    ({ modal }: CompositeAppState) => ({
        isOpen: modal.isOpen && handledTypes.includes(modal.modalParams?.modalType ?? ModalType.Custom),
        params: modal.modalParams
    }),
    { closeModal: closeModal }
)(ModalBox);
