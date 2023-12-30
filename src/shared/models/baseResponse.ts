/** Base api response */
export interface BaseResponse {
    /** Flag determines that api processed with no errors */
    success: boolean;

    /** Api process error */
    error: string;
}

/** Api response with result */
export interface BaseResponseWithResult<TResult> extends BaseResponse {
    /** Api response result */
    result: TResult;
}
