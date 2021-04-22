import React from 'react';

import { version } from 'package.json';

import './footer.scss';

import { isStringEmpty } from 'utils/common';

type FooterProps = {
    /** Class for navbar */
    className: string;
};

/** App footer component */
export default function Footer({ className }: FooterProps): JSX.Element {
    if (isStringEmpty(className)) {
        throw new Error("className is empty");
    }


    return (
        <footer className={`${className} app-footer`}>
            <div className="app-footer__left">
                You viewing GitlabComments app version {version}.{'\n'}
                Gitlab icon is owned by GitLab Inc.
            </div>
            <div className="app-footer__right">

            </div>
        </footer>
    );
}
