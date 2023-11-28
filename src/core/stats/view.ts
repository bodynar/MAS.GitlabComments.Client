import moment, { unitOfTime } from "moment";

import { DateRange, StatsFilter } from "@app/models/stats";

/** Current date-time value */
const today = moment();

/**
 * Get stats table label according to specified filter
 * @param filter Current stats filter
 * @returns Label for stats table
 */
export const getLabel = (filter: StatsFilter): string => {
    if (filter.type === DateRange.Manual) {
        return `Comments appearance updates from ${filter.leftDate!.toDateString()} to ${filter.rightDate!.toDateString()}`;
    }

    let period: unitOfTime.DurationConstructor = "month";

    switch (filter.type) {
        case DateRange.Month:
            period = "month";
            break;

        case DateRange.Week:
            period = "week";
            break;

        case DateRange.Year:
            period = "year";
            break;
    }

    const leftDate = today.clone().add(-1, period);

    return `Comments appearance updates for last ${filter.type} (${leftDate.format("DD.MM.YYYY")} - ${today.format("DD.MM.YYYY")})`;
};
