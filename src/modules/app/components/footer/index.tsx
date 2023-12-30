import { version } from "package.json";

import { getClassName } from "@bodynarf/utils";
import { ElementSize } from "@bodynarf/react.components";
import Anchor from "@bodynarf/react.components/components/anchor";

import "./style.scss";

interface FooterProps {
    /** Class for navbar */
    className: string;
}

/**
 * App footer component
 */
export default function Footer({
    className,
}: FooterProps): JSX.Element {
    const containerClassName = getClassName([
        className,
        "app-footer",
        "is-italic",
        "mt-4"
    ]);

    return (
        <footer className={containerClassName}>
            <div className="app-footer__left">
                You are viewing GitlabComments app version {version}.{"\n"}
                Gitlab logo icon is owned by GitLab Inc.
            </div>
            <div className="app-footer__right">
                <span className="app-footer__line">
                    Contact author via mail:
                    <Anchor
                        href="mailto:bodynar@gmail.com?subject=GitlabComments - Question&Body="
                        icon={{
                            name: "envelope",
                            position: "right",
                            size: ElementSize.Medium,
                        }}
                    />
                </span>
                <span className="app-footer__line">
                    If you experience any issues - please, form a request:
                    <Anchor
                        href="https://github.com/bodynar/MAS.GitlabComments.Client/issues/new?assignees=bodynar&labels=&template=bug_report.md&title=%5BBug%5D"
                        className="footer__icon"
                        icon={{
                            name: "github",
                            position: "right",
                            size: ElementSize.Medium
                        }}
                        target={"_blank"}
                    />
                </span>
            </div>
        </footer>
    );
}
