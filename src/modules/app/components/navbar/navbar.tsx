import React from "react";

import GitLabLogo from '../gitlabLogo/gitlabLogo';

type NavbarProps = {

};

export default function Navbar({ }: NavbarProps): JSX.Element {
    return (
        <nav
            className="navbar is-link"
            role="navigation"
            aria-label="main navigation"
        >
            <GitLabLogo />
            <div
                className="navbar-menu"
            >
                <div className="navbar-start">
                    <a className="navbar-item">
                        Home
                    </a>
                    <a className="navbar-item">
                        Documentation
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
