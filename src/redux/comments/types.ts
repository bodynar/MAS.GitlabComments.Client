import { Comment, ExtendedRetractionToken } from "@app/models/comments";

/** Comments module state */
export type CommentModuleInitState =
    | "init" /** Comment module initialized */
    | "idle" /** Comment module is waiting for user action  */
    ;

/** Model representing comment module state */
export interface CommentsState {
    /** Current module state */
    state: CommentModuleInitState;

    /** Loaded comments */
    comments: Array<Comment>;

    /** Retraction tokens */
    retractionTokens: Array<ExtendedRetractionToken>;

    /** Current search query */
    searchQuery: string;

    /** Amount of incomplete comments */
    incompleteCommentsCount?: number;

    /** Update comments table definition access flag */
    canUpdateTable: boolean;
}
