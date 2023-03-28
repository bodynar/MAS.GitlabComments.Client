import { BaseCommentModel, Comment } from "@app/models";

import { ActionWithPayload } from "@app/redux";

import { AddComment } from "../actions";

/**
 * Get redux action "Add new comment"
 * @param comment New comment values
 * @param commentId Identifier of new comment
 * @returns State updating action
 */
export const getAddCommentAction = (comment: BaseCommentModel, commentId: string): ActionWithPayload => {
    return ({
        type: AddComment,
        payload: {
            comment: {
                ...comment,
                appearanceCount: 1,
                id: commentId,
            } as Comment
        }
    });
};

