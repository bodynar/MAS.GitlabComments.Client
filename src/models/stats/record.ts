/** Statistics of single comment during specified range */
export interface StatsRecord {
    /** Identifier of comment */
    commentId: string;

    /** Comment text */
    text: string;

    /** Comment increment amount during specified range */
    count: number;

    /** Unique comment number */
    number: string;
}
