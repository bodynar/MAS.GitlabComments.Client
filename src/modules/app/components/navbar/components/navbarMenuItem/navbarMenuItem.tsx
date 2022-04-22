import { useCallback } from "react";

import { Link } from "react-router-dom";

import './navbarMenuItem.scss';
import './navbarMenuItem.dark.scss';

import { MenuItem } from "../../menu";

type NavbarMenuItemProps = {
    /** Menu item configuration */
    item: MenuItem;

    /** Is menu item active */
    isActive: boolean;

    /** Menu item click handler*/
    onClick: (name: string) => void;
};

/** Navar menu item component */
export default function NavbarMenuItem({ item, isActive, onClick }: NavbarMenuItemProps): JSX.Element {
    let className = 'app-navbar__item is-unselectable';

    if (item.disabled === true) {
        className += ' app-navbar__item--disabled';
    }
    if (isActive) {
        className += ' app-navbar__item--active';
    }

    const onHrefClick = useCallback(
        () => {
            if (item.disabled !== true && !isActive) {
                onClick(item.name);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isActive, item.disabled, onClick]);

    if (item.disabled === true || isActive) {
        return (
            <span
                className={className}
            >
                {item.caption}
            </span>
        );
    } else {
        return (
            <Link
                className={className}
                to={item.link}
                onClick={onHrefClick}
            >
                {item.caption}
            </Link>
        );
    }
}
