export interface BaseCommentModel {
    /** Message */
    message: string;

    description?: string;
}

/** Comment model */
export interface Comment extends BaseCommentModel {
    /** Identifier */
    id: string;

    /** Appearance count */
    appearanceCount: number;
}
