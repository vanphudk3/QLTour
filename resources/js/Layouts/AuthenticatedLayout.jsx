import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import NavLinkB from "@/Components/Bootstrap/NavLink";
import LogoLinkB from "@/Components/Bootstrap/LogoLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { usePage } from "@inertiajs/react";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <div className="bd-btn">
            <nav class="navbar navbar-expand-lg bg-body-tertiary bd-btn shadow">
                <div
                    class="container-fluid"
                    style={{ padding: "0 20px 0 20px" }}
                >
                    <LogoLinkB
                        className="navbar-brand"
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        <img
                            src="../images/logo.svg"
                            alt="Zourner"
                            width="120"
                            height="24"
                            style={{ marginRight: "20px" }}
                        />
                    </LogoLinkB>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                        class="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NavLinkB
                                    aria-current="page"
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </NavLinkB>
                            </li>
                            <li class="nav-item">
                                {auth.user.role == "admin" ? (
                                    <NavLinkB
                                        aria-current="page"
                                        href={route("role.index")}
                                        active={route().current("role.index")}
                                    >
                                        Role
                                    </NavLinkB>
                                ) : auth.user.role == "manager" ? (
                                    <NavLinkB
                                        aria-current="page"
                                        href={route("managerblog.index")}
                                        active={route().current("managerblog.index")}
                                    >
                                        Blog
                                    </NavLinkB>
                                ) : (
                                    <NavLinkB
                                        aria-current="page"
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Blog
                                    </NavLinkB>
                                )}
                            </li>
                            <li class="nav-item">
                                <NavLinkB
                                    aria-current="page"
                                    href={route("account.index")}
                                    active={route().current("account.index")}
                                >
                                    Account
                                </NavLinkB>
                            </li>
                            <li class="nav-item">
                                <NavLinkB
                                    aria-current="page"
                                    href={route("question.index")}
                                    active={route().current("question.index")}
                                >
                                    Q&A
                                </NavLinkB>
                            </li>
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Manage Tour
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <NavLinkB
                                            aria-current="page"
                                            href={route("category.index")}
                                            active={route().current(
                                                "category.index"
                                            )}
                                        >
                                            Category
                                        </NavLinkB>
                                    </li>
                                    <li>
                                        <NavLinkB
                                            aria-current="page"
                                            href={route("location.index")}
                                            active={route().current(
                                                "location.index"
                                            )}
                                        >
                                            Location
                                        </NavLinkB>
                                    </li>
                                    <li>
                                        <NavLinkB
                                            aria-current="page"
                                            href={route("extraService.index")}
                                            active={route().current(
                                                "extraService.index"
                                            )}
                                        >
                                            Extra Service
                                        </NavLinkB>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li>
                                        <NavLinkB
                                            aria-current="page"
                                            href={route("managerTour.index")}
                                            active={route().current(
                                                "managerTour.index"
                                            )}
                                        >
                                            Tour
                                        </NavLinkB>
                                    </li>
                                    <li>
                                        <NavLinkB
                                            aria-current="page"
                                            href={route("schedule.index")}
                                            active={route().current(
                                                "schedule.index"
                                            )}
                                        
                                        >
                                            Schedule Tour
                                        </NavLinkB>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <NavLinkB
                                    aria-current="page"
                                    href={route("order.index")}
                                    active={route().current("order.index")}
                                >
                                    Order
                                </NavLinkB>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        <div className="sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                <div class="btn-group">
                                    <button
                                        class="btn btn-sm dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ padding: 0 }}
                                    >
                                        {auth.user.name}
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                        </li>
                                        <li>
                                            <Dropdown.Link
                                                method="post"
                                                href={route("logout")}
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white" style={{ marginTop: "25px" }}>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
