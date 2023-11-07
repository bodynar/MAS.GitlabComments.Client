import { Comment } from "@app/models/comments";

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

    /** Current search query */
    searchQuery: string;

    /** Amount of incomplete comments */
    incompleteCommentsCount?: number;
}
