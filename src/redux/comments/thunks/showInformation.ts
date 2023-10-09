import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { open } from "@app/redux/modal";
import { ModalType } from "@app/models/modal";

/**
 * Get all comments from api
 * @returns Get all comments function that can be called with redux dispatcher
 */
export const showInformationAsync = (commentId: string): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (
        dispatch: ThunkDispatch<CompositeAppState, unknown, Action>,
        getState: () => CompositeAppState,
    ): void => {
        const comment = getState().comments.comments.find(({ id }) => id === commentId);

        const [, error] = getNotifications(dispatch);

        if (isNullOrUndefined(comment)) {
            error("Comment data not found. Refresh current page and try again.", true, true);
            return;
        }

        const modalMessage: string = isNullOrEmpty(comment!.description)
            ? 'Comment does not have any description.'
            : comment!.description!;
// TODO: redo
        dispatch(
            open({
                modalType: ModalType.Info,
                title: 'Comment description',
                message: modalMessage,
            })
        );
    };
