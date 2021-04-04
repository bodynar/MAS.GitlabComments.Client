import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { ModalAction, ModalState, ModalType } from "./types";

export const OpenModal = "modal/open";
export const CloseModal = "modal/close";

export const openModal = (modalType: ModalType, modalData: Record<string, unknown>): ThunkAction<void, ModalState, unknown, ModalAction> =>
    (dispatch: ThunkDispatch<ModalState, unknown, ModalAction>): void => {
        dispatch({
            type: OpenModal,
            modalType: modalType,
            payload: { ...modalData },
        });
    };

export const closeModal = (reason?: string): ThunkAction<void, ModalState, unknown, ModalAction> =>
    (dispatch: ThunkDispatch<ModalState, unknown, ModalAction>): void => {
        dispatch({
            type: CloseModal,
            payload: {
                reason: reason
            }
        });
    };
