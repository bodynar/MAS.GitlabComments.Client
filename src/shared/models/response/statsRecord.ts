
/** Statistics of single comment during specified range */
export type StatsRecord = {
    /** Identifier of comment */
    commentId: string;

    /** Comment text */
    commentText: string;

    /** Comment increment amount during specified range */
    count: string;
};
