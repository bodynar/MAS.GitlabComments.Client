import React from 'react';

import GitlabLogoIcon from 'icons/gitlabLogo';

import './gitlabLogo.scss';

// TODO: extract svg into file and import
export default function GitlabLogo(): JSX.Element {
    return (
        <div className="navbar-brand app-navbar">
            <div className="app-navbar__brand">

                <a className="app-navbar__logo">
                    <GitlabLogoIcon />
                    <span className="app-navbar__name">
                        Gitlab Comments
                    </span>
                </a>
            </div>

        </div>
    );
}
