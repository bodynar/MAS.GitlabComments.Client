import moment from "moment";

import { isNullOrUndefined, isStringEmpty, delayResolve, delayReject, RequestData, safeFetch } from "@bodynarf/utils";

import { LoadingStateHideDelay } from "@app/constants";
import { BaseResponseWithResult } from "@app/models/response/baseResponse";

/**
 * Send data to api to process
 * @param uri Api endpoint address
 * @param requestData Request data
 * @returns {Promise<TResult>} Promise with api processing result
 */
export const post = async <TResult>(uri: string, requestData: RequestData): Promise<TResult> => {
    const requestParams: RequestInit = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(requestData)
    };

    return fetchWithDelay<TResult>(uri, requestParams);
};

/**
 * Gather data from specified api
 * @param uri Api endpoint address
 * @param requestData Request data
 * @returns {Promise<TResult>} Promise with api get result
 */
export const get = async <TResult>(uri: string, requestData?: RequestData): Promise<TResult> => {
    const requestParams: RequestInit = {
        method: "GET",
        headers: {
            "content-type": "application/json",
        }
    };

    if (!isNullOrUndefined(requestData)) {
        requestParams.body = JSON.stringify(requestData);
    }

    return fetchWithDelay<TResult>(uri, requestParams);
};

/**
 * Fetch data from specific endpoint with delay if needed
 * @param uri Api endpoint address
 * @param requestParams Request data
 * @returns {Promise<TResult>} Promise with api get result
 */
const fetchWithDelay = async<TResult>(uri: string, requestParams: RequestInit): Promise<TResult> => {
    const start = moment();

    return safeFetch(uri, requestParams)
        .then((textResponse: string) => {
            if (isStringEmpty(textResponse)) {
                return new Promise<TResult>((_, r) => r("No data loaded"));
            }

            try {
                const result: BaseResponseWithResult<TResult> = JSON.parse(textResponse);
                return result.success
                    ? result.result
                    : new Promise<TResult>((_, r) => r(result.erorr));
            } catch (error) {
                console.error(`Error occured during fetching "${uri}": [${error}]. Textual response: ${textResponse}`);
                return new Promise<TResult>((_, r) => r("Invalid server response. Please, contact administrator."));
            }
        })
        .then((result: TResult) => {
            const end = moment();

            const duration = moment.duration(end.diff(start)).asSeconds();

            return duration > LoadingStateHideDelay
                ? new Promise<TResult>(resolve => resolve(result))
                : delayResolve<TResult>(Math.abs(LoadingStateHideDelay - duration), result);
        })
        .catch(error => {
            const end = moment();

            const duration = moment.duration(end.diff(start)).asSeconds();

            if (duration > LoadingStateHideDelay) {
                throw error;
            } else {
                return delayReject(Math.abs(LoadingStateHideDelay - duration), error);
            }
        });
};
