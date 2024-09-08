import { BlockedEntry } from "@app/models/app";

/** Token for retract increment comment operation */
export type RetractionToken = {
    /** Identifier of related comment */
    commentId: string;

    /** Identifier of token */
    id: string;
};

/** Token for increment operation retraction for display purpose */
export type ExtendedRetractionToken = RetractionToken & BlockedEntry & {
    /** Related comment number */
    commentNumber: string;
};
