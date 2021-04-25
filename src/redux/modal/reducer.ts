import { isNullOrUndefined } from "utils/common";

import { ModalAction, ModalState } from "./types";
import { OpenModal, CloseModal } from './actions';

/** Initial state of modal module */
const initialState: ModalState = {
    isOpen: false,
    modalParams: {
        modalType: 'info',
        title: 'Modal title'
    }
};

/** Modal box module reducer function */
export default function (state = initialState, action: ModalAction): ModalState {
    switch (action.type) {
        case OpenModal: {
            if (isNullOrUndefined(action.params)) {
                // TODO: v2 log warning
                return state;
            }

            return {
                ...state,
                isOpen: true,
                modalParams: action.params
            };
        }
        case CloseModal: {
            return {
                ...state,
                isOpen: false
            };
        }
        default:
            return state;
    }
}
