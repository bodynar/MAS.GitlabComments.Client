import { IncompleteComment } from "@app/models/comments";

import { post, get } from "@app/utils";

/**
 * Get incomplete comments
 * @returns Promise with array of incomplete comments
 */
export const getIncomplete = (): Promise<Array<IncompleteComment>> => {
    return get<Array<IncompleteComment>>(`/api/comments/getIncomplete`);
};

/**
 * Update incomplete comments
 * @returns Promise with empty result
 */
export const updateIncomplete = (): Promise<void> => {
    return post(`api/comments/updateIncomplete`);
};

/**
 * Update comments table
 * @returns Promise with empty result
 */
export const updateTable = (): Promise<void> => {
    return post(`api/comments/updateCommentTable`);
};

/**
 * Get flag representing possibility of updating comments table
 * @returns Promise with boolean flag
 */
export const canUpdateTable = (): Promise<boolean> => {
    return get<boolean>(`api/comments/canUpdateCommentTable`);
};
