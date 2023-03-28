import { StatsRecord } from "@app/models";

/**
 * @enum
 * Type of selected date range to filter records
*/
export enum DateRange {
    None = "",

    /** Last week */
    Week = "Last week",

    /** Last month */
    Month = "Last month",

    /** Last year */
    Year = "Last year",

    /** Manual date selecting */
    Manual = "Custom",
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
    filter: StatsFilter;

    /** Is stats data loaded */
    loaded?: boolean;
};
