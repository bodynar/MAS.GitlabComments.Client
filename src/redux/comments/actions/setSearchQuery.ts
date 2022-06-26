import { ActionWithPayload } from "@app/redux/types";

import { SetSearchQuery } from "../actions";

/**
 * Create setting search query value state update action
 * @param searchQuery Search text typed by user
 * @returns State updating action
 */
export const getSetSearchQueryAction = (searchQuery: string): ActionWithPayload => {
    return ({
        type: SetSearchQuery,
        payload: { searchQuery }
    });
};

