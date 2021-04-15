import { ModalAction, ModalState } from "./types";
import { OpenModal, CloseModal } from './actions';

import { isNullOrUndefined } from "utils/common";

const initialState: ModalState = {
    isOpen: false,
    modalParams: {
        modalType: 'info',
        title: 'Modal title'
    }
};

export default function (state = initialState, action: ModalAction): ModalState {
    switch (action.type) {
        case OpenModal: {
            if (isNullOrUndefined(action.params)) {
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
