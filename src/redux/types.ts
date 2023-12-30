import { AppState } from "@app/redux/app";
import { NotificatorState } from "@app/redux/notificator";
import { StatsState } from "@app/redux/stats";
import { CommentsState } from "@app/redux/comments";
import { ModalState } from "@app/redux/modal";

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
