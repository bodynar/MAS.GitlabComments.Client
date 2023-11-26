import { useLocation } from "react-router-dom";

import { getClassName } from "@bodynarf/utils";

import "./style.scss";
import "./style.dark.scss";

import { menuItems } from "@app/modules/app/routes";

import { NavbarBrand, Bell, NavbarMenuItem, ViewModeSwitcher } from "../components";

interface NavbarProps {
    /** Class for navbar */
    className: string;
}

/**
 * App navigation bar component
 */
export default function Navbar({
    className,
}: NavbarProps): JSX.Element {
    const { pathname } = useLocation();
    const activeItem = menuItems.find(({ link }) => pathname === link)?.name || menuItems[0].name;

    const containerClassName = getClassName([
        className,
        "app-navbar",
        "navbar",
        "is-link"
    ]);

    return (
        <nav
            className={containerClassName}
            role="navigation"
            aria-label="main navigation"
        >
            <NavbarBrand />
            <div className="navbar-menu" >
                <div className="navbar-start">
                    {menuItems
                        .sort((x, y) => x.order - y.order)
                        .map(menuItem =>
                            menuItem.customDisplay
                            ??
                            <NavbarMenuItem
                                key={menuItem.name}
                                item={menuItem}
                                isActive={menuItem.name === activeItem}
                            />
                        )}
                </div>
                <div className="navbar-end">
                    <ViewModeSwitcher />
                    <Bell />
                </div>
            </div>
        </nav>
    );
}
