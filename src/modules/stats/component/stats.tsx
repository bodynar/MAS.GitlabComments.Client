import { useCallback } from 'react';

import { connect } from 'react-redux';

import { StatsRecord } from '@app/models/response/statsRecord';

import { CompositeAppState } from '@app/redux/rootReducer';

import { StatsFilter } from '@app/redux/stats/types';
import { setStatsFilter } from '@app/redux/stats/actions/setStatsFilter';
import { loadStatsData } from '@app/redux/stats/thunks/loadStatsData';

import StatsRecordComponent from '../components/record';
import StatsFilters from '../components/filter';

type StatsProps = {
    /** Fetched statistics data for specified date range */
    data: Array<StatsRecord>;

    /** Current stats module filter */
    filter: StatsFilter;

    /** Save selected filter in app */
    setStatsFilter: (filter: StatsFilter) => void;

    /** Load stats data according to specified filter */
    loadStatsData: (filter: StatsFilter) => void;
};

/** Statistics module main component */
function Stats({ data, filter, setStatsFilter, loadStatsData }: StatsProps): JSX.Element {
    const onApplyFiltersClick = useCallback(() => loadStatsData(filter!), [filter, loadStatsData]);

    return (
        <section className="app-stats">
            <h2 className="my-2">Stats</h2>
            <div className="my-2">heading</div>
            <StatsFilters
                filter={filter}
                setStatsFilter={setStatsFilter}
                onApplyFiltersClick={onApplyFiltersClick}
            />
            <>
                {data.map(x =>
                    <StatsRecordComponent
                        key={x.commentId}
                        {...x}
                    />
                )}
            </>
        </section>
    );
}

/** Statistics module main component */
export default connect(
    ({ stats }: CompositeAppState) => ({ ...stats }),
    { setStatsFilter, loadStatsData }
)(Stats);
