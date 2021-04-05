import React from "react";
import { connect } from "react-redux";

import { isNullOrUndefined } from "utils/common";

import { AppState } from "redux/rootReducer";
import { closeModal } from "redux/modal/actions";
import { ModalCallback, ModalData, ModalParams } from "redux/modal/types";

import Button from "components/button/button";

import { getButtonCaptions } from "./utils";

type ModalBoxProps = {
    /** Is modal currently shown */
    isOpen: boolean;

    /** Modal window configuration */
    params: ModalParams;

    /** Close modal handler */
    closeModal: (closeModalData: ModalData, modalCallback?: ModalCallback) => void;
};

function ModalBox({ isOpen, params, closeModal }: ModalBoxProps): JSX.Element {
    const classNames: string =
        'modal' + (isOpen ? ' is-active' : '');

    const onCloseClick = React.useCallback(() => {
        closeModal({ closeCode: 'cancel', }, params.callback);
    }, [closeModal, params]);

    const onSaveClick = React.useCallback(() => {
        closeModal({ closeCode: 'save' }, params.callback);
    }, [closeModal, params]);

    React.useEffect(() => {
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
                    {params.message}
                </section>
                <footer className="modal-card-foot">
                    <Button
                        caption={saveBtnCaption}
                        type="success"
                        onClick={onSaveClick}
                        key="modal-success-btn"
                    />
                    <Button
                        caption={cancelBtnCaption}
                        type="default"
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
