import { FC } from "react";

import "@app/styles/comments/comments.scss";

import { StatsRecord } from "@app/models/stats";

import "./style.scss";

import StatsRecordComponent from "../record";

/** Type of incoming StatsTableComponent props */
type StatsTableComponentProps = {
    /** Statistics data for specified date range */
    data: Array<StatsRecord>;

    /** Is stats data loaded */
    loaded?: boolean;

    /** Show comment description */
    showDescription: (commentId: string) => void;
};

/**
 * Statistics table component.
 * Represents data about comments appearance increment during specified date range
*/
const StatsTableComponent: FC<StatsTableComponentProps> = ({
    data,
    showDescription,
}) => {
    if (data.length === 0) {
        return (
            <div className="block has-text-centered has-text-grey is-italic is-unselectable">
                <span style={{ whiteSpace: "pre-line" }}>
                    No data found
                    Please, update date range
                </span>
            </div>
        );
    }

    return (
        <div className="block">
            <div className="comments-table my-2 px-2">
                <span className="comments-table__position has-text-centered">
                    #
                </span>
                <span className="comments-table__appearance has-text-centered">
                    Increment count
                </span>
                <span className="comments-table__number">
                    Number
                </span>
                <span className="comments-table__content">
                    Comment
                </span>
                <span className="comments-table__actions">
                    Actions
                </span>
            </div>
            <div className="block">
                {data.map((x, i) =>
                    <StatsRecordComponent
                        key={x.commentId}

                        {...x}
                        position={i + 1}
                        showDescription={showDescription}
                    />
                )}
            </div>
        </div>
    );
};

export default StatsTableComponent;
