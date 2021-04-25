import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrUndefined } from "@app/utils/common";

import { ModalAction, ModalCloseData, ModalCallback, ModalState, ModalType } from "./types";

/** Open modal redux store action type */
export const OpenModal = "modal/open";

/** Close modal redux store action type */
export const CloseModal = "modal/close";

/**
 * Open modal via redux dispatched action
 * @param modalType Modal type
 * @param modalData Modal params
 * @returns Redux action which can be called via dispatch to open modal
 */
export const openModal = (modalType: ModalType, modalData: Record<string, unknown>): ThunkAction<void, ModalState, unknown, ModalAction> =>
    (dispatch: ThunkDispatch<ModalState, unknown, ModalAction>): void => {
        dispatch({
            type: OpenModal,
            modalType: modalType,
            payload: { ...modalData },
        });
    };

/**
 * Close modal via redux dispatched action
 * @param closeModalData Close modal action params
 * @param modalCallback Modal callbacks from modal configuration
 * @returns Redux action which can be called via dispatch to close modal
 */
export const closeModal = (closeModalData: ModalCloseData, modalCallback?: ModalCallback): ThunkAction<void, ModalState, unknown, ModalAction> =>
    (dispatch: ThunkDispatch<ModalState, unknown, ModalAction>): void => {
        dispatch({
            type: CloseModal,
        });

        if (!isNullOrUndefined(modalCallback)) {
            if (closeModalData.closeCode === 'cancel' && !isNullOrUndefined(modalCallback?.cancelCallback)) {
                const customCallback: (modalData: ModalCloseData) => void =
                    modalCallback?.cancelCallback as (modalData: ModalCloseData) => void;

                customCallback(closeModalData);
            }
            else if (closeModalData.closeCode === 'save' && !isNullOrUndefined(modalCallback?.saveCallback)) {
                const customCallback: (modalData: ModalCloseData) => void =
                    modalCallback?.saveCallback as (modalData: ModalCloseData) => void;

                customCallback(closeModalData);
            }
        }
    };
