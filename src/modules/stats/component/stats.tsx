import { useCallback } from "react";

import { connect } from "react-redux";

import { StatsRecord } from "@app/models";

import { CompositeAppState } from "@app/redux/rootReducer";

import { StatsFilter } from "@app/redux/stats/types";
import { getSetStatsFilterAction } from "@app/redux/stats/actions/setStatsFilter";
import { loadStatsData } from "@app/redux/stats/thunks/loadStatsData";
import { getSetStatsLoadedStateAction } from "@app/redux/stats/actions/setStatsLoadingState";

import { showDescription } from "@app/redux/comments/thunks";

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
function Stats({
    data, filter, loaded,
    setStatsFilter, loadStatsData,
    showDescription, setIsLoaded
}: StatsProps): JSX.Element {
    const onApplyFiltersClick = useCallback(() => loadStatsData(filter), [filter, loadStatsData]);

    return (
        <section className="app-stats">
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
            {loaded === true &&
                <StatsTableComponent
                    data={data}
                    filter={filter}
                    showDescription={showDescription}
                />
            }
        </section>
    );
}

/** Statistics module main component */
export default connect(
    ({ stats }: CompositeAppState) => ({ ...stats }),
    {
        setStatsFilter: getSetStatsFilterAction,
        setIsLoaded: getSetStatsLoadedStateAction,
        loadStatsData, showDescription,
    }
)(Stats);
