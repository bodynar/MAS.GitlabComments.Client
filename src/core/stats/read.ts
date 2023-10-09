import moment, { unitOfTime } from "moment";

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

        params.append("endDate", rightDate.format());
        params.append("startDate", leftDate.format());
    } else {
        const rightDate = moment().startOf("date");
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

        const leftDate = rightDate.clone().add(-1, period);

        params.append("endDate", rightDate.format());
        params.append("startDate", leftDate.format());
    }

    return `?${params}`;
};
