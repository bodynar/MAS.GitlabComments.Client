import { BaseCommentModel, Comment } from "@app/models";

import { ActionWithPayload } from "@app/redux/types";

import { UpdateComment } from "../actions";

/**
 * Get redux action "Update specified comment"
 * @param comment New comment values
 * @param commentId Identifier of updated comment
 * @returns State updating action
 */
export const getUpdateCommentAction = (comment: BaseCommentModel, commentId: string): ActionWithPayload => {
    return ({
        type: UpdateComment,
        payload: {
            comment: { ...comment, id: commentId } as Comment
        }
    });
};

