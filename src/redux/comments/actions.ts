import { createAction } from "@reduxjs/toolkit";

import { EditCommentModel, Comment } from "@app/models/comments";
import { CommentModuleState } from "@app/redux/comments";

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
export const setModuleState = createAction<CommentModuleState>("mas.gc/comments/setModuleState");

/** Set comments module search query action type */
export const setSearchQuery = createAction<string>("mas.gc/comments/setSearchQuery");

