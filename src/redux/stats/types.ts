import { StatsFilter, StatsRecord } from "@app/models/stats";

/** Statistics module state */
export interface StatsState {
    /** Fetched statistics data for specified date range */
    data: Array<StatsRecord>;

    /** Current stats module filter */
    filter: StatsFilter;

    /** Is stats data loaded */
    loaded?: boolean;
}
