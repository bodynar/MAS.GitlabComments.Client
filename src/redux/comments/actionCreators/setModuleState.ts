import { ActionWithPayload } from "@app/redux";

import { CommentModuleState, SET_MODULE_STATE } from "@app/redux/comments";

/**
 * Get redux action "Set comments module next state"
 * @param nextState Next comments module state
 * @returns State updating action
 */
export const getSetModuleStateAction = (nextState: CommentModuleState): ActionWithPayload => {
    return ({
        type: SET_MODULE_STATE,
        payload: { nextState }
    });
};

