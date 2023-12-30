import { useMemo } from "react";

import "@app/styles/comments/comments.scss";

import { StatsFilter, StatsRecord } from "@app/models/stats";
import { getLabel } from "@app/core/stats";

import StatsRecordComponent from "../record";

/** Type of incoming StatsTableComponent props */
interface StatsTableComponentProps {
    /** Statistics data for specified date range */
    data: Array<StatsRecord>;

    /** Current stats module filter */
    filter: StatsFilter;

    /** Is stats data loaded */
    loaded?: boolean;

    /** Show comment description */
    showDescription: (commentId: string) => void;
}

/** 
 * Statistics table component.
 * Represents data about comments appearance increment during specified date range
*/
const StatsTableComponent = ({
    data, filter,
    showDescription,
}: StatsTableComponentProps): JSX.Element => {
    const label = useMemo(() => getLabel(filter), [filter]);

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
        <div>
            <div className="block">
                <h4 className="title is-4">
                    {label}
                </h4>
            </div>

            <div className="block">
                <div className="comments-table my-2 px-2">
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
                    {data.map(x =>
                        <StatsRecordComponent
                            key={x.commentId}
                            {...x}
                            showDescription={showDescription}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatsTableComponent;
