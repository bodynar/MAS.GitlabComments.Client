import { Action } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { StatsFilter, StatsRecord } from "@app/models/stats";

import { read } from "@app/core/stats";

import { CompositeAppState } from "@app/redux";
import { setData, setLoaded } from "@app/redux/stats";
import { registerHttpRequest } from "@app/redux/app";
import { getNotifications } from "@app/redux/notificator";

/**
 * Get fetch stats data redux action
 * @param filter Values to filter stats data
 * @returns Redux action to fetch stats data and update stats module state
 */
export const loadStatsData = (filter: StatsFilter): ThunkAction<Promise<void>, CompositeAppState, unknown, Action> =>
    async (dispatch: ThunkDispatch<CompositeAppState, unknown, Action>): Promise<void> => {
        dispatch(setLoaded(false));

        const [_, onRequestCompleted] = registerHttpRequest(dispatch);
        const [, showError] = getNotifications(dispatch);

        try {
            const rawData: Array<any> = await read(filter);

            dispatch(
                setData(
                    rawData
                        .map(x => ({
                            ...x,
                            text: x["commentText"],
                        }) as StatsRecord)
                        .sort(({ count }, y) => y.count - count)
                )
            );

            dispatch(setLoaded(true));
        } catch (error) {
            dispatch(setLoaded());
            showError(error as Error | string);
        }

        onRequestCompleted();
    };
