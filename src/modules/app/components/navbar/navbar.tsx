import React, { useState } from "react";

import './navbar.scss';

import GitLabLogo from '../gitlabLogo/gitlabLogo';

import { MenuItem, menuItems } from './menu';

export default function Navbar(): JSX.Element {
    const [activeMenuItem, setActiveMenuItem] = useState<string>(menuItems[0].name);

    return (
        <nav
            className="app-navbar navbar is-link"
            role="navigation"
            aria-label="main navigation"
        >
            <GitLabLogo />
            <div className="navbar-menu" >
                <div className="navbar-start">
                    {menuItems.map(menuItem =>
                        <NavbarMenuItem
                            key={menuItem.name}
                            item={menuItem}
                            isSingle={menuItems.length === 1}
                            isActive={menuItem.name === activeMenuItem}
                            onClick={setActiveMenuItem}
                        />
                    )}
                </div>
                <div className="navbar-end">

                </div>
            </div>
        </nav>
    );
}

type NavbarMenuItemProps = {
    /** Menu item configuration */
    item: MenuItem;

    /** Is single item. Will affect on styles */
    isSingle: boolean;

    /** Is menu item active */
    isActive: boolean;

    /** Menu item click handler*/
    onClick: (name: string) => void;
};

/** Navar menu item */
const NavbarMenuItem = ({ item, isActive, onClick, isSingle }: NavbarMenuItemProps): JSX.Element => {
    const href: string | undefined =
        item.disabled === true || isActive
            ? undefined
            : item.link;

    let className = 'app-navbar__item';

    if (isSingle) {
        className += ' app-navbar__item--single';
    } else {
        if (item.disabled === true) {
            className += ' app-navbar__item--disabled';
        }
        if (isActive) {
            className += ' app-navbar__item--active';
        }
    }

    const onHrefClick = React.useCallback(
        () => {
            if (item.disabled !== true && !isActive) {
                onClick(item.name);
            }
        }, [isActive, item.disabled, item.name, onClick]);

    return (
        <a
            className={className}
            href={href}
            onClick={onHrefClick}
        >
            {item.caption}
        </a>
    );
};
