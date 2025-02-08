import { FC, useCallback } from "react";

import { connect } from "react-redux";

import { StatsRecord, StatsFilter } from "@app/models/stats";

import { CompositeAppState } from "@app/redux";
import { loadStatsData, setFilter, setLoaded } from "@app/redux/stats";
import { showInformationAsync } from "@app/redux/comments";

import StatsFilters from "../components/filter";
import StatsTableComponent from "../components/table";

type StatsProps = {
    /** Fetched statistics data for specified date range */
    data: Array<StatsRecord>;

    /** Current stats module filter */
    filter: StatsFilter;

    /** Is stats data loaded */
    loaded?: boolean;

    /** Save selected filter in app */
    setStatsFilter: (filter: StatsFilter) => void;

    /** Load stats data according to specified filter */
    loadStatsData: (filter: StatsFilter) => void;

    /** Show comment description */
    showDescription: (commentId: string) => void;

    /** Set is stats data loaded */
    setIsLoaded: (loaded?: boolean) => void;
};

/** Statistics module main component */
const Stats: FC<StatsProps> = ({
    data, filter, loaded = false,
    setStatsFilter, loadStatsData,
    showDescription, setIsLoaded
}) => {
    const onApplyFiltersClick = useCallback(() => loadStatsData(filter), [filter, loadStatsData]);

    return (
        <section className="app-stats" role="stats-module">
            <div className="block">
                <h3 className="title is-3">
                    Stats
                </h3>
                <h5 className="subtitle is-5">
                    Specify date range to see comments &quot;Appearance count&quot; field changes
                </h5>
            </div>
            <StatsFilters
                filter={filter}
                setStatsFilter={setStatsFilter}
                onApplyFiltersClick={onApplyFiltersClick}
                loaded={loaded}
                setIsLoaded={setIsLoaded}
            />
            {loaded &&
                <StatsTableComponent
                    data={data}
                    showDescription={showDescription}
                />
            }
        </section>
    );
};

/** Statistics module main component */
export default connect(
    ({ stats }: CompositeAppState) => ({ ...stats }),
    {
        setStatsFilter: setFilter,
        setIsLoaded: setLoaded,
        showDescription: showInformationAsync,
        loadStatsData,
    }
)(Stats);
