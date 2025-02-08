import moment from "moment";

import { delayResolve, delayReject } from "@bodynarf/utils";
import { postAsync, getAsync } from "@bodynarf/utils/api/simple";

import { LOADING_STATE_HIDE_DELAY, REQUEST_TIMEOUT } from "@app/constants";
import { BaseResponseWithResult } from "@app/models";

/**
 * Send data to api to process
 * @param uri Api endpoint address
 * @param requestData Request data
 * @returns {Promise<TResult>} Promise with api processing result
 */
export const post = async <TResult>(uri: string, requestData: any = {}): Promise<TResult> => {
    return fetchWithDelay(() =>
        postAsync<TResult>(
            uri,
            requestData as Record<string, unknown>,
            {
                timeout: REQUEST_TIMEOUT
            },
        )
    );
};

/**
 * Gather data from specified api
 * @param uri Api endpoint address
 * @param requestData Request data
 * @returns {Promise<TResult>} Promise with api get result
 */
export const get = async <TResult>(uri: string): Promise<TResult> => {
    return fetchWithDelay(() =>
        getAsync<TResult>(
            uri,
            {
                timeout: REQUEST_TIMEOUT
            },
        )
    );
};

/**
 * Fetch data from specific endpoint with delay if needed
 * @param action API call
 * @returns Promise with api get result
 */
const fetchWithDelay = async<TResult>(
    action: () => Promise<TResult>
): Promise<TResult> => {
    const start = moment();

    return action()
        .then((result: TResult) => {
            const end = moment();

            const baseResponse = result as BaseResponseWithResult<TResult>;

            if (!baseResponse.success) {
                throw new Error(baseResponse.error);
            }

            const duration = moment.duration(end.diff(start)).asSeconds();

            return duration > LOADING_STATE_HIDE_DELAY
                ? new Promise<TResult>(resolve => resolve(baseResponse.result))
                : delayResolve<TResult>(Math.abs(LOADING_STATE_HIDE_DELAY - duration), baseResponse.result);
        })
        .catch(error => {
            const end = moment();

            const duration = moment.duration(end.diff(start)).asSeconds();

            if (duration > LOADING_STATE_HIDE_DELAY) {
                throw error;
            } else {
                return delayReject(Math.abs(LOADING_STATE_HIDE_DELAY - duration), error);
            }
        });
};
