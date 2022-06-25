import { useCallback } from 'react';

import { connect } from 'react-redux';

import { StatsRecord } from '@app/models/response/statsRecord';

import { CompositeAppState } from '@app/redux/rootReducer';

import { StatsFilter } from '@app/redux/stats/types';
import { setStatsFilter } from '@app/redux/stats/actions/setStatsFilter';
import { loadStatsData } from '@app/redux/stats/thunks/loadStatsData';

import { showDescription } from '@app/redux/comments/thunks';

import StatsFilters from '../components/filter';
import StatsTableComponent from '../components/table';

type StatsProps = {
    /** Fetched statistics data for specified date range */
    data: Array<StatsRecord>;

    /** Current stats module filter */
    filter: StatsFilter;

    /** Save selected filter in app */
    setStatsFilter: (filter: StatsFilter) => void;

    /** Load stats data according to specified filter */
    loadStatsData: (filter: StatsFilter) => void;

    /** Show comment description */
    showDescription: (commentId: string) => void;
};

/** Statistics module main component */
function Stats({
    data, filter,
    setStatsFilter, loadStatsData,
    showDescription
}: StatsProps): JSX.Element {
    const onApplyFiltersClick = useCallback(() => loadStatsData(filter), [filter, loadStatsData]);

    return (
        <section className="app-stats">
            <h2 className="my-2">Stats</h2>
            <div className="my-2">heading</div>
            <StatsFilters
                filter={filter}
                setStatsFilter={setStatsFilter}
                onApplyFiltersClick={onApplyFiltersClick}
            />
            <StatsTableComponent
                data={data}
                filter={filter}
                showDescription={showDescription}
            />
        </section>
    );
}

/** Statistics module main component */
export default connect(
    ({ stats }: CompositeAppState) => ({ ...stats }),
    { setStatsFilter, loadStatsData, showDescription }
)(Stats);
