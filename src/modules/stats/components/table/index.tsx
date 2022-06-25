import { useMemo } from "react";

import moment, { unitOfTime } from "moment";

import { StatsRecord } from "@app/models/response/statsRecord";
import { DateRange, StatsFilter } from "@app/redux/stats/types";

import StatsRecordComponent from "../record";

/** Type of incoming StatsTableComponent props */
type StatsTableComponentProps = {
    /** Statistics data for specified date range */
    data: Array<StatsRecord>;

    /** Current stats module filter */
    filter: StatsFilter;

    /** Show comment description */
    showDescription: (commentId: string) => void;
};

const today = moment();

/** 
 * Statistics table component.
 * Represents data about comments apperance increment during specified date range
*/
const StatsTableComponent = ({ data, filter, showDescription }: StatsTableComponentProps): JSX.Element => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const label = useMemo(() => getLabel(filter), [data]);

    if (data.length === 0) {
        return <></>;
    }

    return (
        <div>
            <div className="block">
                <h4 className="title is-4">
                    {label}
                </h4>
            </div>

            <div className="block">
                <div className="columns">
                    <div className="column is-2">
                        <span className="is-flex is-justify-content-center">
                            Increment count
                        </span>
                    </div>
                    <span className="column">Comment</span>
                    <div className="column is-2">
                        <span className="is-flex is-justify-content-center">
                            Actions
                        </span>
                    </div>
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

const getLabel = (filter: StatsFilter): string => {
    if (filter.type === DateRange.Manual) {
        return `Comments appearance updates from ${filter.leftDate!.toDateString()} to ${filter.leftDate!.toDateString()}`;
    }

    let period: unitOfTime.DurationConstructor = 'month';

    switch (filter.type) {
        case DateRange.Month:
            period = 'month';
            break;

        case DateRange.Week:
            period = 'week';
            break;

        case DateRange.Year:
            period = 'year';
            break;
    }

    const leftDate = today.clone().add(-1, period);

    return `Comments appearance updates for last ${filter.type} (${leftDate.format("DD.MM.YYYY")} - ${today.format("DD.MM.YYYY")})`;
};
