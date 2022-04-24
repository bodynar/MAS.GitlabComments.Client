import { StatsRecord } from "@app/models/response/statsRecord";

/**
 * @enum
 * Type of selected date range to filter records
*/
export enum DateRange {
    /** Manual date selecting */
    Custom = 0,

    /** Last week */
    Week = 1,

    /** Last month */
    Month = 2,

    /** Last year */
    Year = 3,
}

/** Statistics filter data */
export type StatsFilter = {
    /** Type of selected date range */
    type: DateRange;

    /** Left date-boundary */
    leftDate?: Date;

    /** Right date-boundary */
    rightDate?: Date;
};

/** Statistics module state */
export type StatsState = {
    /** Fetched statistics data for specified date range */
    data: Array<StatsRecord>;

    /** Current stats module filter */
    filter?: StatsFilter;
};
