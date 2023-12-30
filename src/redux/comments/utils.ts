import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrUndefined } from "@bodynarf/utils";

import { EditCommentModel } from "@app/models/comments";

import { CompositeAppState } from "@app/redux";

import { ModalCallback, ModalCloseData } from "@app/models/modal";

/**
 * Get modal callback configuration with custom callback
 * @param dispatch Redux store dispatcher
 * @param action Custom handler for modal save action
 * @returns Modal callback configuration
 */
export const getCommentModalFormCallbackConfig = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
    action: (updateComment: EditCommentModel) => ThunkAction<void, CompositeAppState, unknown, Action>
): ModalCallback => {
    return {
        saveCallback: (modalData: ModalCloseData): void => {
            const message: string | undefined = modalData.formData?.fields.find(x => x.name === "message")?.value;

            if (isNullOrUndefined(message)) {
                throw new Error("Comment message is empty after modal form with required flag");
            }

            const comment: EditCommentModel = {
                message: message as string,
                description: modalData.formData?.fields.find(x => x.name === "description")?.value,
                commentWithLinkToRule: modalData.formData?.fields.find(x => x.name === "commentWithLinkToRule")?.value!,
            };

            dispatch(action(comment));
        },
    };
};
