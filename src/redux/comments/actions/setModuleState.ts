import { ActionWithPayload } from "@app/redux/types";

import { SetModuleState } from "../actions";
import { CommentModuleState } from "../types";

/**
 * Get redux action "Set comments module next state"
 * @param nextState Next comments module state
 * @returns State updating action
 */
export const getSetModuleStateAction = (nextState: CommentModuleState): ActionWithPayload => {
    return ({
        type: SetModuleState,
        payload: { nextState }
    });
};

