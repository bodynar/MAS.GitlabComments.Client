import { ActionWithPayload } from "@app/redux";
import { INCREMENT } from "@app/redux/comments";

/**
 * Get redux action "Increment comment"s appearance count"
 * @param commentId Identifier of comment
 * @returns State updating action
 */
export const getIncrementAction = (commentId: string): ActionWithPayload => {
    return ({
        type: INCREMENT,
        payload: { commentId },
    });
};

