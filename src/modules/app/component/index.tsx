import { FC, useCallback, useEffect } from "react";

import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getClassName, isNullOrEmpty, isNullOrUndefined } from "@bodynarf/utils";

import "./style.scss";
import "../../../shared/styles/globalStyles.scss";
import "../../../shared/styles/darkStyles.scss";

import { CompositeAppState } from "@app/redux";
import { getReadOnlyMode, setTabIsFocused } from "@app/redux/app";
import { setHighlightedComment } from "@app/redux/comments";

import ModalBox from "@app/modules/modalBox";

import Notificator from "../components/notificator";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AppContent from "../components/content";
import LoaderWrap from "../components/loadingWrap";

/** Props of `App` */
type AppProps = {
    /** Comment identifiers */
    commentIds: Array<string>;

    /**
     * Is app currently loading something important.
     * If so - covers content with loading gif block
    */
    isLoading: boolean;

    /** Is app in dark mode */
    isDarkMode: boolean;

    /** Is comment module initialized */
    commentModuleLoaded: boolean;

    /** Is application in read only mode */
    readOnlyMode?: boolean;

    /** Read readonly mode value and save it in store */
    getReadOnlyMode: () => void;

    /** Store state of app tab focus */
    setTabIsFocused: (isFocused: boolean) => void;

    /**
     * Save comment identifier to highlight
     * @param commentId Comment identifier
     */
    setHighlightedComment: (commentId: string) => void;
};

/** Root app component */
const App: FC<AppProps> = ({
    isLoading, isDarkMode, readOnlyMode,
    setTabIsFocused, getReadOnlyMode,
    commentIds, setHighlightedComment, commentModuleLoaded,
}) => {
    const onFocus = useCallback(() => setTabIsFocused(true), [setTabIsFocused]);
    const onBlur = useCallback(() => setTabIsFocused(false), [setTabIsFocused]);

    useEffect(() => {
        if (isNullOrUndefined(readOnlyMode)) {
            getReadOnlyMode();
        }
    }, [getReadOnlyMode, readOnlyMode]);

    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);

        return (): void => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
    }, [onBlur, onFocus]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.hash.length === 0) {
            return;
        }

        const pathName = location.pathname.substring(1);

        if (pathName.length !== 0) {
            return;
        }

        if (pathName !== "" || !commentModuleLoaded) {
            return;
        }

        const commentId = location.hash.substring(1);

        if (isNullOrEmpty(commentId)) {
            navigate({ ...location, hash: undefined });
            return;
        }

        if (!commentIds.includes(commentId)) {
            navigate({ ...location, hash: undefined });
            return;
        }

        setHighlightedComment(commentId);

        navigate({ ...location, hash: undefined });
    }, [commentIds, commentModuleLoaded, location, location.hash, location.pathname, navigate, setHighlightedComment]);

    const className = getClassName([
        "app",
        isDarkMode ? "app--dark" : "",
        isLoading ? "app--loading" : "",
    ]);

    return (
        <main className={className}>
            <LoaderWrap
                loading={isLoading}
            >
                <section className="app__container">
                    <Navbar className="app__navbar" />
                    <Notificator />
                    <ModalBox />
                    <section className="app__content container">
                        <AppContent
                            isReadOnly={readOnlyMode === true}
                        />
                    </section>
                    <Footer className="app__footer" />
                </section>
            </LoaderWrap>
        </main>
    );
};

export default connect(
    ({ app, comments }: CompositeAppState) => ({
        readOnlyMode: app.readOnlyMode,
        isDarkMode: app.isDarkMode ?? false,
        isLoading: app.loading,
        commentIds: comments.comments.map(({ id }) => id),
        commentModuleLoaded: comments.state === "idle",
    }),
    {
        setTabIsFocused: setTabIsFocused,
        getReadOnlyMode: getReadOnlyMode,
        setHighlightedComment
    }
)(App);
