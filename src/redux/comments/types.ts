import { Comment } from "models/comment"

/** Model representing comment module state */
export type CommentsState = {
    /** Flag determines that module is currently loading something */
    isLoading: boolean;

    /** Loaded comments */
    comments: Array<Comment>;

    /** Current displaying comment */
    comment?: Comment;

    /** Last error */
    error?: string;
};
