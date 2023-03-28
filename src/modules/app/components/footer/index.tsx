import { version } from "package.json";

import { isStringEmpty } from "@bodynarf/utils";
import Anchor from "@bodynarf/react.components/components/anchor";

import "./footer.scss";

type FooterProps = {
    /** Class for navbar */
    className: string;
};

/**
 * App footer component
 * @throws Classname prop parameter is empty
 */
export default function Footer({ className }: FooterProps): JSX.Element {
    if (isStringEmpty(className)) {
        throw new Error("className is empty");
    }

    return (
        <footer className={`${className} app-footer`}>
            <div className="app-footer__left">
                You are viewing GitlabComments app version {version}.{"\n"}
                Gitlab logo icon is owned by GitLab Inc.
            </div>
            <div className="app-footer__right">
                <span className="app-footer__line">
                    Contact author via mail:
                    <Anchor
                        href="mailto:bodynar@gmail.com?subject=GitlabComments - Question&Body="
                        icon={{ name: "envelope", position: "right" }}
                    />
                </span>
                <span className="app-footer__line">
                    If you experience any issues - please, form a request:
                    <Anchor
                        href="https://github.com/bodynar/MAS.GitlabComments.Client/issues/new?assignees=bodynar&labels=&template=bug_report.md&title=%5BBug%5D"
                        className="footer__icon"
                        icon={{ name: "github", position: "right" }}
                        target={"_blank"}
                    />
                </span>
            </div>
        </footer>
    );
}
