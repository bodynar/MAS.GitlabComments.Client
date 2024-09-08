import { createAction } from "@reduxjs/toolkit";

import { EditCommentModel, Comment, RetractionToken } from "@app/models/comments";
import { CommentModuleInitState } from "@app/redux/comments";

/** Save loaded comments into state */
export const setComments = createAction<Array<Comment>>("mas.gc/comments/setComments");

/** Increment appearance count of specified comment action type */
export const increment = createAction<string>("mas.gc/comments/increment");

/** Add new comment action type */
export const addComment = createAction<Comment>("mas.gc/comments/addComment");

/** Update specified comment action type*/
export const updateComment = createAction<[EditCommentModel, string]>("mas.gc/comments/updateComment");

/** Delete specified comment action type */
export const deleteComment = createAction<string>("mas.gc/comments/deleteComment");

/** Set comments module state action type */
export const setModuleState = createAction<CommentModuleInitState>("mas.gc/comments/setModuleState");

/** Set comments module search query action type */
export const setSearchQuery = createAction<string>("mas.gc/comments/setSearchQuery");

/** Block comment actions */
export const blockComment = createAction<string>("mas.gc/comments/blockComment");

/** Unblock comment actions */
export const unblockComment = createAction<string>("mas.gc/comments/unblockComment");

/** Set current incomplete comments count */
export const setIncompleteCount = createAction<number>("mas.gc/comments/setIncompleteCount");

/** Set flag representing possibility of updating comments table */
export const setCanUpdateTable = createAction<boolean>("mas.gc/comments/setCanUpdateTable");

// #region Retraction tokens

/**
 * Save new retraction token
 * @param arg0 Pair: [comment identifier, token identifier]
 */
export const saveRetractionToken = createAction<[string, string]>("mas.gc/comments/saveRetractionToken");

/**
 * Retract increment operation
 * @param arg0 Token identifier
 */
export const retract = createAction<string>("mas.gc/comments/retract");

/**
 * Retract increment operation for several tokens
 * @param arg0 Token identifiers
 */
export const batchRetract = createAction<Array<string>>("mas.gc/comments/batchRetract");

/**
 * Save retraction tokens
 * @param arg0 Active retraction tokens
 */
export const setTokens = createAction<Array<RetractionToken>>("mas.gc/comments/setTokens");

/**
 * Block specific token to interact with
 * @param arg0 Token identifier
 */
export const blockToken = createAction<string>("mas.gc/comments/blockToken");

// #endregion
