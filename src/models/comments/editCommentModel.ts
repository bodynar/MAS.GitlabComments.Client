/** Base comment model with editable fields */
export interface EditCommentModel {
    /** Message */
    message: string;

    /** Comment with link to rule (source) */
    commentWithLinkToRule: string;

    /** Description */
    description?: string;
}
