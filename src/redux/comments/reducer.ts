import { createReducer } from "@reduxjs/toolkit";

import { isNullOrUndefined } from "@bodynarf/utils";

import { Comment } from "@app/models/comments";

import { CommentsState, setModuleState } from "@app/redux/comments";
import { addComment, blockComment, deleteComment, increment, setComments, setSearchQuery, unblockComment, updateComment } from "./actions";

/** Initial comment module state */
const initialState: CommentsState = {
    state: "init",
    comments: [],
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

                if (isNullOrUndefined(specifiedComment)) {
                    return;
                }

                specifiedComment!.blocked = true;
            })
            .addCase(unblockComment, (state, { payload }) => {
                const specifiedComment: Comment | undefined =
                    state.comments.find(({ id }) => id === payload);

                if (isNullOrUndefined(specifiedComment)) {
                    return;
                }

                specifiedComment!.blocked = false;
            })
            .addCase(increment, (state, { payload }) => {
                const specifiedComment: Comment | undefined =
                    state.comments.find(({ id }) => id === payload);

                if (isNullOrUndefined(specifiedComment)) {
                    return;
                }

                specifiedComment!.appearanceCount += 1;

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
            ;
    }
);
