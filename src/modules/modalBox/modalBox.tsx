import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import { isNullOrUndefined } from "utils/common";

import { AppState } from "redux/rootReducer";
import { closeModal } from "redux/modal/actions";
import { ModalCallback, ModalData, ModalParams } from "redux/modal/types";

import Button from "sharedComponents/button/button";

import { getButtonCaptions, getInitIsSaveButtonDisabled, validateModalParams } from "./utils";

import { ModalForm, ModalFormConfiguration } from "./modalForm";

type ModalBoxProps = {
    /** Is modal currently shown */
    isOpen: boolean;

    /** Modal window configuration */
    params: ModalParams;

    /** Close modal handler */
    closeModal: (closeModalData: ModalData, modalCallback?: ModalCallback) => void;
};

function ModalBox({ isOpen, params, closeModal }: ModalBoxProps): JSX.Element {
    const validationError =
        isOpen
            ? validateModalParams(params)
            : undefined;

    if (!isNullOrUndefined(validationError)) {
        throw new Error(validationError);
    }

    const [isSaveButtonDisabled, setSaveButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            const initIsSaveButtonDisabled: boolean = getInitIsSaveButtonDisabled(params);
            setSaveButtonDisabled(initIsSaveButtonDisabled);
        }
    }, [isOpen, params]);

    const onCloseClick = useCallback(() => {
        closeModal({ closeCode: 'cancel' }, params.callback);
    }, [closeModal, params]);

    const onSaveClick = useCallback(() => {
        if (!isSaveButtonDisabled) {
            const closeConfig: ModalData = {
                closeCode: 'save'
            };

            if (params.modalType === 'form') {
                const modalFormData: ModalFormConfiguration =
                    params.formData as ModalFormConfiguration;

                closeConfig.formData = {
                    fields: modalFormData.fields.map(x => ({ name: x.name, value: x.value }))
                };
            }

            closeModal(closeConfig, params.callback);
        }
    }, [closeModal, isSaveButtonDisabled, params]);

    useEffect(() => {
        const htmlElement: HTMLElement | null =
            document.body.parentElement;

        if (!isNullOrUndefined(htmlElement)) {
            if (isOpen) {
                htmlElement?.classList.add('is-clipped');
            } else {
                htmlElement?.classList.remove('is-clipped');
            }
        }
    }, [isOpen]);

    if (!isOpen) {
        return <></>;
    }

    const classNames: string =
        'modal' + (isOpen ? ' is-active' : '');

    const { saveBtnCaption, cancelBtnCaption } = getButtonCaptions(params);

    return (
        <div className={classNames}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{params.title}</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onCloseClick}
                    ></button>
                </header>
                <section className="modal-card-body">
                    {params.modalType === 'form'
                        ? <ModalForm
                            formConfig={params.formData as ModalFormConfiguration}
                            setSaveButtonDisabled={setSaveButtonDisabled}
                        />
                        : <p>{params.message}</p>}
                </section>
                <footer className="modal-card-foot">
                    {params.modalType !== 'info'
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
}


export default connect(
    ({ modal }: AppState) => ({
        isOpen: modal.isOpen,
        params: modal.modalParams as ModalParams
    }),
    {
        closeModal: closeModal
    }
)(ModalBox);
