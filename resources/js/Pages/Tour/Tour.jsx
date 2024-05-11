import Select from "@/Components/Bootstrap/Select";
import MenuSearch from "@/Components/Home/MenuSearch";
import InputLabel from "@/Components/InputLabel";
import Pagination from "@/Components/Pagination";
import InputSearchDate from "@/Components/Search/InputSearchDate";
import Advertise from "@/Components/Tour/Advertise";
import ContainerBook from "@/Components/Tour/ContainerBook";
import Question from "@/Components/Tour/Question";
import Widget from "@/Components/Tour/Widget";
import Content from "@/Layouts/Tour";
import NavLinkB from "@/Components/Bootstrap/NavLink";
import LogoLinkB from "@/Components/Bootstrap/LogoLink";
import {  Head, usePage, useForm, router, Link } from "@inertiajs/react";
import { Breadcrumbs, Button, Slider, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BasicPagination from "@/Components/MuiPagination";
import { getJSON } from "jquery";
import React, { useState } from "react";
import { isEmpty, set } from "lodash";
import Tooltip from '@mui/material/Tooltip';
function valueLabelFormat(value) {
    const units = ["VNĐ"];

    let unitIndex = 0;
    let scaledValue = value;

    while (unitIndex < units.length - 1) {
        unitIndex += 100;
    }

    return `${scaledValue} ${units[unitIndex]}`;
}

function calculateValue(value) {
    return value;
}

const formartFloat = (number, n) => {
    var _pow = Math.pow(10, n);
    return Math.round(number * _pow) / _pow;
};


export default function Tour(props) {
    const locations = usePage().props.locations;
    const categories = usePage().props.categories;
    const tours = usePage().props.tours.data;
    const links = usePage().props.tours.links;
    const meta = usePage().props.tours.meta;
    const countTour = usePage().props.countTour;
    const focusCategory = usePage().props.category;
    const forcusPrice = usePage().props.price;
    const budget = usePage().props.budget;
    const departures = usePage().props.departures;
    const focusDeparture = usePage().props.depart;
    const destination = usePage().props.location;
    const lastdealTours = usePage().props;
    const faqs = usePage().props.questions;
    const lang = usePage().props.lang;
    const type = usePage().props.type;
    const where = usePage().props.where;
    const date = usePage().props.date;
    const _lang = usePage().props._lang;
    const last_page = usePage().props.tours.last_page;
    const current_page = usePage().props.tours.current_page;
    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href={route("welcome-locale", {
            locale: _lang,
        })} style={{textDecoration: "none",color: "white"}}>
            {lang['Home']}
        </Link>,
        <Typography key="2" color="text.primary" style={{ color: "white" }}>
            {lang['Tour List']}
        </Typography>,
      ];
      const numberFormat = (value) => {
        if(_lang == 'en')
        value = value * 0.000040;
        return new Intl.NumberFormat(lang['vi-VN'], {
            style: "currency",
            currency: lang['VND'],
        }).format(value);
    };
    // console.log(tours);
    faqs.map((faq) => {
        switch(faq.id){
            case 1:
                faq.id = "One";
                break;
            case 2:
                faq.id = "Two";
                break;
            case 3:
                faq.id = "Three";
                break;
            case 4:
                faq.id = "Four";
        }
    })

    const getBudget = (budget) => {
        if (budget) {
            return budget;
        }
    };
    
        const [gettype, setType] = useState(type);
        const [getwhere, setWhere] = useState(locations);
        const [gettour, setTour] = useState(tours);
        const [getlink, setLink] = useState(links);
        const [getmeta, setMeta] = useState(meta);
        const [count, setCount] = useState(countTour);
        const [changeCurrentPage, setCurrentPage] = useState(current_page);
        const [changeLastPage, setLastPage] = useState(last_page);
        const [getdepart, setDepart] = useState(0);
        const [getlocation, setLocation] = useState(locations);
        const [getcategory, setCategory] = useState(0);
        const [getdestination, setDestination] = useState(0);
        const [getPrice, setPrice] = useState(budget);
        const [getlistStar, setListStar] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        date: date || "", 
        where: where || 0,
        type: gettype ?? type ?? 0,
        category: focusCategory || 0,
        price: forcusPrice || 0,
        depart: focusDeparture || 0,
        destination: destination || 0,
        lang: _lang,
        star: [],
    });

    const [value, setValue] = React.useState(getBudget(budget));
    // console.log(value.min);

    const onchangeType = async (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value
        );
        const response = await fetch("api/getlocation?type=" + e.target.value, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json, text/plain, */*",
            },
        });
        const data = await response.json();
        setWhere(data);
        setType(e.target.value);
    };



    // console.log(data);

    const onHandleChange = async (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
        if (event.target.name === "category") {
            router.get(
                route("tour"),
                {
                    category: event.target.value,
                    price: forcusPrice || 0,
                    depart: focusDeparture || 0,
                    destination: destination || 0,
                    lang: _lang,
                    date: data.date || "",
                    where: data.where || 0,
                    type: data.type || 0,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
            // await axios
            //     .get(
            //         `http://localhost:8000/tour?lang=${localStorage.getItem(
            //             "language"
            //         )}&category=${event.target.value}&price=${forcusPrice}&depart=${focusDeparture}&destination=${destination}`
            //     )
            //     .then((res) => {
            //         console.log(res.data);
            //         setData("tours", res.data.tours.data);
            //         setData("countTour", res.data.countTour);
            //     });

            // console.log(tours);

        }
        if (event.target.name === "price") {
            router.get(
                route("tour"),
                {
                    price: event.target.value,
                    category: focusCategory || 0,
                    depart: focusDeparture || 0,
                    destination: destination || 0,
                    lang: _lang,
                    date: data.date || "",
                    where: data.where || 0,
                    type: data.type || 0,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }
        if (event.target.name === "depart") {
            router.get(
                route("tour"),
                {
                    depart: event.target.value,
                    category: focusCategory || 0,
                    price: forcusPrice || 0,
                    destination: destination || 0,
                    lang: _lang,
                    date: data.date || "",
                    where: data.where || 0,
                    type: data.type || 0,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }
        if (event.target.name === "destination") {
            router.get(
                route("tour"),
                {
                    destination: event.target.value,
                    category: focusCategory || 0,
                    price: forcusPrice || 0,
                    depart: focusDeparture || 0,
                    lang: _lang,
                    date: data.date || "",
                    where: data.where || 0,
                    type: data.type || 0,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }
        // if (event.target.name === "type") {
        //     router.get(
        //         route("tour"),
        //         {  type: event.target.value,
        //             where: data.where,
        //             date: data.date,
        //             lang: _lang,
        //             depart: focusDeparture || 0,
        //             destination: destination || 0,
        //             price: forcusPrice || 0,
        //             category: focusCategory || 0,
        //         },
        //         { preserveState: true }
        //     );
        // }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("search"));
    };

    const submit_tour = (e) => {
        e.preventDefault();
        // router.get(
        //     route("tour"),
        //     {   type: data.type, 
        //         where: data.where, 
        //         date: data.date, 
        //         lang: _lang,
        //         // depart: focusDeparture || 0,
        //         // destination: destination || 0,
        //         // price: forcusPrice || 0,
        //         // category: focusCategory || 0,
        //     },
        //     { preserveState: true }
        // );
        const ins = {
            type: data.type? data.type : 0,
            where: data.where? data.where : 0,
            date: data.date? data.date : "",
            lang: _lang,
            depart: focusDeparture || 0,
            destination: destination || 0,
            price: forcusPrice || 0,
            category: focusCategory || 0,
        };

        let query = Object.keys(ins);
        query = query.map((key) => key + "=" + ins[key]);
        query = query.join("&");
        // console.log(query);

        fetch("api/tour?" + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json, text/plain, */*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (typeof data.tours.data === "undefined") {
                    setTour(data.tours);
                } else {
                setTour(data.tours.data);
                }
                setCount(data.countTour);
                setCurrentPage(data.tours.current_page);
                setLastPage(data.tours.last_page);
                router.reload();
            });
    };

    const fillter = async (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value
                );
                const ins = {
                    // type: data.type? data.type : 0,
                    // where: data.where? data.where : 0,
                    // date: data.date? data.date : "",
                    lang: _lang,
                    depart: focusDeparture || 0,
                    destination: destination || 0,
                    price: forcusPrice || 0,
                    category: focusCategory || 0,
                    star: getlistStar || [],
                };
                if (e.target.name === "category") {
                    ins.category = e.target.value;
                    setCategory(e.target.value);
                }
                if (e.target.name === "price") {
                    ins.price = e.target.value;
                    setPrice(e.target.value);
                }
                if (e.target.name === "depart") {
                    ins.depart = e.target.value;
                    setDepart(e.target.value);
                }
                if (e.target.name === "destination") {
                    ins.destination = e.target.value;
                    setDestination(e.target.value);
                }
                if (e.target.name === "1" || e.target.name === "2" || e.target.name === "3" || e.target.name === "4" || e.target.name === "5") {
                    if (e.target.checked) {
                        ins.star = [...getlistStar, e.target.name];
                        setListStar([...getlistStar, e.target.name]);
                    } else {
                        ins.star = getlistStar.filter((star) => star !== e.target.name);
                        setListStar(getlistStar.filter((star) => star !== e.target.name));
                    }
                }
                
                // console.log(ins);
            if (ins.price == 0) {
                if (typeof getPrice !== "object")
                    ins.price = getPrice;
            }
            if (ins.category == 0) {
                if (typeof getcategory !== "undefined")
                    ins.category = getcategory;
            }
            if (ins.depart == 0) {
                if (typeof getdepart !== "undefined")
                ins.depart = getdepart;
            }
            if (ins.destination == 0) {
                if (typeof getdestination !== "undefined")
                ins.destination = getdestination;
            }
            let query = Object.keys(ins);
            query = query.map((key) => key + "=" + ins[key]);
            query = query.join("&");
            console.log(query);
            const response = await fetch("api/tour?" + query, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                    Accept: "application/json, text/plain, */*",
                },
            });
            const data = await response.json();
            setTour(data.tours.data);
            setCount(data.countTour);
            setCurrentPage(data.tours.current_page);
            setLastPage(data.tours.last_page);
            setLink(data.tours.links);
            setMeta(data.tours.meta);

            router.reload();
    };

    const pageChange = (e, page) => {
        // router.get(
        //     route("tour"),
        //     {
        //         page: page,
        //         category: focusCategory || 0,
        //         price: forcusPrice || 0,
        //         depart: focusDeparture || 0,
        //         destination: destination || 0,
        //         lang: _lang,
        //         date: data.date || "",
        //         where: data.where || 0,
        //         type: data.type || 0,
        //     },
        //     {
        //         preserveState: true,
        //         replace: true,
        //     }
        // );

        // sử dung fetch
        const ins = {
            type: data.type? data.type : 0,
            where: data.where? data.where : 0,
            date: data.date? data.date : "",
            lang: _lang,
            depart: focusDeparture || 0,
            destination: destination || 0,
            price: forcusPrice || 0,
            category: focusCategory || 0,
            page: page,
        };

        let query = Object.keys(ins);
        query = query.map((key) => key + "=" + ins[key]);
        query = query.join("&");
        // console.log(query);

        fetch("api/tour?" + query, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json, text/plain, */*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setTour(data.tours.data);
                setLink(data.tours.links);
                setMeta(data.tours.meta);
                setCount(data.countTour);
                setCurrentPage(data.tours.current_page);
                setLastPage(data.tours.last_page);
                router.reload();
                window.scrollTo(0, 0);

            });

    };

    return (
        <>
            <Head title="Tour" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> {lang['Tours List']}</h1>
                            <div className="flex justify-content-center">
                                <Breadcrumbs
                                    separator={
                                        <NavigateNextIcon fontSize="small" style={{color:"white"}} />
                                    }
                                    aria-label="breadcrumb"
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-layout" style={{ marginTop: "20px" }}>
                <MenuSearch>
                        <form onSubmit={submit_tour}>
                            <div className="row">
                                <div className="col">
                                    <div className="type-search-item">
                                        <i className="fa-regular fa-flag"></i>
                                        <span>{ lang['Type'] }</span>
                                        <Select
                                            name="type"
                                            id="type"
                                            value={data.type}
                                            autoComplete="off"
                                            handleChange={onchangeType}
                                        >
                                            <option value="0">
                                                -- { lang['All Type'] } --
                                            </option>
                                            {categories.map((category) => (
                                                <option value={category.id}>
                                                    {category.ten}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="type-search-item">
                                        <i className="fa-regular fa-paper-plane"></i>
                                        <span>{lang['Where']}</span>
                                        <Select
                                            name="where"
                                            id="where"
                                            value={data.where}
                                            autoComplete="off"
                                            handleChange={onHandleChange}
                                        >
                                            <option value="0">
                                                -- {lang['All where']} --
                                            </option>
                                            {/* 
                                                nếu tồn tại getwhere thì map qua ngược lại thì map qua locations
                                            */}
                                            {getwhere &&
                                                getwhere.map((where) => (
                                                    <option value={where.id}>
                                                        {where.ten}
                                                    </option>
                                                ))
                                            }
                                            {!getwhere &&
                                                locations.map((location) => (
                                                    <option value={location.id}>
                                                        {location.ten}
                                                    </option>
                                                ))
                                            }
                                                
                                        </Select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="type-search-item">
                                        <i className="fa-regular fa-calendar-days"></i>
                                        <span>{lang['Date']}</span>
                                        <InputSearchDate
                                            name="date"
                                            id="datepicker"
                                            value={data.date}
                                            autoComplete="off"
                                            handleChange={onHandleChange}
                                        />
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <button className="btn-search">
                                        {lang['Search']}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </MenuSearch>
                    <div className="layout-02">
                        <div className="row">
                            <div className="col-md-8">
                                <h2 className="headding-title flex justify-content-center title-tour">
                                    {lang['Tour List']}
                                </h2>
                                <div className="bade-result">
                                    <div className="count-post">
                                        {count} Tours
                                    </div>
                                    <div className="filter-sort">
                                        {lang['Sort by']}{" "}
                                        <i className="fa-solid fa-arrow-down-a-z"></i>
                                    </div>
                                </div>
                                {gettour.length > 0 ? (
                                    <div className="bade-inner">
                                        {gettour.map((tour) => (
                                            <div className="container-book">
                                                <LogoLinkB
                                                    href={`/tour/${tour.slug}?lang=${_lang}`}
                                                    className="img-book"
                                                >
                                                    <img
                                                        src={`http://localhost:8000/storage/${tour.ten}`}
                                                        alt=""
                                                    />
                                                </LogoLinkB>
                                                <div className="title-book">
                                                    <p>{tour.dia_chi}</p>
                                                    <NavLinkB
                                                        aria-current="page"
                                                        href={`/tour/${tour.slug}?lang=${_lang}`}
                                                        className="content-book"
                                                    >
                                                        {tour.ten_tour}
                                                    </NavLinkB>
                                                    <ul>
                                                        <li>
                                                            <i className="fa-regular fa-clock"></i>
                                                            <span>
                                                                {tour.so_ngay}{" "}
                                                                {lang['days']}
                                                            </span>
                                                        </li>
                                                        <li>
                                                            
                                                            <i className="fa-sharp fa-solid fa-star"></i>
                                                        <i className="fa-sharp fa-solid fa-star"></i>
                                                        <i className="fa-sharp fa-solid fa-star"></i>
                                                        <i className="fa-sharp fa-solid fa-star"></i>
                                                        <i className="fa-sharp fa-solid fa-star"></i>
                                                        <span>
                                                            {tour.rating == 0 ? lang['Not rated'] : formartFloat(tour.rating, 1)}
                                                        </span>
                                                        </li>
                                                    </ul>
                                                    <div className="read-more-item">
                                                        <div className="price-book">
                                                            <span>{lang['From']}</span>
                                                            <span>
                                                                {numberFormat(
                                                                    tour.gia_nguoi_lon
                                                                )}
                                                            </span>
                                                        </div>
                                                        <NavLinkB
                                                            aria-current="page"
                                                            href={`/tour/${tour.slug}`}
                                                        >
                                                            {lang['More Infomation']}{" "}
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </NavLinkB>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>{lang['Tour not found']}</p>
                                )}
                                <>
                                    {/* <Pagination
                                        links={links}
                                        meta={meta}
                                    /> */}
                                    <BasicPagination
                                        count={changeLastPage}
                                        page={changeCurrentPage}
                                        onChange={(e, page) => pageChange(e, page)}
                                    />
                                </>
                            </div>
                            <div className="col-6 col-md-4 width-100">
                                <div className="sidebar">
                                    <h6 className="heading-title">{lang['Filter by']}</h6>
    
                                    <div className="widget widger-price">
                                        <div className="title">{lang['Budget']}</div>
                                        <div className="price-range-slider">
                                            <div
                                                id="slider-range"
                                                className="range-bar"
                                            >
                                                <Slider
                                                    value={data.price}
                                                    name="price"
                                                    id="price"
                                                    min={value.min}
                                                    step={1}
                                                    max={value.max}
                                                    scale={calculateValue}
                                                    color="secondary"
                                                    getAriaValueText={
                                                        valueLabelFormat
                                                    }
                                                    valueLabelFormat={
                                                        valueLabelFormat
                                                    }
                                                    onChange={fillter}
                                                    valueLabelDisplay="auto"
                                                    aria-labelledby="non-linear-slider"
                                                />
                                                <Typography
                                                    id="non-linear-slider"
                                                    gutterBottom
                                                    name="price"
                                                >
                                                    {lang['Budget']}:{" "}
                                                    {valueLabelFormat(
                                                        calculateValue(
                                                            data.price
                                                        )
                                                    )}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget widget-destination justify-between">
                                        <div className="title">{lang['Departure']}</div>
                                        <Select
                                            id="depart"
                                            name="depart"
                                            className="mt-1 block w-full"
                                            value={data.depart}
                                            handleChange={fillter}
                                        >
                                            <option value="0">
                                                --{lang['All']}--
                                            </option>
                                            {departures.map((depart) => (
                                                <option
                                                    value={depart.noi_khoi_hanh}
                                                >
                                                    {depart.noi_khoi_hanh}
                                                </option>
                                            ))}
                                        </Select>
                                        {/* <div className="babe-search-filter-items">
                                                <div className="term-item term-level-0">
                                                    Afica
                                                </div>
                                                <div className="term-item">
                                                    <input
                                                        type="checkbox"
                                                        id="morocco"
                                                    ></input>
                                                    <label for="morocco">
                                                        Morocco
                                                    </label>
                                                </div>
                                                <div className="term-item">
                                                    <input
                                                        type="checkbox"
                                                        id="tanzania"
                                                    ></input>
                                                    <label for="tanzania">
                                                        Tanzania
                                                    </label>
                                                </div>
                                                <div className="term-item term-level-0">
                                                    Americas
                                                </div>
                                                <div className="term-item">
                                                    <input
                                                        type="checkbox"
                                                        id="canada"
                                                    ></input>
                                                    <label for="canada">
                                                        Canada
                                                    </label>
                                                </div>
                                                <div className="term-item">
                                                    <input
                                                        type="checkbox"
                                                        id="argentina"
                                                    ></input>
                                                    <label for="argentina">
                                                        Argentina
                                                    </label>
                                                </div>
                                            </div> */}
                                    </div>
                                    <div className="widget widget-destination justify-between">
                                        <div className="title">{lang['Destination']}</div>
                                        <Select
                                            id="destination"
                                            name="destination"
                                            className="mt-1 block w-full"
                                            value={data.destination}
                                            handleChange={fillter}
                                        >
                                            <option value="0">
                                                --{lang['All']}--
                                            </option>
                                            {locations.map((location) => (
                                                <option value={location.id}>
                                                    {location.ten}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="widget widget-reviews">
                                        <div className="title">{lang['Reviews']}</div>
                                        <div className="babe-search-filter-items">
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="5star"
                                                    name="5"
                                                    onChange={fillter}
                                                ></input>
                                                <label for="5star">
                                                    5 {lang['Star']}
                                                </label>
                                            </div>
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="4star"
                                                    name="4"
                                                    onChange={fillter}
                                                ></input>
                                                <label for="4star">
                                                    4 {lang['Star & Up']}
                                                </label>
                                            </div>
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="3star"
                                                    name="3"
                                                    onChange={fillter}
                                                ></input>
                                                <label for="3star">
                                                    3 {lang['Star & Up']}
                                                </label>
                                            </div>
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="2star"
                                                    name="2"
                                                    onChange={fillter}
                                                ></input>
                                                <label for="2star">
                                                    2 {lang['Star & Up']}
                                                </label>
                                            </div>
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="1star"
                                                    name="1"
                                                    onChange={fillter}
                                                ></input>
                                                <label for="1star">
                                                    1 {lang['Star & Up']}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget widget-post-list">
                                        <div className="title">
                                            {lang['Last Minute Deals']}
                                        </div>
                                        <div className="babe-search-filter-items">
                                            {lastdealTours.lastdealsTours.map(
                                                (tour) => (
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
                                                                    <a
                                                                        href={`/tour/${tour.slug}?lang=${_lang}`}
                                                                    >
                                                                        {
                                                                            tour.ten_tour
                                                                        }
                                                                    </a>
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
                                                                            {/* <span className="currency-symbol">
                                                                        $
                                                                    </span> */}
                                                                                                                                            {numberFormat(
                                                                    tour.gia_nguoi_lon
                                                                )}
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-layout">
                    <div className="layout-02">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="tour-content__populated">
                                    <h4 className="heading-title">
                                        {lang['FAQs For Tour Packages']}
                                    </h4>
                                    <div
                                        className="accordion accordion-flush"
                                        id="accordionFlushExample"
                                    >
                                        <div className="accordion-item">
                                            {faqs.map((faq) => (
                                            <>
                                            <h2
                                                className="accordion-header"
                                                id={`flush-heading${faq.id}`}
                                                >
                                                <button
                                                    className="accordion-button collapsed"
                                                    type="button"
                                                    // value={faq.id}
                                                    // onChange={e=>onHandleChange}
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#flush-collapse${faq.id}`}
                                                    aria-expanded="false"
                                                    aria-controls={`flush-collapse${faq.id}`}
                                                    style={{
                                                        boxShadow: "none",
                                                        borderColor: "none",
                                                        color: "black",
                                                        background:
                                                            "content-box",
                                                    }}
                                                >
                                                    <div className="accodition-title">
                                                        <span
                                                            style={{
                                                                color: "var(--primary)",
                                                            }}
                                                        >
                                                            Q.
                                                        </span>{" "}
                                                        {faq.question}
                                                    </div>
                                                </button>
                                            </h2>
                                            <div
                                                id={`flush-collapse${faq.id}`}
                                                className="accordion-collapse collapse"
                                                aria-labelledby={`flush-heading${faq.id}`}
                                                data-bs-parent="#accordionFlushExample"
                                            >
                                                <div
                                                    className="accordion-body"
                                                    style={{
                                                        color: "var(--text)",
                                                        fontSize: "16px",
                                                        padding:
                                                            "10px 65px 0px 28px",
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                    {faq.answer}
                                                </div>
                                            </div>
                                            </>
                                                ))}
                                        </div>
                                        {/* <Question /> */}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-6 col-md-4 display-none width-100"
                                style={{ border: "none" }}
                            >
                                <div className="tour-content__item">
                                    <Advertise />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}
