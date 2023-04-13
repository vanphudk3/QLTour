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
import { getJSON } from "jquery";
import React, { useState } from "react";
import { isEmpty } from "lodash";

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


const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href={route('welcome')} style={{textDecoration: "none",color: "white"}}>
        Home
    </Link>,
    <Typography key="2" color="text.primary" style={{ color: "white" }}>
        Tour List
    </Typography>,
  ];

export default function Tour(props) {
    const locations = usePage().props.locations;
    const categories = usePage().props.categories;
    const tours = usePage().props.tours.data;
    const countTour = usePage().props.countTour;
    const focusCategory = usePage().props.category;
    const forcusPrice = usePage().props.price;
    const budget = usePage().props.budget;
    const departures = usePage().props.departures;
    const focusDeparture = usePage().props.depart;
    const destination = usePage().props.location;
    const lastdealTours = usePage().props;
    const faqs = usePage().props.questions;

    console.log(tours);
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

    const [value, setValue] = React.useState(getBudget(budget));
    // console.log(value.min);

    const { data, setData, post, processing, errors, reset } = useForm({
        date: "",
        where: "",
        type: "",
        category: focusCategory || 0,
        price: forcusPrice || 0,
        depart: focusDeparture || 0,
        destination: destination || 0,
    });

    // console.log(data);

    const onHandleChange = (event) => {
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
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }
        if (event.target.name === "price") {
            router.get(
                route("tour"),
                {
                    price: event.target.value,
                    category: focusCategory || 0,
                    depart: focusDeparture || 0,
                    destination: destination || 0,
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
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("search"));
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
                            <h1 className="zourney-title"> Tours List</h1>
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
                    <div className="layout-02">
                        <div className="row">
                            <div className="col-md-8">
                                <h2 className="headding-title flex justify-content-center title-tour">
                                    Tour List
                                </h2>
                                <div className="bade-result">
                                    <div className="count-post">
                                        {countTour} Tours
                                    </div>
                                    <div className="filter-sort">
                                        Sort by{" "}
                                        <i className="fa-solid fa-arrow-down-a-z"></i>
                                    </div>
                                </div>
                                {tours.length > 0 ? (
                                    <div className="bade-inner">
                                        {tours.map((tour) => (
                                            <div className="container-book">
                                                <LogoLinkB
                                                    href={`/tour/${tour.slug}`}
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
                                                        href={`/tour/${tour.slug}`}
                                                        className="content-book"
                                                    >
                                                        {tour.ten_tour}
                                                    </NavLinkB>
                                                    <ul>
                                                        <li>
                                                            <i className="fa-regular fa-clock"></i>
                                                            <span>
                                                                {tour.so_ngay}{" "}
                                                                days
                                                            </span>
                                                        </li>
                                                        <li>
                                                            {
                                                                tour.ngay_khoi_hanh
                                                            }
                                                            {/* <i className="fa-sharp fa-solid fa-star"></i>
                                                        <i className="fa-sharp fa-solid fa-star"></i>
                                                        <i className="fa-sharp fa-solid fa-star"></i>
                                                        <i className="fa-sharp fa-solid fa-star"></i>
                                                        <i className="fa-sharp fa-solid fa-star"></i>
                                                        <span>4,5/5</span> */}
                                                        </li>
                                                    </ul>
                                                    <div className="read-more-item">
                                                        <div className="price-book">
                                                            <span>From</span>
                                                            <span>
                                                                {
                                                                    tour.gia_nguoi_lon
                                                                }
                                                                đ
                                                            </span>
                                                        </div>
                                                        <NavLinkB
                                                            aria-current="page"
                                                            href={`/tour/${tour.slug}`}
                                                        >
                                                            More Information{" "}
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </NavLinkB>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Không có tour nào được tìm thấy</p>
                                )}
                                <>
                                    <Pagination
                                        links={usePage().props.tours.links}
                                        meta={usePage().props.tours.meta}
                                    />
                                </>
                            </div>
                            <div className="col-6 col-md-4 width-100">
                                <div className="sidebar">
                                    <h6 className="heading-title">Filter by</h6>
    
                                    <div className="widget widger-price">
                                        <div className="title">Budget</div>
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
                                                    onChange={onHandleChange}
                                                    valueLabelDisplay="auto"
                                                    aria-labelledby="non-linear-slider"
                                                />
                                                <Typography
                                                    id="non-linear-slider"
                                                    gutterBottom
                                                    name="price"
                                                >
                                                    Budget:{" "}
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
                                        <div className="title">Departure</div>
                                        <Select
                                            id="depart"
                                            name="depart"
                                            className="mt-1 block w-full"
                                            value={data.depart}
                                            handleChange={onHandleChange}
                                        >
                                            <option value="0">
                                                --Tất cả--
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
                                        <div className="title">Destination</div>
                                        <Select
                                            id="destination"
                                            name="destination"
                                            className="mt-1 block w-full"
                                            value={data.destination}
                                            handleChange={onHandleChange}
                                        >
                                            <option value="0">
                                                --Tất cả--
                                            </option>
                                            {locations.map((location) => (
                                                <option value={location.id}>
                                                    {location.ten}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className="widget widget-reviews">
                                        <div className="title">Reviews</div>
                                        <div className="babe-search-filter-items">
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="5star"
                                                ></input>
                                                <label for="5star">
                                                    5 Star
                                                </label>
                                            </div>
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="4star"
                                                ></input>
                                                <label for="4star">
                                                    4 Star & Up
                                                </label>
                                            </div>
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="3star"
                                                ></input>
                                                <label for="3star">
                                                    3 Star & Up
                                                </label>
                                            </div>
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="2star"
                                                ></input>
                                                <label for="2star">
                                                    2 Star & Up
                                                </label>
                                            </div>
                                            <div className="term-item">
                                                <input
                                                    type="checkbox"
                                                    id="1star"
                                                ></input>
                                                <label for="1star">
                                                    1 Star & Up
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget widget-post-list">
                                        <div className="title">
                                            Last Minute Deals
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
                                                                        href={`/tour/${tour.slug}`}
                                                                    >
                                                                        {
                                                                            tour.ten_tour
                                                                        }
                                                                    </a>
                                                                </div>
                                                                <div className="item-info-price">
                                                                    <label for="">
                                                                        From
                                                                    </label>
                                                                    <span className="item-info-price-new">
                                                                        <span
                                                                            className="currency-amount"
                                                                            data-amount="177"
                                                                        >
                                                                            {/* <span className="currency-symbol">
                                                                        $
                                                                    </span> */}
                                                                            {
                                                                                tour.gia_nguoi_lon
                                                                            }
                                                                            đ
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
                                        FAQs For Tour Packages
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
