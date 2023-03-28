import { ActionWithPayload } from "@app/redux";
import { DELETE_COMMENT } from "@app/redux/comments";

/**
 * Get redux action "Delete specified comment"
 * @param commentId Identifier of deleted comment
 * @returns State updating action
 */
export const getDeleteCommentAction = (commentId: string): ActionWithPayload => {
    return ({
        type: DELETE_COMMENT,
        payload: { commentId }
    });
};

