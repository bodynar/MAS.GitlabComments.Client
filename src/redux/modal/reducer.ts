import { createReducer } from "@reduxjs/toolkit";

import { ModalState, close, open } from "@app/redux/modal";

/** Initial state of modal module */
const initialState: ModalState = {
    isOpen: false
};

/** Modal box module reducer */
export const reducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(close, (state) => {
                state.isOpen = false;
            })
            .addCase(open, (state, { payload }) => {
                state.isOpen = true;
                state.modalParams = { ...payload };
            })
            ;
    }
);
