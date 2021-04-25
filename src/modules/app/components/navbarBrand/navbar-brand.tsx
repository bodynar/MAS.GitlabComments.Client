import React from 'react';

import GitlabLogoIcon from 'icons/gitlabLogo';

import './navbar-brand.scss';

/** Navbar app brand */
export default function NavbarBrand(): JSX.Element {
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
