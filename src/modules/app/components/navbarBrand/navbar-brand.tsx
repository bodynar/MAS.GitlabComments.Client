import React from 'react';

import './navbar-brand.scss';

import GitlabLogoIcon from '@app/icons/gitlabLogo';

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
