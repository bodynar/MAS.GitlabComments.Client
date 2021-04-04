import { Comment } from "models/comment";

export type CommentModuleState =
    'init' /** Comment module initialized */
    | 'loading' /** Something is loading */
    | 'error' /** Some error occurs */
    | 'idle' /** Comment module is waiting for user action  */
    | 'showModal' /** Some content is displaying in modal */
    ;

/** Model representing comment module state */
export type CommentsState = {
    /** Current module state */
    state: CommentModuleState;

    /** Loaded comments */
    comments: Array<Comment>;

    /** Current displaying comment */
    comment?: Comment;

    /** Last error */
    error?: string;
};
