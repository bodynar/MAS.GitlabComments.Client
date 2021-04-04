import React from "react";
import { connect } from "react-redux";

import { AppState } from "redux/rootReducer";

import { closeModal } from "redux/modal/actions";

type ModalBoxProps = {
    isOpen: boolean;
    closeModal: (reason?: string) => void;
};

function ModalBox(props: ModalBoxProps): JSX.Element {
    const classNames: string =
        'modal' + (props.isOpen ? ' is-active' : '');

    const onCloseClick = React.useCallback(() => {
        props.closeModal("CLOSE CLICK");
    }, [props]);

    return (
        <div className={classNames}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Modal title</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onCloseClick}
                    ></button>
                </header>
                <section className="modal-card-body">
                    Some content
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button" onClick={onCloseClick}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export default connect(
    ({ modal }: AppState) => ({ ...modal }),
    {
        closeModal: closeModal
    }
)(ModalBox);
