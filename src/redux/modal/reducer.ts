import { createReducer } from "@reduxjs/toolkit";

import { ModalState, close, open } from "@app/redux/modal";
import { ModalParams } from "@app/models/modal";

/** Initial state of modal module */
const initialState: ModalState = {
    isOpen: false,
};

/** Modal box module reducer */
export const reducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(close, (state) => {
                state.isOpen = false;

                state.customModalKey = undefined;
                state.modalParams = undefined;
            })
            .addCase(open, (state, { payload }) => {
                state.isOpen = true;

                if (typeof (payload) === "string") {
                    state.customModalKey = payload as string;
                } else {
                    state.modalParams = { ...payload as ModalParams };
                }
            })
            ;
    }
);
