
import { ActionWithPayload } from "@app/redux";

import { Increment } from "../actions";

/**
 * Get redux action "Increment comment"s appearance count"
 * @param commentId Identifier of comment
 * @returns State updating action
 */
export const getIncrementAction = (commentId: string): ActionWithPayload => {
    return ({
        type: Increment,
        payload: { commentId },
    });
};

