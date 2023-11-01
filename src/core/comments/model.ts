import { Comment, EditCommentModel, IncompleteComment } from "@app/models/comments";

import { post, get } from "@app/utils";

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
 * Get incomplete comments
 * @returns Promise with array of incomplete comments
 */
export const getIncomplete = async (): Promise<Array<IncompleteComment>> => {
    return await get<Array<IncompleteComment>>(`/api/comments/getIncomplete`);
};

/**
 * Update incomplete comments
 * @returns Promise with empty result
 */
export const updateIncomplete = async (): Promise<void> => {
    return post(`api/comments/updateIncomplete`);
};

/**
 * Update comments table
 * @returns Promise with empty result
 */
export const updateTable = async (): Promise<void> => {
    return post(`api/comments/updateCommentTable`);
};
