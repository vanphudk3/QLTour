import BlogWrap from "@/Components/Home/BlogWrap";
import Explore from "@/Components/Home/SectionTitle/Sectiontitle";
import MenuSearch from "@/Components/Home/MenuSearch";
import SwiperBanner from "@/Components/Home/SwiperBanner";
import SwiperDeal from "@/Components/Home/SwiperDeal";
import SwiperReview from "@/Components/Home/SwiperReview";
import NavLinkB from "@/Components/Bootstrap/NavLink";
import LogoLinkB from "@/Components/Bootstrap/LogoLink";
import Content from "@/Layouts/Home";
import { Link, Head, usePage, useForm, router } from "@inertiajs/react";
import SwiperPopularLayout from "@/Components/Home/SwiperPopularLayout";
import { Swiper, SwiperSlide } from "swiper/react";
import * as React from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import InputSearchDate from "@/Components/Search/InputSearchDate";
import Select from "@/Components/Bootstrap/Select";
import { now } from "lodash";

const Trancate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

const formartFloat = (number, n) => {
    var _pow = Math.pow(10, n);
    return Math.round(number * _pow) / _pow;
};

export default function Welcome(props) {
    const today = new Date().toISOString().split("T")[0];
    const tours = usePage().props;
    const data_tours = tours.tours;
    console.log(data_tours);
    const locations = usePage().props.locations;
    const categories = usePage().props.categories;
    // console.log(locations);
    const destinations1 = usePage().props.destinations1;
    const destinations2 = usePage().props.destinations2;

    const lastMinuteTours = usePage().props.lastMinuteTours;

    const { data, setData, post, processing, errors, reset } = useForm({
        date: today,
        where: 0,
        type: 0,
    });

    console.log(data);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
        if (event.target.name === "type") {
            router.get(
                route("welcome"),
                { type: event.target.value },
                { preserveState: true }
            );
        }
    };

    const submit = (e) => {
        e.preventDefault();
        router.get(
            route("tour"),
            { type: data.type, where: data.where, date: data.date },
            { preserveState: true }
        );
    };

    return (
        <>
            <Head title="Home" />
            <Content>
                <SwiperBanner />

                <div className="container-layout">
                    <MenuSearch>
                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="col">
                                    <div className="type-search-item">
                                        <i className="fa-regular fa-flag"></i>
                                        <span>Type</span>
                                        <Select
                                            name="type"
                                            id="type"
                                            value={data.type}
                                            autoComplete="off"
                                            handleChange={onHandleChange}
                                        >
                                            <option value="0">
                                                --All type--
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
                                        <span>Where</span>
                                        <Select
                                            name="where"
                                            id="where"
                                            value={data.where}
                                            autoComplete="off"
                                            handleChange={onHandleChange}
                                        >
                                            <option value="0">
                                                --All where--
                                            </option>
                                            {locations.map((location) => (
                                                <option value={location.id}>
                                                    {location.ten}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="type-search-item">
                                        <i className="fa-regular fa-calendar-days"></i>
                                        <span>Date</span>
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
                                        Search
                                    </button>
                                </div>
                            </div>
                        </form>
                    </MenuSearch>
                    <div className="explore">
                        <div className="container-explore">
                            <Explore>
                                <p className="sectitle">EXPLORE OUR TOURS</p>
                                <h2 className="subtitle">
                                    New and Most Popular Tours
                                </h2>
                            </Explore>
                        </div>
                    </div>

                    <div className="explore-slider">
                        <SwiperPopularLayout>
                            <>
                                {data_tours.map((tours) => (
                                    <>
                                        <SwiperSlide
                                            style={{ display: "flex" }}
                                        >
                                            <div className="container-slider">
                                                <div className="img-slider">
                                                    <img
                                                        src={`http://localhost:8000/storage/${tours.ten}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="title-slider">
                                                    <div className="price-tour">
                                                        <label>From</label>
                                                        <span>
                                                            {
                                                                tours.gia_nguoi_lon
                                                            }
                                                            đ
                                                        </span>
                                                    </div>
                                                    <div className="content-slider">
                                                        <p>Kathmandu, Nepal</p>
                                                        <NavLinkB
                                                            href={`/tour/${tours.slug}`}
                                                            aria-current="page"
                                                        >
                                                            {tours.ten_tour}
                                                        </NavLinkB>
                                                        <ul>
                                                            <li>
                                                                <i className="fa-regular fa-clock"></i>
                                                                <span>
                                                                    {
                                                                        tours.so_ngay
                                                                    }{" "}
                                                                    days
                                                                </span>
                                                            </li>
                                                            <li>
                                                                {/* {
                                                                    tours.ngay_khoi_hanh
                                                                } */}
                                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                                <span>
                                                                    {formartFloat(tours.rating, 1)}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                        <div className="read-more-item">
                                                            <NavLinkB
                                                                href={`/tour/${tours.slug}`}
                                                                aria-current="page"
                                                            >
                                                                More Information{" "}
                                                                <i className="fa-solid fa-arrow-right"></i>
                                                            </NavLinkB>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </>
                                ))}
                            </>
                        </SwiperPopularLayout>
                    </div>

                    <div className="list-wrap">
                        <div className="list-item">
                            <div className="row">
                                <div className="col">
                                    <i className="fa-solid fa-suitcase-rolling"></i>
                                    <h6>Memorable Experiences</h6>
                                    <p>
                                        Browse and book tours and activities so
                                        incredible.
                                    </p>
                                </div>
                                <div className="col">
                                    <i className="fa-solid fa-campground"></i>
                                    <h6>Ultimate flexibility</h6>
                                    <p>
                                        You’re in control, with free
                                        cancellation and payment options.
                                    </p>
                                </div>
                                <div className="col">
                                    <i className="fa-solid fa-binoculars"></i>
                                    <h6>Extended Customization</h6>
                                    <p>
                                        Browse and book tours and activities so
                                        incredible.
                                    </p>
                                </div>
                                <div className="col">
                                    <i className="fa-solid fa-stopwatch"></i>
                                    <h6>Customer Satisfaction</h6>
                                    <p>
                                        Browse and book tours and activities so
                                        incredible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="destination">
                    <div
                        className="container-layout"
                        style={{ background: "repeat" }}
                    >
                        <div className="explore">
                            <div className="container-explore">
                                <Explore>
                                    <p className="sectitle">
                                        CHOOSE YOUR EXPERIENCE
                                    </p>
                                    <h2 className="subtitle">
                                        Top Attractions Destinations
                                    </h2>
                                </Explore>
                            </div>
                        </div>
                        <div className="row-destination">
                            <div className="layout-row">
                                {destinations1.map((destination) => (
                                    <div className="location-item">
                                        <NavLinkB
                                            href={`/destination/${destination.slug}`}
                                            aria-current="page"
                                        >
                                            <div className="img-location">
                                                <img
                                                    src={`http://localhost:8000/storage/${destination.hinh_anh}`}
                                                    alt=""
                                                />
                                                <div className="location-content">
                                                    <span className="location-name">
                                                        {destination.ten}
                                                    </span>
                                                    <span className="location-count">
                                                        {destination.sum} Tours+
                                                    </span>
                                                </div>
                                            </div>
                                        </NavLinkB>
                                    </div>
                                ))}
                            </div>
                            <div className="layout-row">
                                {destinations2.map((destination) => (
                                    <div className="location-item">
                                        <NavLinkB
                                            href={`/destination/${destination.slug}`}
                                            aria-current="page"
                                        >
                                            <div className="img-location">
                                                <img
                                                    src={`http://localhost:8000/storage/${destination.hinh_anh}`}
                                                    alt=""
                                                />
                                                <div className="location-content">
                                                    <span className="location-name">
                                                        {destination.ten}
                                                    </span>
                                                    <span className="location-count">
                                                        {destination.sum} Tours+
                                                    </span>
                                                </div>
                                            </div>
                                        </NavLinkB>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="choose-us">
                    <div className="container-choose">
                        <div className="row">
                            <div className="col">
                                <div className="wrap-populated">
                                    <div className="wrap-heading">
                                        <div className="wrap-heading-container">
                                            <h4 className="wrap-heading-title">
                                                We Create Journeys Worth Taking
                                                For The Traveler
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="section-title">
                                    <p className="sectitle">WHY CHOOSE US</p>
                                    <h2 className="subtitle">
                                        Our Experiences Meet High Quality
                                        Standards
                                    </h2>
                                    <div className="wrap-divider">
                                        <div className="container-divider">
                                            <div className="divider-separator"></div>
                                        </div>
                                        <p className="text">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Ut elit
                                            tellus, luctus nec ullamcorper
                                            mattis, pulvinar dapibus leo.
                                        </p>
                                    </div>
                                </div>

                                <div className="list-default">
                                    <div className="flex justify-center">
                                        <ul className="icon-list-items">
                                            <li className="icon-list-item">
                                                <span className="icon-list-icon">
                                                    <i className="fa-solid fa-check"></i>
                                                </span>
                                                <span className="icon-list-text">
                                                    Professional Tour Guide
                                                </span>
                                            </li>
                                            <li className="icon-list-item">
                                                <span className="icon-list-icon">
                                                    <i className="fa-solid fa-check"></i>
                                                </span>
                                                <span className="icon-list-text">
                                                    Exceptional flexibility
                                                </span>
                                            </li>
                                            <li className="icon-list-item">
                                                <span className="icon-list-icon">
                                                    <i className="fa-solid fa-check"></i>
                                                </span>
                                                <span className="icon-list-text">
                                                    Quality you can trust
                                                </span>
                                            </li>
                                            <li className="icon-list-item">
                                                <span className="icon-list-icon">
                                                    <i className="fa-solid fa-check"></i>
                                                </span>
                                                <span className="icon-list-text">
                                                    Award-winning support{" "}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="wrap-button">
                                    <a
                                        href="./contact.html"
                                        className="button-link"
                                    >
                                        <span className="button-content">
                                            <span className="button-text">
                                                Contact Us
                                            </span>
                                            <span className="button-icon">
                                                <i className="fa-solid fa-arrow-right"></i>
                                            </span>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="category">
                    <div className="container-category">
                        <div className="section-title">
                            <p className="sectitle">WHY CHOOSE US</p>
                            <h2 className="subtitle">
                                Our Experiences Meet High Quality Standards
                            </h2>
                            <div className="wrap-divider">
                                <div className="container-divider">
                                    <div className="divider-separator"></div>
                                </div>
                            </div>
                        </div>
                        <div className="category-slider">
                            <div className="row">
                                <div className="col">
                                    <div className="slick-list">
                                        <div className="slick-track">
                                            <a href="">
                                                <div className="icon">
                                                    <i className="fas fa-mountain"></i>
                                                </div>
                                                <div className="content-location">
                                                    <span className="location-name">
                                                        Adventural
                                                    </span>
                                                    <span className="location-count">
                                                        10 Tour+
                                                    </span>
                                                    <span className="from">
                                                        <span>from</span>
                                                        <span>$125</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="slick-list">
                                        <div className="slick-track">
                                            <a href="#">
                                                <div className="icon">
                                                    <i className="fa-solid fa-umbrella-beach"></i>
                                                </div>
                                                <div className="content-location">
                                                    <span className="location-name">
                                                        Beachs
                                                    </span>
                                                    <span className="location-count">
                                                        10 Tour+
                                                    </span>
                                                    <span className="from">
                                                        <span>from</span>
                                                        <span>$125</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="slick-list">
                                        <div className="slick-track">
                                            <a href="" className="item-inner">
                                                <div className="icon">
                                                    <i className="far fa-building"></i>
                                                </div>
                                                <div className="content-location">
                                                    <span className="location-name">
                                                        City Tours
                                                    </span>
                                                    <span className="location-count">
                                                        10 Tour+
                                                    </span>
                                                    <span className="from">
                                                        <span>from</span>
                                                        <span>$125</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="slick-list">
                                        <div className="slick-track">
                                            <a href="" className="item-inner">
                                                <div className="icon">
                                                    <i className="fa-solid fa-tree"></i>
                                                </div>
                                                <div className="content-location">
                                                    <span className="location-name">
                                                        hiking
                                                    </span>
                                                    <span className="location-count">
                                                        10 Tour+
                                                    </span>
                                                    <span className="from">
                                                        <span>from</span>
                                                        <span>$125</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="slick-list">
                                        <div className="slick-track">
                                            <a href="" className="item-inner">
                                                <div className="icon">
                                                    <i className="fa-solid fa-car-side"></i>
                                                </div>
                                                <div className="content-location">
                                                    <span className="location-name">
                                                        Honeymoon
                                                    </span>
                                                    <span className="location-count">
                                                        10 Tour+
                                                    </span>
                                                    <span className="from">
                                                        <span>from</span>
                                                        <span>$125</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="slick-list">
                                        <div className="slick-track">
                                            <a hre="" className="item-inner">
                                                <div className="icon">
                                                    <i className="fa-solid fa-building-columns"></i>
                                                </div>
                                                <div className="content-location">
                                                    <span className="location-name">
                                                        Museum Tours
                                                    </span>
                                                    <span className="location-count">
                                                        10 Tour+
                                                    </span>
                                                    <span className="from">
                                                        <span>from</span>
                                                        <span>$125</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="container-layout"
                    style={{ paddingBottom: "120px" }}
                >
                    <div className="explore" style={{ paddingTop: "120px" }}>
                        <div className="container-explore">
                            <div className="section-title">
                                <p className="sectitle">Ideal tour</p>
                                <h2 className="subtitle">
                                    Suggestions for your next trip
                                </h2>
                                <div className="wrap-divider">
                                    <div className="container-divider">
                                        <div className="divider-separator"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="explore-slider">
                        <SwiperDeal>
                            {lastMinuteTours.map((tour) => (
                                <SwiperSlide>
                                    <div className="container-book">
                                        <LogoLinkB
                                            href={route("tour.show", tour.id)}
                                            className="img-book"
                                        >
                                            <img
                                                src={`http://localhost:8000/storage/${tour.ten}`}
                                                alt=""
                                            />
                                        </LogoLinkB>
                                        <div className="title-book">
                                            <p>{tour.dia_chi}</p>
                                            <LogoLinkB
                                                href={route(
                                                    "tour.show",
                                                    tour.id
                                                )}
                                                className="content-book"
                                            >
                                                {Trancate(tour.ten_tour, 30)}
                                            </LogoLinkB>
                                            <ul>
                                                <li>
                                                    <i className="fa-regular fa-clock"></i>
                                                    <span>
                                                        {tour.so_ngay} days
                                                    </span>
                                                </li>
                                                <li>
                                                    {tour.ngay_khoi_hanh}
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
                                                        {tour.gia_nguoi_lon}
                                                    </span>
                                                </div>
                                                <NavLinkB
                                                    href={route(
                                                        "tour.show",
                                                        tour.id
                                                    )}
                                                    aria-label="More Information"
                                                >
                                                    More Information{" "}
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </NavLinkB>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </SwiperDeal>
                    </div>
                </div>
                <div className="reviews-wrapper">
                    <div
                        className="container-layout"
                        style={{ background: "repeat" }}
                    >
                        <div className="explore">
                            <div className="container-explore">
                                <div className="section-title">
                                    <p className="sectitle">
                                        CHOOSE YOUR EXPERIENCE
                                    </p>
                                    <h2 className="subtitle">
                                        Top Attractions Destinations
                                    </h2>
                                    <div className="wrap-divider">
                                        <div className="container-divider">
                                            <div className="divider-separator"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-reviews">
                            <SwiperReview />
                        </div>
                    </div>
                </div>
                <div className="container-layout">
                    <div className="explore" style={{ paddingTop: "120px" }}>
                        <div className="container-explore">
                            <div className="section-title">
                                <p className="sectitle">
                                    TRAVEL INSIGHTS & IDEAS
                                </p>
                                <h2 className="subtitle">
                                    Latest Travel Guides
                                </h2>
                                <div className="wrap-divider">
                                    <div className="container-divider">
                                        <div className="divider-separator"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BlogWrap />
                </div>
            </Content>
        </>
    );
}
