import { Comment } from "@app/models/comment";

import { ActionWithPayload } from "@app/redux";

import { SetComments } from "../actions";

/**
 * Get redux action "Set comments"
 * @param comments Loaded comments
 * @returns State updating action
 */
export const getSetCommentsAction = (comments: Array<Comment>): ActionWithPayload => {
    return ({
        type: SetComments,
        payload: { comments },
    });
};

