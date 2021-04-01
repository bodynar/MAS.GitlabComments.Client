/** Redux action */
export type Action = {
    /** Unique action code */
    type: string;

    // TODO: fix type
    /** Action payload data */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
};
