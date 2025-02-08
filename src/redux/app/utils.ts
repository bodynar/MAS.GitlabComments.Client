import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";

import { generateGuid } from "@bodynarf/utils";

import { CompositeAppState } from "@app/redux";
import { appendRequest, removeRequest } from "@app/redux/app";

/**
 * Register http request to display loading state during operation
 * @param dispatch Redux store dispatcher
 * @returns Pair from [Http request assigned identifier; Function that removes request from http requests list]
 */
export const registerHttpRequest = (
    dispatch: ThunkDispatch<CompositeAppState, unknown, Action>
): [string, () => void] => {
    const requestId = generateGuid();

    dispatch(
        appendRequest({
            id: requestId,
        })
    );

    return [
        requestId,
        () => dispatch(removeRequest(requestId))
    ];
};
