import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { StatsFilter, StatsRecord } from "@app/models/stats";

import { read } from "@app/core/stats";

import { CompositeAppState } from "@app/redux";
import { setData, setLoaded } from "@app/redux/stats";
import { setIsLoadingState } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";

/**
 * Get fetch stats data redux action
 * @param filter Values to filter stats data
 * @returns Redux action to fetch stats data and update stats module state
 */
export const loadStatsData = (filter: StatsFilter): ThunkAction<void, CompositeAppState, unknown, Action> =>
    (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>
    ): void => {
        dispatch(setIsLoadingState(true));
        dispatch(setLoaded(false));

        const [, showError] = getNotifications(dispatch);

        read(filter)
            .then((rawData: Array<any>) => {
                dispatch(
                    setData(
                        rawData.map(x => ({
                            ...x,
                            text: x["commentText"],
                        }) as StatsRecord)
                            .sort(({ count }, y) => y.count - count)
                    )
                );

                dispatch(setIsLoadingState(false));
                dispatch(setLoaded(true));
            })
            .catch(error => {
                dispatch(setLoaded());
                showError(error);
            });
    };
