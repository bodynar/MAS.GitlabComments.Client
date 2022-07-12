
/** Statistics of single comment during specified range */
export type StatsRecord = {
    /** Identifier of comment */
    commentId: string;

    /** Comment text */
    text: string;

    /** Comment increment amount during specified range */
    count: number;
};
