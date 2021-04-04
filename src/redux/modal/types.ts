import { Action } from "redux/types";

/** Type of displaying modal */
export type ModalType = 
    'info' /** Display some textual information */
    | 'form' /** Display some form to fill */
    | 'confirm' /** Display modal with confirm message and 2 optional buttons */
;

export type ModalState = {
    isOpen: boolean;
    modalType?: ModalType;
};

export type ModalAction = Action & {
    modalType?: ModalType;
};
