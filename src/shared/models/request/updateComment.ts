/**Model represents container for data to update comment */
export type UpdateComment = {
    /** Comment identifier value */
    id: string;

    /** Message: updated or old */
    message: string;

    /** Description: updated or old */
    description?: string;
};
