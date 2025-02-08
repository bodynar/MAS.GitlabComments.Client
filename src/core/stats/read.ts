import moment, { Moment } from "moment";

import { DateRange, StatsFilter, StatsRecord } from "@app/models/stats";

import { get } from "@app/utils";

/**
 * Load stats data by specified filter
 * @param filter Stats data filter values
 * @returns Promise with loaded stats data
 */
export const read = (filter: StatsFilter): Promise<Array<StatsRecord>> => {
    const searchParams = getSearchParams(filter);

    return get<Array<StatsRecord>>(`/api/stats/top${searchParams}`);
};

/**
* Build search query api part from stats filter
* @param filter Values to filter stats data
* @returns Search query api route part
*/
const getSearchParams = (filter: StatsFilter): string => {
    const params = new URLSearchParams();

    if (filter.type === DateRange.Manual) {
        const leftDate = moment(filter.leftDate!).startOf("date");
        const rightDate = moment(filter.rightDate!).startOf("date");

        params.append("startDate", leftDate.format());
        params.append("endDate", rightDate.format());
    } else {
        const [leftDate, rightDate] = getDates(filter.type);

        params.append("startDate", leftDate.format());
        params.append("endDate", rightDate.format());
    }

    return `?${params}`;
};

/**
 * Get date range by type
 * @param type Selected date range
 * @returns Pair of dates
 */
export const getDates = (type: DateRange): [Moment, Moment] => {
    switch (type) {
        case DateRange.PreviousWeek:
            return [
                moment().startOf("isoWeek").add(-1, "week"),
                moment().endOf("isoWeek").add(-1, "week"),
            ];

        case DateRange.PreviousMonth:
            return [
                moment().startOf("month").add(-1, "month"),
                moment().endOf("month").add(-1, "month"),
            ];

        case DateRange.PreviousYear:
            return [
                moment().startOf("year").add(-1, "year"),
                moment().endOf("year").add(-1, "year"),
            ];

        case DateRange.CurrentWeek:
            return [
                moment().startOf("isoWeek"),
                moment().endOf("isoWeek"),
            ];

        case DateRange.CurrentMonth:
            return [
                moment().startOf("month"),
                moment().endOf("month"),
            ];

        case DateRange.CurrentYear:
            return [
                moment().startOf("year"),
                moment().endOf("year"),
            ];
    }

    return [moment(), moment().endOf("day")];
};
