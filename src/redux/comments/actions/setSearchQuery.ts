import { ActionWithPayload } from "@app/redux/types";

import { setSearchQuery as setSearchQueryAction } from "../actions";

/**
 * Create setting search query value state update action
 * @param searchQuery Search text typed by user
 * @returns State updating action
 */
export const setSearchQuery = (searchQuery: string): ActionWithPayload => {
    return ({
        type: setSearchQueryAction,
        payload: { searchQuery }
    });
};
