import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { Comment } from "@app/models/comments";
import { getAllComments, merge } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { getNotifications } from "@app/redux/notificator";
import { setIsLoadingState } from "@app/redux/app";
import { setComments, setModuleState } from "@app/redux/comments";

/**
 * Merge two comments
 * @param sourceId Identifier of source comment
 * @param targetId Identifier of target comment
 * @param valuesToUpdate Map with updated values
 * @returns Redux thunk
 */
export const mergeAsync = (sourceId: string, targetId: string, valuesToUpdate: Map<keyof Comment, string>): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        dispatch(setIsLoadingState(true));

        const [showSuccess, showError] = getNotifications(dispatch);

        try {
            await merge(sourceId, targetId, valuesToUpdate);
            const comments = await getAllComments();
            dispatch(setComments(comments));
        } catch (error) {
            showError(error as Error ?? error as string, true, false);
        }

        showSuccess("Comments were merged successfully", false, true);
        dispatch(setModuleState("idle"));
    };
