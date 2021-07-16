import React from 'react';

/** Wide note to inform user about read only mode */
export default function ReadOnlyModeNote(): JSX.Element {
    return (
        <article className="message is-warning is-unselectable">
            <div className="message-header">
                <p>Note</p>
            </div>
            <div className="message-body">
                You are viewing application in read only mode
            </div>
        </article>
    );
}
