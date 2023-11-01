import { useLocation } from "react-router-dom";

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

    return (
        <nav
            className={`${className} app-navbar navbar is-link`}
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
