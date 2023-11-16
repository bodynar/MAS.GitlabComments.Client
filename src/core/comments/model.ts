import { Comment, EditCommentModel } from "@app/models/comments";

import { post, get } from "@app/utils";
import { isStringEmpty } from "@bodynarf/utils";

/**
 * Save new comment to database
 * @param comment New comment data
 * @returns Promise with new comment identifier
 */
export const addComment = (comment: EditCommentModel): Promise<string> => {
    return post<string>(`api/comments/add`, comment);
};

/**
 * Delete specified comment from database
 * @param commentId Identifier of comment to delete
 * @returns Promise with empty result
 */
export const deleteComment = (commentId: string): Promise<void> => {
    return post(`api/comments/delete`, commentId);
};

/**
 * Increment appearance count for specified comment
 * @param commentId Identifier of comment
 * @returns Promise with empty result
 */
export const increment = (commentId: string): Promise<void> => {
    return post(`api/comments/increment`, commentId);
};

/**
 * Update specified comment with new data
 * @param comment Updated comment data
 * @param commentId Identifier of comment
 * @returns Promise with empty result
 */
export const updateComment = (comment: EditCommentModel, commentId: string): Promise<void> => {
    return post(`api/comments/update`, { ...comment, id: commentId });
};

/**
 * Get list of all comments
 * @returns Promise with array of all comments
 */
export const getAllComments = async (): Promise<Array<Comment>> => {
    const comments = await get<Array<Comment>>(`/api/comments/getAll`);

    return comments.map(x => ({
        ...x,
        blocked: false,
    }));
};

/**
 * Filter comments by search query
 * @param comments Array of comments
 * @param search Search query string
 * @returns Subarray of comments
 */
export const search = (comments: Array<Comment>, search: string): Array<Comment> => {
    if (isStringEmpty(search) || search.length < 3) {
        return comments;
    }

    const loweredSearchPattern = search.toLowerCase();

    return comments
        .filter(({ message, commentWithLinkToRule }) =>
            message.toLowerCase().includes(loweredSearchPattern)
            || commentWithLinkToRule.toLowerCase().includes(loweredSearchPattern)
        );
};
