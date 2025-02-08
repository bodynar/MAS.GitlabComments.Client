import { FC, ReactNode } from "react";

import Button, { ButtonProps } from "@bodynarf/react.components/components/button";

import "./style.scss";
import "./style.dark.scss";

/** Props type of `ModalWrapper` */
type ModalWrapperProps = {
    /** Window title */
    title: string;

    /** Action in window footer */
    actions: Array<ButtonProps>;

    /** Close by cross in top-right handler */
    onCloseClick: () => void;

    /** Wrapped body */
    children: ReactNode;
};

/** Wrapper for content which should be presented in modal window */
const ModalWrapper: FC<ModalWrapperProps> = ({
    title,
    children,
    actions, onCloseClick,
}) => {
    return (
        <div className="app-modal modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">
                        {title}
                    </p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onCloseClick}
                    ></button>
                </header>
                <section className="modal-card-body">
                    {children}
                </section>
                <footer className="modal-card-foot">
                    {actions.map((config, index) =>
                        <Button
                            key={`modal-action-${index}`}
                            {...config}
                        />
                    )}
                </footer>
            </div>
        </div>
    );
};

export default ModalWrapper;
