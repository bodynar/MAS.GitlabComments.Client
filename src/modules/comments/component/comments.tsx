import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from "react-router-dom";

import { connect } from 'react-redux';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './comments.scss';
import './comments.dark.scss';

import { isStringEmpty } from '@app/utils/common';

import { Comment as CommentModel } from '@app/models/comment';

import { CompositeAppState } from '@app/redux/rootReducer';
import { getAllComments, addComment, updateComment, increment, showDescription, deleteComment } from '@app/redux/comments/thunks';
import { CommentModuleState } from '@app/redux/comments/types';

import Button from '@app/sharedComponents/button';
import Search from '@app/sharedComponents/search';

import useQueryParam from '@app/hooks/useQueryParam';

import Comment from '../components/comment';

type CommentsProps = {
    /** Is app in read only mode */
    readOnlyMode?: boolean;

    /** All comments */
    comments: Array<CommentModel>;

    /** Current module state */
    state: CommentModuleState;

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

    /** Delete comment by it's identifier */
    deleteComment: (commentId: string) => void;
};

/** Comments module main component */
function Comments(props: CommentsProps): JSX.Element {
    const searchQueryParam = useQueryParam('q');
    const navigate = useNavigate();

    const [displayedComments, setDisplayedComments] = useState<Array<CommentModel>>(props.comments);
    const [searchPattern, setSearchPattern] = useState<string>(searchQueryParam || '');

    const onSearch = useCallback(
        (searchPattern: string) => {
            const params = new URLSearchParams();

            if (isStringEmpty(searchPattern)) {
                setDisplayedComments([...props.comments]);
            } else {
                const filteredComments: Array<CommentModel> =
                    [...props.comments].filter(x => x.message.toLowerCase().includes(searchPattern.toLowerCase()));

                setDisplayedComments(filteredComments);

                params.append('q', searchPattern);
            }

            navigate({ search: params.toString() });

            setSearchPattern(searchPattern);
        }, [navigate, props.comments]);

    useEffect(() => {
        if (props.state === 'init') {
            props.getComments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.state]);

    useEffect(() => onSearch(searchPattern), [onSearch, props.comments, searchPattern]);

    const isLoading = useMemo((): boolean => props.state === 'loading', [props.state]);

    const noCommentsMessage: string =
        props.comments.length === 0
            ? 'No comments'
            : `No comments that satisfy your filters found
            Try update your filters`;

    return (
        <section className="app-comments">
            <div className="field">
                <Button
                    caption="Add comment"
                    type="success"
                    isLoading={isLoading}
                    onClick={props.addComment}
                    disabled={props.readOnlyMode}
                />
            </div>
            <div className="block">
                <Search
                    caption="Search comment by text.."
                    defaultValue={searchQueryParam}
                    onSearch={onSearch}
                    minCharsToSearch={0}
                    isLoading={isLoading}
                />
            </div>
            <div className="app-comments__items">
                {displayedComments.length > 0
                    ? <>
                        <ListHeaders
                            columns={['Appearance', 'Comment', 'Actions']}
                        />
                        <TransitionGroup role="transition-container">
                            {displayedComments.map(comment =>
                                <CSSTransition
                                    key={comment.id}
                                    timeout={250}
                                    classNames="app-comment"
                                    unmountOnExit
                                >
                                    <Comment
                                        key={comment.id}
                                        {...props}
                                        comment={comment}
                                        isModuleInLoadingState={props.state == 'loading'}
                                        isReadOnlyMode={props.readOnlyMode === true}
                                    />
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </>
                    : <EmptyListPlaceholder message={noCommentsMessage} />
                }
            </div>
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
        deleteComment: deleteComment
    }
)(Comments);

/** Empty list placeholder */
const EmptyListPlaceholder = ({ message }: { message: string; }): JSX.Element => {
    const displayMessage: string =
        isStringEmpty(message)
            ? 'No items' : message;

    return (
        <span className="app-empty-list-placeholder is-unselectable">
            {displayMessage}
        </span>
    );
};

// TODO: v2 find a better solution
/** Comments table headers */
const ListHeaders = ({ columns }: { columns: Array<string>; }): JSX.Element => {
    return (
        <div className="app-comments__headers">
            {columns.map(column =>
                <span
                    key={column}
                >
                    {column}
                </span>
            )}
        </div>
    );
};
