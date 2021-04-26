import { BaseCommentModel } from "@app/models/comment";

/**Model represents container for data to update comment */
export interface UpdateComment extends BaseCommentModel {
    /** Comment identifier value */
    id: string;
}
