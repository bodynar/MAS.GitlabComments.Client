import { Comment } from "@app/models";

import { ActionWithPayload } from "@app/redux";
import { SET_COMMENTS } from "@app/redux/comments";

/**
 * Get redux action "Set comments"
 * @param comments Loaded comments
 * @returns State updating action
 */
export const getSetCommentsAction = (comments: Array<Comment>): ActionWithPayload => {
    return ({
        type: SET_COMMENTS,
        payload: { comments },
    });
};

