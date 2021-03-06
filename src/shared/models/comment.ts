/** Base comment model with editable fields */
export interface BaseCommentModel {
    /** Message */
    message: string;

    /** Description */
    description?: string;
}

/** Comment model */
export interface Comment extends BaseCommentModel {
    /** Identifier */
    id: string;

    /** Appearance count */
    appearanceCount: number;
}
