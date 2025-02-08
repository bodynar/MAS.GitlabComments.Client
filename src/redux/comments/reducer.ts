import { createReducer } from "@reduxjs/toolkit";

import { isNullish, isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils";

import { Comment, ExtendedRetractionToken, RetractionToken } from "@app/models/comments";

import { CommentsState, setModuleState } from "@app/redux/comments";
import {
    addComment, deleteComment, increment, updateComment,
    setComments, setSearchQuery,
    blockComment, unblockComment,
    saveRetractionToken, retract, batchRetract,
    setTokens,
    blockToken,
    setHighlightedComment,
} from "./actions";

/** Initial comment module state */
const initialState: CommentsState = {
    state: "init",
    comments: [],
    retractionTokens: [],
    searchQuery: "",
};

/** App container module reducer */
export const reducer = createReducer(initialState,
    (builder) => {
        builder
            .addCase(setModuleState, (state, { payload }) => {
                state.state = payload;
            })
            .addCase(addComment, (state, { payload }) => {
                state.comments = [...state.comments, payload];
            })
            .addCase(setComments, (state, { payload }) => {
                state.comments = payload;
            })
            .addCase(blockComment, (state, { payload }) => {
                const specifiedComment: Comment | undefined =
                    state.comments.find(({ id }) => id === payload);

                if (isNullish(specifiedComment)) {
                    return;
                }

                specifiedComment.blocked = true;
            })
            .addCase(unblockComment, (state, { payload }) => {
                const specifiedComment: Comment | undefined =
                    state.comments.find(({ id }) => id === payload);

                if (isNullish(specifiedComment)) {
                    return;
                }

                specifiedComment.blocked = false;
            })
            .addCase(increment, (state, { payload }) => {
                const specifiedComment: Comment | undefined =
                    state.comments.find(({ id }) => id === payload);

                if (isNullish(specifiedComment)) {
                    return;
                }

                specifiedComment.appearanceCount += 1;

                state.comments = state.comments.sort((x, y) => y.appearanceCount - x.appearanceCount);
            })
            .addCase(updateComment, (state, { payload }) => {
                const [data, id] = payload;

                state.comments =
                    state.comments.map(x =>
                        x.id === id
                            ? { ...x, ...data }
                            : x
                    );
            })
            .addCase(deleteComment, (state, { payload }) => {
                state.comments = state.comments.filter(({ id }) => id !== payload);
            })
            .addCase(setSearchQuery, (state, { payload }) => {
                state.searchQuery = payload;
            })
            .addCase(saveRetractionToken, (state, { payload }) => {
                const [commentId, tokenId] = payload;

                const relatedComment = state.comments.find(({ id }) => commentId === id);

                if (isNullish(relatedComment)) {
                    return;
                }

                state.retractionTokens = [
                    ...state.retractionTokens, {
                        id: tokenId,
                        commentId: relatedComment.id,
                        commentNumber: relatedComment.number,
                        blocked: false,
                    }
                ].sort((x, y) => x.commentId.localeCompare(y.commentId));
            })
            .addCase(retract, (state, { payload }) => {
                const record = state.retractionTokens.find(({ id }) => id === payload);

                if (isNullish(record)) {
                    return;
                }

                const specifiedComment: Comment | undefined =
                    state.comments.find(({ id }) => id === record.commentId);

                if (isNullish(specifiedComment)) {
                    return;
                }

                specifiedComment.appearanceCount -= 1;
                state.comments = state.comments.sort((x, y) => y.appearanceCount - x.appearanceCount);
                state.retractionTokens = state.retractionTokens.filter(({ id }) => id !== payload);
            })
            .addCase(batchRetract, (state, { payload }) => {
                const existedRecords = (payload ?? [])
                    .filter(x => !isNullOrEmpty(x))
                    .map(x => state.retractionTokens.find(({ id }) => id === x))
                    .filter(x => !isNullish(x))
                    .map(x => x as ExtendedRetractionToken);

                if (existedRecords.length === 0) {
                    return;
                }

                existedRecords
                    .groupBy<RetractionToken>("commentId")
                    .forEach(({ key, items }) => {
                        const specifiedComment: Comment | undefined =
                            state.comments.find(({ id }) => id === key);

                        if (isNullOrUndefined(specifiedComment)) {
                            return;
                        }

                        specifiedComment!.appearanceCount -= items.length;
                    });

                state.comments = state.comments.sort((x, y) => y.appearanceCount - x.appearanceCount);
                state.retractionTokens = state.retractionTokens.filter(
                    ({ id }) => !existedRecords.some(x => x.id === id)
                );
            })
            .addCase(setTokens, (state, { payload }) => {
                if (isNullOrUndefined(payload)) {
                    return;
                }

                state.retractionTokens =
                    payload
                        .groupBy<RetractionToken>("commentId")
                        .flatMap(({ key, items }) => {
                            const specifiedComment: Comment | undefined =
                                state.comments.find(({ id }) => id === key);

                            if (isNullish(specifiedComment)) {
                                return [];
                            }

                            return items.map(x => ({
                                ...x,
                                commentNumber: specifiedComment.number,
                            } as ExtendedRetractionToken));
                        })
                        .filter(x => !isNullish(x));
            })
            .addCase(blockToken, (state, { payload }) => {
                const token = state.retractionTokens.find(({ id }) => id === payload);

                if (isNullish(token)) {
                    return;
                }

                token.blocked = true;
            })
            .addCase(setHighlightedComment, (state, { payload }) => {
                state.highlightCommentId = payload;
            })
            ;
    }
);
