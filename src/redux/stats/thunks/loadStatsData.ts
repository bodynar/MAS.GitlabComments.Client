import { ThunkAction, ThunkDispatch } from "redux-thunk";

import moment, { unitOfTime } from "moment";

import { get } from "@app/utils/delayedApi";

import { StatsRecord } from "@app/models/response/statsRecord";

import { CompositeAppState } from "@app/redux/rootReducer";
import { ActionWithPayload } from "@app/redux/types";

import { getSetAppIsLoadingAction } from "@app/redux/app/actions/setAppIsLoading";

import { setStatsData } from "../actions/setStatsData";

import { DateRange, StatsFilter } from "../types";
import { setError } from "@app/redux/app/utils";

/**
 * Get fetch stats data redux action
 * @param filter Values to filter stats data
 * @returns Redux action to fetch stats data and update stats module state
 */
export const loadStatsData = (filter: StatsFilter): ThunkAction<void, CompositeAppState, unknown, ActionWithPayload> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, ActionWithPayload>,
        getState: () => CompositeAppState
    ): void => {
        dispatch(getSetAppIsLoadingAction(true));

        const searchParams = getSearchParams(filter);

        get<Array<StatsRecord>>(`/api/stats/top${searchParams}`)
            .then((statsData: Array<StatsRecord>) => {
                dispatch(setStatsData(statsData));

                dispatch(getSetAppIsLoadingAction(false));
            })
            .catch(setError(dispatch, getState));
    };

/**
* Build search query api part from stats filter
* @param filter Values to filter stats data
* @returns Search query api route part
*/
const getSearchParams = (filter: StatsFilter): string => {
    const params = new URLSearchParams();

    if (filter.type === DateRange.Manual) {
        const leftDate = moment(filter.leftDate!).startOf('date');
        const rightDate = moment(filter.rightDate!).startOf('date');

        params.append('endDate', rightDate.format());
        params.append('startDate', leftDate.format());
    } else {
        const rightDate = moment().startOf('date');
        let period: unitOfTime.DurationConstructor = 'month';

        switch (filter.type) {
            case DateRange.Month:
                period = 'month';
                break;

            case DateRange.Week:
                period = 'week';
                break;

            case DateRange.Year:
                period = 'year';
                break;
        }

        const leftDate = rightDate.clone().add(-1, period);

        params.append('endDate', rightDate.format());
        params.append('startDate', leftDate.format());
    }

    return `?${params}`;
};
