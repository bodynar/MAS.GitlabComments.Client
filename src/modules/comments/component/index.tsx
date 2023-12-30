import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { isNullOrEmpty } from "@bodynarf/utils";
import { ElementSize } from "@bodynarf/react.components";
import Button from "@bodynarf/react.components/components/button";
import Search from "@bodynarf/react.components/components/search";

import { Comment as CommentModel } from "@app/models/comments";
import { search } from "@app/core/comments";

import { CompositeAppState } from "@app/redux";
import { CommentModuleInitState, getAllCommentsAsync, setSearchQuery, showInformationAsync, addCommentAsync, deleteCommentAsync, incrementAsync, updateCommentAsync } from "@app/redux/comments";

import { useDebounceHandler, useQueryParam } from "@app/hooks";

import CommentTable from "../components/table";

/** Comments module component props */
interface CommentsProps {
    /** Is application in loading state */
    loading: boolean;

    /** Is app in read only mode */
    readOnlyMode?: boolean;

    /** All comments */
    comments: Array<CommentModel>;

    /** Current module state */
    state: CommentModuleInitState;

    /** Current search query */
    searchQuery: string;

    /** Add comment in modal box */
    addComment: () => void;

    /** Get all comments */
    getComments: () => Promise<void>;

    /** Update specified comment in modal box */
    updateComment: (commentId: string) => void;

    /** Increment comment appearance count */
    increment: (commentId: string) => void;

    /** Show comment description */
    showDescription: (commentId: string) => void;

    /** Delete comment by it"s identifier */
    deleteComment: (commentId: string) => void;

    /** Save current search query */
    setSearchQuery: (searchQuery: string) => void;
}

/** Comments module main component */
function Comments({
    loading,
    comments, searchQuery,
    state, readOnlyMode,
    setSearchQuery, getComments, addComment,
    updateComment, increment, showDescription, deleteComment
}: CommentsProps): JSX.Element {
    const searchQueryParam = useQueryParam("q") ?? "";
    const navigate = useNavigate();
    const location = useLocation();

    const highlightedCommentId = location.hash.length > 0 ? location.hash.substring(1) : "";

    const [displayedComments, setDisplayedComments] = useState<Array<CommentModel>>(
        comments.filter(x =>
            x.message.toLowerCase().includes((searchQuery || searchQueryParam).toLocaleLowerCase())
        )
    );

    const onSearch = useCallback(
        (searchPattern: string) => {
            const params = new URLSearchParams();
            const filteredComments = search(comments, searchPattern);

            setDisplayedComments(filteredComments);

            if (searchPattern.length >= 3) {
                params.append("q", searchPattern);
            }

            navigate({ search: params.toString(), hash: location.hash, });

            setSearchQuery(searchPattern);
        }, [navigate, location.hash, setSearchQuery, comments]);

    const [debounce, onReloadClick] = useDebounceHandler(getComments, 3);

    useEffect(() => {
        if (state === "init") {
            getComments();
        }
    }, [getComments, state]);

    useEffect(() => {
        if (isNullOrEmpty(searchQuery) && !isNullOrEmpty(searchQueryParam)) {
            setSearchQuery(searchQueryParam!);
        }
    }, [searchQuery, searchQueryParam, setSearchQuery]);

    useEffect(() => {
        if (state === "idle") {
            onSearch(searchQuery);
        }
    }, [onSearch, comments, searchQuery, state]);

    const noCommentsMessage: string =
        comments.length === 0
            ? "No comments"
            : `No comments that satisfy your filters found
            Try update your filters`;

    return (
        <section className="app-comments">
            <div className="field">
                <Button
                    caption="Add comment"
                    type="success"
                    onClick={addComment}
                    disabled={readOnlyMode}
                />
            </div>
            <div className="block">
                <Search
                    key={state}
                    onSearch={onSearch}
                    searchType="byTyping"
                    defaultValue={searchQuery}
                    caption="Search comment.."
                />
                {searchQuery.length < 3 &&
                    <span className="help has-text-grey is-italic">
                        Search will be performed when there are at least 3 characters
                    </span>
                }
            </div>
            {state !== "init" &&
                <Button
                    type="default"
                    caption="Reload"
                    className="mb-2"
                    isLoading={loading}
                    disabled={!debounce}
                    onClick={onReloadClick}
                    size={ElementSize.Small}
                    icon={{ name: "arrow-clockwise" }}
                />
            }
            <CommentTable
                displayedComments={displayedComments}
                highlightedCommentId={highlightedCommentId}
                noCommentsMessage={noCommentsMessage}
                readOnlyMode={readOnlyMode ?? false}
                updateComment={updateComment}
                increment={increment}
                showDescription={showDescription}
                deleteComment={deleteComment}
            />
        </section>
    );
}

/** Comments module main component */
export default connect(
    ({ comments, app }: CompositeAppState) => ({
        ...comments,
        readOnlyMode: app.readOnlyMode,
        loading: app.loading,
    }),
    {
        addComment: addCommentAsync,
        getComments: getAllCommentsAsync,
        updateComment: updateCommentAsync,
        increment: incrementAsync,
        showDescription: showInformationAsync,
        deleteComment: deleteCommentAsync,
        setSearchQuery: setSearchQuery,
    }
)(Comments);
