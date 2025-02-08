import { createAction } from "@reduxjs/toolkit";

import { HttpRequest, SysVariable } from "@app/models/app";

/** Append http request to queue */
export const appendRequest = createAction<HttpRequest>("mas.gc/appendHttpRequest");

/** Remove specific http request from queue */
export const removeRequest = createAction<string>("mas.gc/removeHttpRequest");

/** Set tab is focused */
export const setTabIsFocused = createAction<boolean>("mas.gc/setTabIsFocused");

/** Set application readonly mode state */
export const setReadOnlyMode = createAction<boolean>("mas.gc/setReadOnlyMode");

/** Set dark mode state for app */
export const setDarkMode = createAction<boolean>("mas.gc/setDarkMode");

/** Save loaded system variables */
export const setVariables = createAction<Array<SysVariable>>("mas.gc/setVariables");
