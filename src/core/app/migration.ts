import { fetchAsync } from "@bodynarf/utils/api/simple";

import { REQUEST_TIMEOUT } from "@app/constants";
import { BaseResponse } from "@app/models/baseResponse";

/**
 * Import app data from json file
 * @param {File} file File with data
 */
export const importAppData = async (file: File): Promise<BaseResponse> => {
    const formdata = new FormData();
    formdata.append("file", file);

    const requestOptions = {
        method: "POST",
        body: formdata,
    };

    return await fetchAsync<BaseResponse>(
        `/api/app/importData`,
        requestOptions,
        { timeout: REQUEST_TIMEOUT }
    );
};
