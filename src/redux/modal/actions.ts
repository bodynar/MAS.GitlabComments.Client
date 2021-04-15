import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { isNullOrUndefined } from "utils/common";

import { ModalAction, ModalData, ModalCallback, ModalState, ModalType } from "./types";

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

export const closeModal = (closeModalData: ModalData, modalCallback?: ModalCallback): ThunkAction<void, ModalState, unknown, ModalAction> =>
    (dispatch: ThunkDispatch<ModalState, unknown, ModalAction>): void => {
        dispatch({
            type: CloseModal,
        });

        if (!isNullOrUndefined(modalCallback)) {
            if (closeModalData.closeCode === 'cancel' && !isNullOrUndefined(modalCallback?.cancelCallback)) {
                const customCallback: (modalData: ModalData) => void =
                    modalCallback?.cancelCallback as (modalData: ModalData) => void;

                customCallback(closeModalData);
            }
            else if (closeModalData.closeCode === 'save' && !isNullOrUndefined(modalCallback?.saveCallback)) {
                const customCallback: (modalData: ModalData) => void =
                    modalCallback?.saveCallback as (modalData: ModalData) => void;

                customCallback(closeModalData);
            }
        }
    };
