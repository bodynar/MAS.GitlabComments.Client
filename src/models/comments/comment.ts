import { BlockedEntry } from "@app/models/app";

import { EditCommentModel } from ".";

/** Comment model */
export type Comment = EditCommentModel & BlockedEntry & {
    /** Identifier */
    id: string;

    /** Appearance count */
    appearanceCount: number;

    /** Unique comment number */
    number: string;
};
