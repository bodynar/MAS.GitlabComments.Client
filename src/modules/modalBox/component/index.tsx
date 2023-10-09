import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import { isNullOrUndefined } from "@bodynarf/utils";
import Button from "@bodynarf/react.components/components/button";

import "./style.scss";
import "./style.dark.scss";

import { ModalCallback, ModalCloseData, ModalParams, ModalType } from "@app/models/modal";

import { CompositeAppState } from "@app/redux";
import { closeModal } from "@app/redux/modal";

import { getButtonCaptions, getInitIsSaveButtonDisabled, validateModalParams } from "../utils";
import ModalBody from "../components/body";

interface ModalBoxProps {
    /** Is modal currently shown */
    isOpen: boolean;

    /** Modal window configuration */
    params?: ModalParams;

    /** Close modal handler */
    closeModal: (closeModalData: ModalCloseData, modalCallback?: ModalCallback) => void;
}

/** 
 * Modal window component
 * @throws Modal params is invalid
 */
const ModalBox = ({
    isOpen, params,
    closeModal
}: ModalBoxProps): JSX.Element => {
    const validationError =
        isOpen && !isNullOrUndefined(params)
            ? validateModalParams(params!)
            : undefined;

    if (!isNullOrUndefined(validationError)) {
        throw new Error(`Modal configuration error: ${validationError}`);
    }

    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);
    const [formData, setFormData] = useState<Map<string, string | undefined>>(new Map());

    useEffect(() => {
        if (isOpen) {
            const initIsSaveButtonDisabled: boolean = getInitIsSaveButtonDisabled(params!);
            setSaveButtonDisabled(initIsSaveButtonDisabled);
        }
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

    const { saveBtnCaption, cancelBtnCaption } = getButtonCaptions(params!);

    return (
        <div className="app-modal modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{params!.title}</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onCloseClick}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <ModalBody
                        {...params!}
                        setSaveButtonDisabled={setSaveButtonDisabled}
                        formValues={formData}
                        updateFormValues={setFormData}
                    />
                </section>
                <footer className="modal-card-foot">
                    {params!.modalType !== ModalType.Info
                        &&
                        <Button
                            key="modal-success-btn"
                            type="success"
                            caption={saveBtnCaption}
                            onClick={onSaveClick}
                            disabled={isSaveButtonDisabled}
                        />
                    }
                    <Button
                        type="default"
                        caption={cancelBtnCaption}
                        onClick={onCloseClick}
                    />
                </footer>
            </div>
        </div>
    );
};

/** 
 * Modal window component
 * @throws Modal params is invalid
 */
export default connect(
    ({ modal }: CompositeAppState) => ({
        isOpen: modal.isOpen,
        params: modal.modalParams
    }),
    { closeModal: closeModal }
)(ModalBox);
