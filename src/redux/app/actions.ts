import { createAction } from "@reduxjs/toolkit";

import { SysVariable } from "@app/models/app";

/** Set app loading state flag */
export const setIsLoadingState = createAction<boolean>("mas.gc/setAppIsLoading");

/** Set tab is focused */
export const setTabIsFocused = createAction<boolean>("mas.gc/setTabIsFocused");

/** Set application readonly mode state */
export const setReadOnlyMode = createAction<boolean>("mas.gc/setReadOnlyMode");

/** Set dark mode state for app */
export const setDarkMode = createAction<boolean>("mas.gc/setDarkMode");

/** Save loaded system variables */
export const setVariables = createAction<Array<SysVariable>>("mas.gc/setVariables");
