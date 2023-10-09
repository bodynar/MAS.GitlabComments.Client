import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrUndefined } from "@bodynarf/utils";

import { EditCommentModel } from "@app/models/comments";
import { ModalFormItem, ModalFormItemType } from "@app/models/modal";

import { CompositeAppState } from "@app/redux";

import { ModalCallback, ModalCloseData, ModalParams, ModalType } from "@app/models/modal";
import { setIsLoadingState } from "@app/redux/app";

/**
 * Get comment form configuration for form in modal box
 * @param commentShortModel Comment data model, optional
 * @returns Modal params configuration for modal with comment form
 */
export const getCommentModalFormConfig = (commentShortModel?: EditCommentModel): ModalParams => {
    const isCommentModelDefined =
        !isNullOrUndefined(commentShortModel);

    const modalFields: Array<ModalFormItem> =
        [
            {
                name: "Comment",
                type: ModalFormItemType.Text,
                caption: "Comment",
                isRequired: true,
                value: isCommentModelDefined ? commentShortModel?.message as string : ""
            },
            {
                name: "Description",
                type: ModalFormItemType.Multiline,
                caption: "Description",
                value: isCommentModelDefined ? commentShortModel?.description as string : ""
            },
        ];

    const modalParams: ModalParams = {
        modalType: ModalType.Form,
        title: isCommentModelDefined ? "Update comment" : "Add comment",
        formData: { fields: modalFields },
    };

    return modalParams;
};

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
            dispatch(setIsLoadingState(false));

            const message: string | undefined = modalData.formData?.fields.find(x => x.name === "Comment")?.value;

            if (isNullOrUndefined(message)) {
                throw new Error("Comment message is empty after modal form with required flag");
            }

            const comment: EditCommentModel = {
                message: message as string,
                description: modalData.formData?.fields.find(x => x.name === "Description")?.value
            };

            dispatch(action(comment));
        },
        cancelCallback: (): void => {
            dispatch(setIsLoadingState(false));
        },
    };
};
