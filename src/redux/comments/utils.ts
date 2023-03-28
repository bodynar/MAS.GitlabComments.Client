import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrUndefined } from "@bodynarf/utils/common";

import { ActionWithPayload } from "@app/redux/types";

import { BaseCommentModel } from "@app/models/comment";

import { ModalCallback, ModalCloseData, ModalParams } from "@app/redux/modal/types";

import { ModalFormItem } from "@app/modules/modalBox/components/modalForm";

import { CompositeAppState } from "../rootReducer";
import { getSetAppIsLoadingAction } from "../app/actions/setAppIsLoading";

/**
 * Get comment form configuration for form in modal box
 * @param commentShortModel Comment data model, optional
 * @returns Modal params configuration for modal with comment forn
 */
export const getCommentModalFormConfig = (commentShortModel?: BaseCommentModel): ModalParams => {
    const isCommentModelDefined =
        !isNullOrUndefined(commentShortModel);

    const modalFields: Array<ModalFormItem> =
        [
            {
                name: "Comment",
                type: "text",
                caption: "Comment",
                isRequired: true,
                value: isCommentModelDefined ? commentShortModel?.message as string : undefined
            },
            {
                name: "Description",
                type: "multiline",
                caption: "Description",
                value: isCommentModelDefined ? commentShortModel?.description as string : undefined
            },
        ];

    const modalParams: ModalParams = {
        modalType: "form",
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
    dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
    action: (updateComment: BaseCommentModel) => ThunkAction<void, CompositeAppState, unknown, ActionWithPayload>
): ModalCallback => {
    return {
        saveCallback: (modalData: ModalCloseData): void => {
            dispatch(getSetAppIsLoadingAction(false));

            const message: string | undefined = modalData.formData?.fields.find(x => x.name === "Comment")?.value;

            if (isNullOrUndefined(message)) {
                throw new Error("Comment message is empty after modal form with required flag");
            }

            const comment: BaseCommentModel = {
                message: message as string,
                description: modalData.formData?.fields.find(x => x.name === "Description")?.value
            };

            dispatch(action(comment));
        },
        cancelCallback: (): void => {
            dispatch(getSetAppIsLoadingAction(false));
        },
    };
};
