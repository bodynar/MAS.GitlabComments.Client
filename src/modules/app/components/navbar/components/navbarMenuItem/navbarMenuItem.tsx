import React from "react";

import './navbarMenuItem.scss';

import { MenuItem } from "../../menu";

import Anchor from "@app/sharedComponents/anchor";

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

/** Navar menu item component */
export default function NavbarMenuItem({ item, isActive, onClick, isSingle }: NavbarMenuItemProps): JSX.Element {
    const href: string | undefined =
        item.disabled === true || isActive
            ? undefined
            : item.link;

    let className = 'app-navbar__item is-unselectable';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isActive, item.disabled, onClick]);

    return (
        <Anchor
            className={className}
            href={href}
            caption={item.caption}
            onClick={onHrefClick}
            disableHovering={true}
        />
    );
}
