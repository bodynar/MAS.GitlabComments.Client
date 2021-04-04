import { BaseResponseWithResult } from "models/response/baseResponse";

import { isNullOrUndefined } from "./common";

type RequestData = {
    // TODO: fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [propertyName: string]: any;
};

/**
 * Send data to api to process
 * @param uri Api endpoint address
 * @param requestData Request data
 * @returns {Promise<TResult>} Promise with api processing result
 */
export const post = async <TResult>(uri: string, requestData: RequestData): Promise<TResult> => {
    const response: Response = await fetch(uri, {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(requestData)
    });

    if (response.ok) {
        const baseResponse: BaseResponseWithResult<TResult> = await response.json();

        if (baseResponse.success) {
            return Promise.resolve(baseResponse.result);
        } else {
            return Promise.reject(baseResponse.erorr);
        }
    } else {
        return Promise.reject(response.statusText);
    }
};

/**
 * Gather data from specified api
 * @param uri Api endpoint address
 * @param requestData Request data
 * @returns {Promise<TResult>} Promise with api get result
 */
export const get = async <TResult>(uri: string, requestData?: RequestData): Promise<TResult> => {
    const requestParams: RequestInit = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    };

    if (!isNullOrUndefined(requestData)) {
        requestParams.body = JSON.stringify(requestData);
    }

    const response: Response = await fetch(uri, requestParams);

    if (response.ok) {
        const baseResponse: BaseResponseWithResult<TResult> = await response.json();
        if (baseResponse.success) {
            return Promise.resolve(baseResponse.result);
        } else {
            return Promise.reject(new Error(baseResponse.erorr));
        }
    } else {
        return Promise.reject(response.statusText);
    }
};
