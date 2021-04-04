import { ModalAction, ModalState } from "./types";
import { OpenModal, CloseModal } from './actions';

const initialState: ModalState = {
    isOpen: false
};

export default function (state = initialState, action: ModalAction): ModalState {
    switch (action.type) {
        case OpenModal: {
            return {
                ...state,
                isOpen: true,
                modalType: action.modalType
            };
        }
        case CloseModal: {
            return {
                isOpen: false
            };
        }
        default:
            return state;
    }
}
