import { createAction } from "@reduxjs/toolkit";

import { ModalParams } from "@app/models/modal";

/**
 * @constant
 * Open modal redux store action type
 */
export const open = createAction<string | ModalParams>("mas.gc/modal/open");

/**
 * @constant
 * Close modal redux store action type
 */
export const close = createAction("mas.gc/modal/close");

