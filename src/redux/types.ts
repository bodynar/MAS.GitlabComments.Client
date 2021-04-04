/** Redux action */
export type Action = {
    /** Unique action code */
    type: string;
};

export type ActionWithPayload = Action & {
    /** Action payload data */
    payload: {
        [extraProps: string]: unknown;
    };
};
