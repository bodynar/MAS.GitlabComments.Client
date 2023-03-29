import { ActionWithPayload } from "@app/redux";

import { SET_SEARCH_QUERY } from "@app/redux/comments";

/**
 * Create setting search query value state update action
 * @param searchQuery Search text typed by user
 * @returns State updating action
 */
export const getSetSearchQueryAction = (searchQuery: string): ActionWithPayload => {
    return ({
        type: SET_SEARCH_QUERY,
        payload: { searchQuery }
    });
};

