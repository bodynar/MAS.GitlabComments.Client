import { useCallback, useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { connect } from "react-redux";

import { isNullOrEmpty, isStringEmpty } from "@bodynarf/utils";
import Button from "@bodynarf/react.components/components/button";
import Search from "@bodynarf/react.components/components/search";

import { Comment as CommentModel } from "@app/models";

import { CompositeAppState } from "@app/redux";
import { CommentModuleState, getSetSearchQueryAction, getAllComments, addComment, updateComment, increment, showDescription, deleteComment } from "@app/redux/comments";

import { useQueryParam } from "@app/hooks";

import CommentTable from "../components/table";

interface CommentsProps {
    /** Is app in read only mode */
    readOnlyMode?: boolean;

    /** All comments */
    comments: Array<CommentModel>;

    /** Current module state */
    state: CommentModuleState;

    /** Current search query */
    searchQuery: string;

    /** Add comment in modal box */
    addComment: () => void;

    /** Get all comments */
    getComments: () => void;

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
    comments, searchQuery,
    state, readOnlyMode,
    setSearchQuery, getComments, addComment,
    updateComment, increment, showDescription, deleteComment
}: CommentsProps): JSX.Element {
    const searchQueryParam = useQueryParam("q") || "";
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

            if (isStringEmpty(searchPattern)) {
                setDisplayedComments([...comments]);
            } else {
                if (searchPattern.length >= 3) {
                    const filteredComments: Array<CommentModel> =
                        [...comments].filter(x => x.message.toLowerCase().includes(searchPattern.toLowerCase()));

                    setDisplayedComments(filteredComments);

                    params.append("q", searchPattern);
                }
            }

            navigate({ search: params.toString(), hash: location.hash, });

            setSearchQuery(searchPattern);
        }, [navigate, location.hash, setSearchQuery, comments]);

    useEffect(() => {
        if (state === "init") {
            getComments();
        }
    }, [getComments, state]);

    useEffect(() => {
        if (isNullOrEmpty(searchQuery) && !isNullOrEmpty(searchQueryParam)) {
            setSearchQuery(searchQueryParam!);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => onSearch(searchQuery), [onSearch, comments, searchQuery]);

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
                    caption="Search comment by text.."
                    defaultValue={searchQuery}
                    onSearch={onSearch}
                    searchType="byTyping"
                />
            </div>
            <CommentTable
                displayedComments={displayedComments}
                highlightedCommentId={highlightedCommentId}
                noCommentsMessage={noCommentsMessage}
                readOnlyMode={readOnlyMode === true}
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
    ({ comments, app }: CompositeAppState) => ({ ...comments, readOnlyMode: app.readOnlyMode }),
    {
        addComment: addComment,
        getComments: getAllComments,
        updateComment: updateComment,
        increment: increment,
        showDescription: showDescription,
        deleteComment: deleteComment,
        setSearchQuery: getSetSearchQueryAction,
    }
)(Comments);
