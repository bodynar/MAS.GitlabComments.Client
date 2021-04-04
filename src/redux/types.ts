/** Redux action */
export type Action = {
    /** Unique action code */
    type: string;

    /** Action payload data */
    payload: {
        [extraProps: string]: unknown;
    };
};
