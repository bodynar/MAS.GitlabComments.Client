/** Result of batch retraction */
export type BatchRetractResult = {
    /** Successfully retracted operations */
    success: Array<RetractOperationResult>;

    /** Information about outdated tokens */
    outdated: Array<RetractOperationResult>;

    /** Failed operation due error */
    errors: Array<ErrorRetractOperationResult>;
};

/** Information about operation retraction */
export type RetractOperationResult = {
    /** Identifier of token */
    tokenId: string;
};

/** Information about error retraction of operation */
export type ErrorRetractOperationResult = RetractOperationResult & {
    /** Error message */
    error: string;
};
