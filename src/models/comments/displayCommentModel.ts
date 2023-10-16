import { EditCommentModel } from ".";

/** Comment model */
export interface Comment extends EditCommentModel {
    /** Identifier */
    id: string;

    /** Appearance count */
    appearanceCount: number;

    /** Currently blocked to interact with */
    blocked: boolean;
}
