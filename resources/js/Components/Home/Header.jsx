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
import {
    Avatar,
    Menu,
    MenuItem,
    Tooltip,
    TextField,
    Autocomplete,
} from "@mui/material";
import { Link, router, usePage } from "@inertiajs/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SplitButton from "../../Components/DropdownButton";
import { isEmpty } from "lodash";
import HeaderMobile from "./HeaderMobile";
import { event } from "jquery";
import { useState } from "react";
import { useEffect } from "react";
import NavLinkB from "@/Components/Bootstrap/NavLink";
// import { useState } from "react";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
// import MenuItem from '@mui/material/MenuItem';
import MenuList from "@mui/material/MenuList";

// const options = [`<img src="https://dichthuatphuongdong.com/tienich/uploads/flags/shiny/24x24/gb.png"></img> English`, `<img src="https://dichthuatphuongdong.com/tienich/uploads/flags/shiny/24x24/vn.png"></img> Vietnamese`];
const options = [
    <div className="flex justify-content">
        <img src="https://dichthuatphuongdong.com/tienich/uploads/flags/shiny/24x24/gb.png"></img>
        <span style={{ marginLeft: "5px" }}>English</span>
    </div>,
    <div className="flex justify-content">
        <img src="https://dichthuatphuongdong.com/tienich/uploads/flags/shiny/24x24/vn.png"></img>
        <span style={{ marginLeft: "5px" }}>Vietnamese</span>
    </div>,
];

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
    const login = usePage().props?.login;
    let lang = usePage().props.lang;
    let _lang = usePage().props._lang;
    const numberFormat = (value) => {
        if(_lang == 'en')
        value = value * 0.000040;
        return new Intl.NumberFormat(lang['vi-VN'], {
            style: "currency",
            currency: lang['VND'],
        }).format(value);
    };
    // console.log(_lang);
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

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(_lang == "en" ? 0 : 1);
    // if (localStorage?.getItem("language") == "en") {
    //     setSelectedIndex(0);
    // } else {
    //     setSelectedIndex(1);
    // }


    const handleClick = () => {
        // console.info(`You clicked ${options[selectedIndex]}`);
        // xử lý chuyển ngôn ngữ
        

    };

    const handleMenuItemClick = async (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        let url = window.location.href;
        // const newUrl;
        if (index == 0) {
        // url.replace("vi", "en");
            
            router.replace(url.replace("vi", "en"));


            // router.replace("?lang=en");
        } else {
            // newUrl = url.replace("en", "vi");

            router.replace(url.replace("en", "vi"));

            // router.replace("?lang=vi");
            // localStorage.setItem("language", "vi");
        }

    };
    const getLanguage = async (index) => {
        const response = await fetch("api/language/" + index == 0 ? "en" : "vi", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
    }
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const changeMenu = (e) => {
        if (login.customer == null && login.remember == null) {
            return (
                <>
                    <MenuItem>
                        <Link
                            href={route("customer.login-locale", {
                                locale: _lang,
                            })}
                            active={route().current("customer.login")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            {lang["Login"]}
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("customer.register-locale", {
                                locale: _lang,
                            })}
                            active={route().current("customer.register")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            {lang["Register"]}
                        </Link>
                    </MenuItem>
                </>
            );
        } else if (login.customer != null && login.remember == null) {
            return (
                <>
                    <MenuItem>
                        <Link
                            href={route("customer.profile-locale", {
                                locale: _lang,
                            })}
                            active={route().current("customer.profile")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            {lang["Profile"]}
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("customer.logout-locale", {
                                locale: _lang,
                            })}
                            active={route().current("customer.logout")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            {lang["Logout"]}
                        </Link>
                    </MenuItem>
                </>
            );
        } else if (login.customer == null && login.remember != null) {
            return (
                <>
                    <MenuItem>
                        <Link
                            href={route("customer.profile-locale", {
                                locale: _lang,
                            })}
                            active={route().current("customer.profile")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            {lang["Profile"]}
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("customer.logout-locale", {
                                locale: _lang,
                            })}
                            active={route().current("customer.logout")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            {lang["Logout"]}
                        </Link>
                    </MenuItem>
                </>
            );
        } else if (login.customer != null && login.remember != null) {
            return (
                <>
                    <MenuItem>
                        <Link
                            href={route("customer.profile-locale", {
                                locale: _lang,
                            })}
                            active={route().current("customer.profile")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            {lang["Profile"]}
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("customer.logout-locale", {
                                locale: _lang,
                            })}
                            active={route().current("customer.logout")}
                            className="flex justify-content text-decor-none cl-black cl-primary-hover"
                        >
                            {lang["Logout"]}
                        </Link>
                    </MenuItem>
                </>
            );
        }
    };

    const [getTour, setGetTour] = useState([]);
    const handleSearch = (e) => {
        e.preventDefault();
        const search = document.getElementById("search").value;
        if (search != "") {
            const getTour = async () => {
                const response = await fetch("/api/search/" + search, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setGetTour(data.tours);
            };
            getTour();
        } else {
            setGetTour([]);
        }
    };
    return (
        <header className="Navigation flex justify-content">
            <div className="navbar-header">
                <LogoLink
                    href={route("welcome-locale", {
                        // locale: localStorage.getItem("language"),
                        locale: _lang,
                    })}
                    active={route().current("welcome")}
                    className="flex justify-content"
                >
                    <img src="/images/logo.svg" alt="logo" />
                </LogoLink>
                <div className="menu-navbar">
                    <FocusLink
                        href={route("welcome-locale", {
                            // locale: localStorage.getItem("language"),
                            locale: _lang,
                        })}
                        active={route().current("welcome")}
                        className="flex justify-content"
                    >
                        {lang["Home"]}
                    </FocusLink>
                    <FocusLink
                        href={route("tour-locale", {
                            // locale: localStorage.getItem("language"),
                            locale: _lang,
                        })}
                        active={route().current("tour")}
                    >
                        Tour
                    </FocusLink>
                    <div className="catalogues">
                        <FocusLink
                            href={route("destination-locale", {
                                // locale: localStorage.getItem("language"),
                                locale: _lang,
                            })}
                            active={route().current("destination")}
                        >
                            {lang["Destination"]}
                        </FocusLink>
                        <div className="dropdown-content">
                            <a href={route("destination-locale", {
                                // locale: localStorage.getItem("language"),
                                locale: _lang,
                            })}>
                                {lang['All Destination']}{" "}
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
                                        <a href={`http://127.0.0.1:8000/destination/du-lich-phu-quoc?lang=${_lang}`}>
                                            Phú Quốc
                                        </a>

                                        <a href={`http://127.0.0.1:8000/destination/du-lich-tien-giang?lang=${_lang}`}>
                                            Tiền Giang
                                        </a>
                                        <a href={`http://127.0.0.1:8000/destination/du-lich-can-tho?lang=${_lang}`}>
                                            Cần Thơ
                                        </a>
                                        <a href={`http://127.0.0.1:8000/destination/du-lich-vinh-long?lang=${_lang}`}>
                                            Vĩnh Long
                                        </a>
                                        <a href={`http://127.0.0.1:8000/destination/du-lich-soc-trang?lang=${_lang}`}>
                                            Sóc Trăng
                                        </a>
                                        <a href={`http://127.0.0.1:8000/destination/du-lich-an-giang?lang=${_lang}`}>
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
                    <FocusLink
                        href={route("blog-locale", {
                            // locale: localStorage.getItem("language"),
                            locale: _lang,
                        })}
                        active={route().current("blog")}
                        className="flex justify-content"
                    >
                        {lang['Blog']}
                    </FocusLink>
                    {/* <a href="http://127.0.0.1:5500/components/aboutUs.html">
                        {lang['About']}
                    </a>
                    <a href="http://127.0.0.1:5500/components/contact.html">
                        {lang['Contact']}
                    </a> */}
                </div>
                <div className="contact-navbar">
                    {/* <SplitButton
                        title={
                            <div className="flex justify-content">
                                <img src="https://dichthuatphuongdong.com/tienich/uploads/flags/shiny/24x24/gb.png"></img>

                                <span style={{ marginLeft: "5px" }}>
                                    English
                                </span>
                            </div>
                        }
                        options={[
                            <MenuItem
                                key={0}
                                onClick={(event) =>
                                    handleMenuItemClick(event, 0)
                                }
                            >
                                <div className="flex justify-content">
  
                                    <img src="https://dichthuatphuongdong.com/tienich/uploads/flags/shiny/24x24/gb.png"></img>
                                    <span style={{ marginLeft: "5px" }}>
                                        English
                                    </span>
                                </div>
                            </MenuItem>,
                            <MenuItem 
                                key={1}
                                onClick={(event) =>
                                    handleMenuItemClick(event, 1)
                                }
                            >
                                <div className="flex justify-content">
  
                                    <img src="https://dichthuatphuongdong.com/tienich/uploads/flags/shiny/24x24/vn.png"></img>
                                    <span style={{ marginLeft: "5px" }}>
                                        Vietnamese
                                    </span>
                                </div>
                            </MenuItem>,
                        ]}
                        onClick={(index) => console.log(index)}
                    /> */}
                    <ButtonGroup
                        variant="contained"
                        ref={anchorRef}
                        aria-label="split button"
                    >
                        <Button onClick={handleClick}>
                            {options[selectedIndex]}
                        </Button>
                        <Button
                            size="small"
                            aria-controls={
                                open ? "split-button-menu" : undefined
                            }
                            aria-expanded={open ? "true" : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper
                        sx={{
                            zIndex: 1,
                        }}
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom"
                                            ? "center top"
                                            : "center bottom",
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener
                                        onClickAway={handleClose}
                                    >
                                        <MenuList
                                            id="split-button-menu"
                                            autoFocusItem
                                        >
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    // disabled={index === 2}
                                                    selected={
                                                        index === selectedIndex
                                                    }
                                                    onClick={(event) =>
                                                        handleMenuItemClick(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                    <div className="catalogues">
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder={lang["Search"].toLowerCase()}
                                inputProps={{ "aria-label": "search" }}
                                name="search"
                                id="search"
                                onChange={handleSearch}
                            />
                        </Search>
                        {getTour.length > 0 && (
                            <div
                                className="dropdown-content sidebar"
                                style={{ top: "81%" }}
                            >
                                <div className="widget widget-post-list">
                                    <div className="babe-search-filter-items">
                                        {getTour.map((tour) => (
                                            <div className="babe-items">
                                                <div className="babe-items__inner">
                                                    <div className="item-img">
                                                        <div className="img-thumb">
                                                            <img
                                                                src={`http://localhost:8000/storage/${tour.ten}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="item-text">
                                                        <div className="item-title">
                                                            <NavLink
                                                                href={`/tour/${tour.slug}?lang=${_lang}`}
                                                            >
                                                                {tour.ten_tour}
                                                            </NavLink>
                                                        </div>
                                                        <div className="item-info-price">
                                                            <label for="">
                                                                {lang['From']}
                                                            </label>
                                                            <span className="item-info-price-new">
                                                                <span
                                                                    className="currency-amount"
                                                                    data-amount="177"
                                                                >
                                                                    {numberFormat(
                                                                        tour.gia_nguoi_lon
                                                                    )}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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
                        <HeaderMobile />
                    </div>
                </div>
            </div>
        </header>
    );
}
