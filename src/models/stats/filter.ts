import { DateRange } from ".";

/** Statistics filter data */
export interface StatsFilter {
    /** Type of selected date range */
    type: DateRange;

    /** Left date-boundary */
    leftDate?: Date;

    /** Right date-boundary */
    rightDate?: Date;
}
