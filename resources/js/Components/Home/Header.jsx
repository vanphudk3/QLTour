import NavLink from "@/Components/NavLink";
import LogoLink from "../LogoLink";
import FocusLink from "../FocusLink";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { Link, usePage } from "@inertiajs/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { isEmpty } from "lodash";
// import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const openDestination = (evt, DesName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(DesName).style.display = "flex";
    evt.currentTarget.className += " active";
};

const defaultOpenDestination = () => {
    document.getElementById("defaultOpenDestination").click();
};

export default function Header() {
    const login = usePage().props.login;
    console.log(login);
    const openNav = (e) => {
        var x = document.getElementById("mySidepanel");
        x.addEventListener("click", closeNav);
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        document.body.style.cursor = "pointer";
    };

    const closeNav = (e) => {
        var x = document.getElementById("mySidepanel");
        x.style.width = "0";
        // document.getElementById("mySidepanel").style.width = "0";
        document.body.style.backgroundColor = "white";
        document.body.style.cursor = "default";
    };

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleChangeSetting = (event) => {
        // setAnchorElUser(null);
    };

    const changeMenu = (e) => {

        if (login.customer == null && login.remember == null) {
            return (
                <>
                    <MenuItem>
                        <Link
                            href={route("customer.login")}
                            active={route().current("customer.login")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            Login
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("customer.register")}
                            active={route().current("customer.register")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            Register
                        </Link>
                    </MenuItem>
                </>
            );
        }else if (login.customer != null && login.remember == null) {
            return (
                <>
                    <MenuItem>
                        <Link
                            href={route("customer.profile")}
                            active={route().current("customer.profile")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("customer.logout")}
                            active={route().current("customer.logout")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            Logout
                        </Link>
                    </MenuItem>
                </>
            );
        }else if (login.customer == null && login.remember != null) {
            return (
                <>
                    <MenuItem>
                        <Link
                            href={route("customer.profile")}
                            active={route().current("customer.profile")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("customer.logout")}
                            active={route().current("customer.logout")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            Logout
                        </Link>
                    </MenuItem>
                </>
            );
        }else if (login.customer != null && login.remember != null) {
            return (
                <>
                    <MenuItem>
                        <Link
                            href={route("customer.profile")}
                            active={route().current("customer.profile")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("customer.logout")}
                            active={route().current("customer.logout")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            Logout
                        </Link>
                    </MenuItem>
                </>
            );
        }
    };

    return (
        <header className="Navigation flex justify-content">
            <div className="navbar-header">
                <LogoLink
                    href={route("welcome")}
                    active={route().current("welcome")}
                    className="flex justify-content"
                >
                    <img src="/images/logo.svg" alt="logo" />
                </LogoLink>
                <div className="menu-navbar">
                    <FocusLink
                        href={route("welcome")}
                        active={route().current("welcome")}
                        className="flex justify-content"
                    >
                        Home
                    </FocusLink>
                    <FocusLink
                        href={route("tour")}
                        active={route().current("tour")}
                    >
                        Tour
                    </FocusLink>
                    <div className="catalogues">
                        <FocusLink
                            href={route("destination")}
                            active={route().current("destination")}
                        >
                            Destination
                        </FocusLink>
                        <div className="dropdown-content">
                            <a href={route("destination")}>
                                All Destination{" "}
                                <i className="fa-solid fa-arrow-right" />
                            </a>

                            <div className="layout-content">
                                <div className="detail-catalogues">
                                    <button
                                        className={"tablinks active"}
                                        onClick={(event) =>
                                            openDestination(event, "TayNamBo")
                                        }
                                        id="defaultOpenDestination"
                                        ref={defaultOpenDestination}
                                    >
                                        Tây Nam Bộ
                                    </button>
                                    <button
                                        className="tablinks active"
                                        onClick={(event) =>
                                            openDestination(event, "DongNamBo")
                                        }
                                    >
                                        Đông Nam Bộ
                                    </button>
                                    <button
                                        className="tablinks active"
                                        onClick={(event) =>
                                            openDestination(event, "MienTrung")
                                        }
                                    >
                                        Miền Trung
                                    </button>
                                    <button
                                        className="tablinks active"
                                        onClick={(event) =>
                                            openDestination(event, "MienBac")
                                        }
                                    >
                                        Miền Bắc
                                    </button>
                                </div>
                                <div className="show-details">
                                    <div
                                        id="TayNamBo"
                                        className="tabcontent"
                                        style={{ flexWrap: "wrap" }}
                                    >
                                        <a href="http://127.0.0.1:8000/destination/du-lich-phu-quoc">
                                            Phú Quốc
                                        </a>
                                        <a href="http://127.0.0.1:8000/destination/du-lich-tien-giang">
                                            Tiền Giang
                                        </a>
                                        <a href="http://127.0.0.1:8000/destination/du-lich-can-tho">
                                            Cần Thơ
                                        </a>
                                        <a href="http://127.0.0.1:8000/destination/du-lich-vinh-long">
                                            Vĩnh Long
                                        </a>
                                        <a href="http://127.0.0.1:8000/destination/du-lich-soc-trang">
                                            Sóc Trăng
                                        </a>
                                        <a href="http://127.0.0.1:8000/destination/du-lich-an-giang">
                                            An Giang
                                        </a>
                                        <a href="#">Kiên Giang</a>
                                        <a href="#">Cà Mau</a>
                                        {/* <a href="#">Bạc Liêu</a> */}
                                    </div>
                                    <div
                                        id="DongNamBo"
                                        className="tabcontent"
                                        style={{ flexWrap: "wrap" }}
                                    >
                                        <a href="#">Đồng Nai</a>
                                        <a href="#">Bà Rịa - Vũng Tàu</a>
                                        <a href="#">Côn Đảo</a>
                                        <a href="#">TP.Hồ Chí Minh</a>
                                        <a href="#">Tây Ninh</a>
                                        <a href="#">Bình Dương</a>
                                        <a href="#">Bình Phước</a>
                                    </div>
                                    <div
                                        id="MienTrung"
                                        className="tabcontent"
                                        style={{ flexWrap: "wrap" }}
                                    >
                                        <a href="#">Huế</a>
                                        <a href="#">Hải Phòng</a>
                                        <a href="#">Hạ Long</a>
                                        <a href="#">Bắc Ninh</a>
                                        <a href="#">Phú Thọ</a>
                                        <a href="#">Thanh Hóa</a>
                                    </div>
                                    <div
                                        id="MienBac"
                                        className="tabcontent"
                                        style={{ flexWrap: "wrap" }}
                                    >
                                        <a href="#">Hà Nội</a>
                                        <a href="#">Hải Phòng</a>
                                        <a href="#">Hạ Long</a>
                                        <a href="#">Bắc Ninh</a>
                                        <a href="#">Phú Thọ</a>
                                        <a href="#">Lào Cai</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="http://127.0.0.1:5500/components/blog.html">
                        Blog
                    </a>
                    <a href="http://127.0.0.1:5500/components/aboutUs.html">
                        Page
                    </a>
                    <a href="http://127.0.0.1:5500/components/contact.html">
                        Contact
                    </a>
                </div>
                <div className="contact-navbar">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>

                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <AccountCircleIcon sx={{ width: 32, height: 32 }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {changeMenu()}
                    </Menu>

                    <div className="menu-mobile">
                        <button
                            type="button"
                            className="openbtn"
                            onClick={(event) => openNav(event)}
                        >
                            <i className="fa-solid fa-bars" />
                        </button>
                    </div>
                    <div id="mySidepanel" className="sidepanel">
                        <a
                            href="javascript:void(0)"
                            className="closebtn"
                            onClick={(event) => closeNav(event)}
                        >
                            <i className="fa-solid fa-xmark" />
                        </a>
                        <a href="#home">Home</a>
                        <a href="#tour">Tour</a>
                        <a href="#news" className="dropdown-btn">
                            Destination
                            <i className="fa-solid fa-chevron-down" />
                        </a>
                        <div className="dropdown-container">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                        <a href="#blog">Blog</a>
                        <a href="#page">Page</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
            </div>
        </header>
    );
}
