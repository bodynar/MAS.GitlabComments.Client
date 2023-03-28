import { AppState } from "@app/redux/app";
import { NotificatorState } from "@app/redux/notificator";
import { CommentsState } from "./comments/types";
import { ModalState } from "./modal/types";
import { StatsState } from "./stats/types";

/** Redux action */
export interface Action {
    /** Unique action code */
    type: string;
}

/** Redux action with some extra payload */
export interface ActionWithPayload extends Action {
    /** Action payload data */
    payload: {
        [extraProps: string]: unknown;
    };
}

/** Global application state */
export interface CompositeAppState {
    /** Modal box state */
    modal: ModalState;

    /** Notifications module state */
    notificator: NotificatorState;

    /** State of comments module */
    comments: CommentsState;

    /** Is browser tab with app is in focus */
    app: AppState;

    /** Statistics module state */
    stats: StatsState;
}
