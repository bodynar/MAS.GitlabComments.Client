export type BaseResponse = {
    success: boolean;
    erorr: string;  
};

export type BaseResponseWithResult<TResult> = BaseResponse & {
    result: TResult;
};