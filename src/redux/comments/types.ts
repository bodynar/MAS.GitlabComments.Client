import { Comment } from "models/comment"

export type CommentsState = {
    isLoading: boolean;
    comments: Array<Comment>;
    comment?: Comment;
    error?: string;
};
