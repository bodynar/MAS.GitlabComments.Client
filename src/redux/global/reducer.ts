import { ActionWithPayload } from "@app/redux/types";
import { getPropertyValueWithCheck } from "@app/utils/object";

import { setReadOnlyModeValue } from "./actions";
import { GlobalAppState } from "./types";

/** Initial global app state */
const initialState: GlobalAppState = {
    
};

/** Global app reducer function */
export default function (state = initialState, action: ActionWithPayload): GlobalAppState {
    switch (action.type) {
        case setReadOnlyModeValue: {
            const readOnlyMode: boolean = getPropertyValueWithCheck(action.payload, 'readOnlyMode', false) || false;

            return {
                ...state,
                readOnlyMode: readOnlyMode
            };
        }
        default:
            return state;
    }
}
