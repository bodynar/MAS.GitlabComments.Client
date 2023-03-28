import { ActionWithPayload } from "@app/redux";

import { DeleteComment } from "../actions";

/**
 * Get redux action "Delete specified comment"
 * @param commentId Identifier of deleted comment
 * @returns State updating action
 */
export const getDeleteCommentAction = (commentId: string): ActionWithPayload => {
    return ({
        type: DeleteComment,
        payload: { commentId }
    });
};

