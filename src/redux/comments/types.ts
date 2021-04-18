import { Comment } from "models/comment";

export type CommentModuleState =
    | 'init' /** Comment module initialized */
    | 'loading' /** Something is loading */
    | 'idle' /** Comment module is waiting for user action  */
    ;

/** Model representing comment module state */
export type CommentsState = {
    /** Current module state */
    state: CommentModuleState;

    /** Loaded comments */
    comments: Array<Comment>;
};
