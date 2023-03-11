import Location from "@/Components/DetailTour/Location/Location";
import Description from "@/Components/DetailTour/Overview/Description";
import Highlight from "@/Components/DetailTour/Overview/Highlight";
import Comment from "@/Components/DetailTour/Review/Comment";
import Rating from "@/Components/DetailTour/Review/Rating";
import Reply from "@/Components/DetailTour/Review/Reply";
import SwiperImages from "@/Components/DetailTour/SwiperImages";
import Tourplan from "@/Components/DetailTour/Tourplan/Tourplan";
import Content from "@/Layouts/DetailTour";
import { Link, Head, usePage, useForm, router } from "@inertiajs/react";
import React, { useRef, useState, useEffect } from "react";
import { Breadcrumbs, Button, Slider, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import { isEmpty } from "lodash";

export default function DetailTour(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const detailTour = usePage().props.detailTour;
    const extraServices = usePage().props.extraServices;
    const schedule = usePage().props.lichTrinh;
    const totalPrice = usePage().props.totalPrice;
    const forcusAdult = usePage().props.forcusAdult;
    const forcusYouth = usePage().props.forcusYouth;
    const forcusChild = usePage().props.forcusChild;
    const { data, setData, post, progress, processing, errors, reset } =
        useForm({
            adult: isEmpty(forcusAdult) ? 0 : forcusAdult,
            youth: isEmpty(forcusYouth) ? 0 : forcusYouth,
            child: isEmpty(forcusChild) ? 0 : forcusChild,
            totalPrice: totalPrice,
            extra: [],
            timeDeparture: detailTour.gio_khoi_hanh,
        });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
        if (event.target.name == "adult") {
            router.get(route("tour.show", detailTour.slug), {
                adult: event.target.value,
                youth: data.youth,
                child: data.child,
            });
        }
        if (event.target.name == "youth") {
            router.get(route("tour.show", detailTour.slug), {
                adult: data.adult,
                youth: event.target.value,
                child: data.child,
            });
        }
        if (event.target.name == "child") {
            router.get(route("tour.show", detailTour.slug), {
                adult: data.adult,
                youth: data.youth,
                child: event.target.value,
            });
        }
    };

    const numberFormat = (value) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };
    const [countPrice, setCountPrice] = useState(totalPrice);
    const handleCountPrice = (event) => {
        extraServices.map((extraService, index) => {
            if (event.target.name == `extra${index}`) {
                if (event.target.checked) {
                    setCountPrice(countPrice + extraService.price);
                    data.extra.push(extraService.id);
                } else {
                    setCountPrice(countPrice - extraService.price);
                }
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        router.get(route("booking"), {
            adult: data.adult,
            youth: data.youth,
            child: data.child,
            extra: data.extra,
            timeDeparture: data.timeDeparture,
            totalPrice: countPrice,
            tourId: detailTour.slug,
        });

        // router.post(
        //     route("booking"), {
        //         adult: data.adult,
        //         youth: data.youth,
        //         child: data.child,
        //         extra: data.extra,
        //         timeDeparture: data.timeDeparture,
        //         totalPrice: countPrice,
        //         tourId: detailTour.slug,
        //     }
        // );
    };


    // const forcuspage = useRef(null);

    // useEffect(() => {
    //     forcuspage.current.scrollIntoView({ behavior: "smooth" });
    // }, []);

    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href={route("welcome")}
            style={{ textDecoration: "none", color: "white" }}
        >
            Home
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href={route("tour")}
            style={{ textDecoration: "none", color: "white" }}
        >
            Tour
        </Link>,
        <Typography key="2" color="text.primary" style={{ color: "white" }}>
            {detailTour.ten_tour}
        </Typography>,
    ];

    const openDescription = (evt, DesName) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(
                " active",
                ""
            );
        }
        document.getElementById(DesName).style.display = "block";
        evt.currentTarget.className += " active";
    };

    const defaultOpen = () => {
        document.getElementById("defaultOpen").click();
    };

    return (
        <>
            <Head title="Detail Tour" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> Tours Detail</h1>
                            <div className="flex justify-content-center">
                                <Breadcrumbs
                                    separator={
                                        <NavigateNextIcon
                                            fontSize="small"
                                            style={{ color: "white" }}
                                        />
                                    }
                                    aria-label="breadcrumb"
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="container-layout"
                    style={{ paddingTop: "80px" }}
                >
                    <div className="layout-02">
                        <div className="row">
                            <div className="col-md-8 width-100">
                                <div className="bade-result">
                                    <div className="count-post">
                                        {detailTour.dia_chi}
                                    </div>
                                    <div className="filter-sort">
                                        <i className="fa-regular fa-heart"></i>{" "}
                                        Add to wishlist
                                    </div>
                                </div>
                                <h1 className="heading-title">
                                    {detailTour.ten_tour}
                                </h1>
                                <div className="row">
                                    <div className="col">
                                        <div className="inner">
                                            <label>From</label>
                                            <span className="currency-amount">
                                                {detailTour.gia_nguoi_lon}đ
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="inner">
                                            <label>From</label>
                                            <span>
                                                {detailTour.so_ngay} days
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="inner">
                                            <label>Max people</label>
                                            <span>{detailTour.so_cho}</span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="inner">
                                            <label>Min age</label>
                                            <span>
                                                {detailTour.do_tuoi_tu}+
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="inner">
                                            <label>Tour Type</label>
                                            <div className="type-tour">
                                                <a href="">
                                                    {detailTour.loai_tour}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="inner">
                                            <label>Date depart</label>
                                            <span>
                                                {detailTour.ngay_khoi_hanh}
                                            </span>
                                            {/* <label>Reviews</label>
                                            <div className="post-rating-star">
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <i className="fa-sharp fa-solid fa-star"></i>
                                                <span>4,5/5</span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="bade-inner">
                                    {/* <!-- Swiper --> */}
                                    <>
                                        <Swiper
                                            style={{
                                                "--swiper-navigation-color":
                                                    "#fff",
                                                "--swiper-pagination-color":
                                                    "#fff",
                                                zIndex: 0,
                                            }}
                                            loop={true}
                                            spaceBetween={10}
                                            navigation={true}
                                            thumbs={{ swiper: thumbsSwiper }}
                                            modules={[
                                                FreeMode,
                                                Navigation,
                                                Thumbs,
                                            ]}
                                            className="mySwiper2"
                                        >
                                            {detailTour.hinh_anh.map((item) => (
                                                <SwiperSlide className="widen">
                                                    <img
                                                        src={`http://localhost:8000/storage/${item.ten}`}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            loop={true}
                                            spaceBetween={10}
                                            slidesPerView={4}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[
                                                FreeMode,
                                                Navigation,
                                                Thumbs,
                                            ]}
                                            className="mySwiper mySwiper-details"
                                            style={{
                                                zIndex: 0,
                                            }}
                                        >
                                            {detailTour.hinh_anh.map((item) => (
                                                <SwiperSlide>
                                                    <img
                                                        src={`http://localhost:8000/storage/${item.ten}`}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </>
                                </div>
                            </div>
                            <div
                                className="col-6 col-md-4 width-100"
                                style={{ borderLeft: "none" }}
                            >
                                <div className="sidebar-form">
                                    <div className="search-available">
                                        <div className="booking-form__block">
                                            <h6 className="post-title">
                                                Book This Tour
                                            </h6>
                                            <form
                                                onSubmit={handleSubmit}
                                                className="booking-form"
                                            >
                                                <div className="input-group">
                                                    <div className="booking-block">
                                                        <span
                                                            class="booking_form"
                                                            style={{
                                                                lineHeight:
                                                                    "normal",
                                                            }}
                                                        >
                                                            Time
                                                        </span>
                                                        <span class="booking-clock">
                                                            {
                                                                detailTour.gio_khoi_hanh
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="booking-ticket">
                                                        <label className="booking_form">
                                                            Tickets
                                                        </label>
                                                        <div className="booking-guests-result">
                                                            <ul>
                                                                <li>
                                                                    <span className="booking-title">
                                                                        Adult
                                                                        (18+
                                                                        years)
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {" "}
                                                                        {numberFormat(
                                                                            detailTour.gia_nguoi_lon
                                                                        )}
                                                                    </span>
                                                                    <select
                                                                        name="adult"
                                                                        id="adult"
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        value={
                                                                            data.adult
                                                                        }
                                                                    >
                                                                        <option value="0">
                                                                            1
                                                                        </option>
                                                                        <option value="1">
                                                                            2
                                                                        </option>
                                                                        <option value="2">
                                                                            3
                                                                        </option>
                                                                        <option value="3">
                                                                            4
                                                                        </option>
                                                                        <option value="4">
                                                                            5
                                                                        </option>
                                                                        <option value="5">
                                                                            6
                                                                        </option>
                                                                        <option value="6">
                                                                            7
                                                                        </option>
                                                                        <option value="7">
                                                                            8
                                                                        </option>
                                                                        <option value="8">
                                                                            9
                                                                        </option>
                                                                        <option value="9">
                                                                            10
                                                                        </option>
                                                                    </select>
                                                                </li>
                                                                <li>
                                                                    <span className="booking-title">
                                                                        Youth
                                                                        (13-17
                                                                        years)
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {" "}
                                                                        {numberFormat(
                                                                            detailTour.gia_thieu_nien
                                                                        )}
                                                                    </span>
                                                                    <select
                                                                        name="youth"
                                                                        id="youth"
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        value={
                                                                            data.youth
                                                                        }
                                                                    >
                                                                        <option value="0">
                                                                            0
                                                                        </option>
                                                                        <option value="1">
                                                                            1
                                                                        </option>
                                                                        <option value="2">
                                                                            2
                                                                        </option>
                                                                        <option value="3">
                                                                            3
                                                                        </option>
                                                                        <option value="4">
                                                                            4
                                                                        </option>
                                                                        <option value="5">
                                                                            5
                                                                        </option>
                                                                        <option value="6">
                                                                            6
                                                                        </option>
                                                                        <option value="7">
                                                                            7
                                                                        </option>
                                                                        <option value="8">
                                                                            8
                                                                        </option>
                                                                        <option value="9">
                                                                            9
                                                                        </option>
                                                                        <option value="10">
                                                                            10
                                                                        </option>
                                                                    </select>
                                                                </li>
                                                                <li>
                                                                    <span className="booking-title">
                                                                        Children
                                                                        (0-12
                                                                        years)
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {" "}
                                                                        {numberFormat(
                                                                            detailTour.gia_tre_em
                                                                        )}
                                                                    </span>
                                                                    <select
                                                                        name="child"
                                                                        id="child"
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        value={
                                                                            data.child
                                                                        }
                                                                    >
                                                                        <option value="0">
                                                                            0
                                                                        </option>
                                                                        <option value="1">
                                                                            1
                                                                        </option>
                                                                        <option value="2">
                                                                            2
                                                                        </option>
                                                                        <option value="3">
                                                                            3
                                                                        </option>
                                                                        <option value="4">
                                                                            4
                                                                        </option>
                                                                        <option value="5">
                                                                            5
                                                                        </option>
                                                                        <option value="6">
                                                                            6
                                                                        </option>
                                                                        <option value="7">
                                                                            7
                                                                        </option>
                                                                        <option value="8">
                                                                            8
                                                                        </option>
                                                                        <option value="9">
                                                                            9
                                                                        </option>
                                                                        <option value="10">
                                                                            10
                                                                        </option>
                                                                    </select>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="services-block">
                                                        <label className="booking_form">
                                                            Extra services
                                                        </label>
                                                        <div className="list-services">
                                                            {extraServices.map(
                                                                (
                                                                    service,
                                                                    index
                                                                ) => (
                                                                    <i
                                                                        className="qtip tip-left"
                                                                        data-tip={
                                                                            service.description
                                                                        }
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            id={`extra${index}`}
                                                                            name={`extra${index}`}
                                                                            value={
                                                                                service.name
                                                                            }
                                                                            onChange={
                                                                                handleCountPrice
                                                                            }
                                                                        />
                                                                        <label
                                                                            for={`extra${index}`}
                                                                        >
                                                                            {
                                                                                service.name
                                                                            }
                                                                        </label>
                                                                        <span className="price-extra">
                                                                            {numberFormat(
                                                                                service.price
                                                                            )}
                                                                        </span>
                                                                    </i>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="total-group">
                                                    <label className="booking_form_input_label">
                                                        Total
                                                    </label>
                                                    <span
                                                        className="currency_amount"
                                                        data-amount="0"
                                                    >
                                                        {numberFormat(
                                                            countPrice
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="submit-group">
                                                    <button type="submit">
                                                        Book Now{" "}
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </form>
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
                            <div className="col-md-8 width-100">
                                <div className="content-tabs">
                                    <div className="tab">
                                        <button
                                            className="tablinks active"
                                            onClick={(event) =>
                                                openDescription(
                                                    event,
                                                    "Overview"
                                                )
                                            }
                                            id="defaultOpen"
                                            ref={defaultOpen}
                                        >
                                            Overview
                                        </button>
                                        <button
                                            className="tablinks active"
                                            onClick={(event) =>
                                                openDescription(
                                                    event,
                                                    "Tourplan"
                                                )
                                            }
                                        >
                                            Tour plan
                                        </button>
                                        <button
                                            className="tablinks active"
                                            onClick={(event) =>
                                                openDescription(
                                                    event,
                                                    "Location"
                                                )
                                            }
                                        >
                                            Location
                                        </button>
                                        <button
                                            className="tablinks active"
                                            onClick={(event) =>
                                                openDescription(
                                                    event,
                                                    "Reviews"
                                                )
                                            }
                                        >
                                            Reviews
                                        </button>
                                    </div>

                                    <div id="Overview" className="tabcontent">
                                        <div className="content-tab">
                                            <h2 className="heading-title">
                                                description
                                            </h2>
                                            <Description>
                                                {detailTour.mo_ta != null ? (
                                                    <>{detailTour.mo_ta}</>
                                                ) : (
                                                    <>Hiện chưa có mô tả</>
                                                )}
                                            </Description>
                                        </div>
                                        <div className="highlights-box">
                                            <div className="highlight-inner">
                                                <div className="thumb">
                                                    <img
                                                        src="../images/detail-tour/img_single_tour_1.webp"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="desc">
                                                    <h5 className="heading-title">
                                                        Highlights
                                                    </h5>
                                                    <Highlight />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="Tourplan" className="tabcontent">
                                        <h2 className="heading-title">
                                            Tour Plan
                                        </h2>
                                        {isEmpty(schedule) ? (
                                            <div className="alert alert-danger">
                                                Hiện chưa có lịch trình
                                            </div>
                                        ) : (
                                            <>
                                                {schedule.map((item, index) => (
                                                    <Tourplan>
                                                        <div className="float-right">
                                                            {
                                                                item.lich_trinh_ngay
                                                            }
                                                        </div>
                                                        <h4 className="card-title">
                                                            {/* <span>Day 2</span> Sessions */}
                                                            {item.tieu_de}
                                                        </h4>
                                                        <p className="card-text">
                                                            {/* get data in database have format html */}

                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    __html: item.noi_dung,
                                                                }}
                                                            />
                                                        </p>
                                                    </Tourplan>
                                                ))}
                                            </>
                                        )}
                                    </div>

                                    <div id="Location" className="tabcontent">
                                        <h2 className="heading-title">
                                            Location
                                        </h2>
                                        <Location
                                            src={detailTour.du_lieu_map}
                                        />
                                    </div>

                                    <div id="Reviews" className="tabcontent">
                                        <h2 className="heading-title">
                                            Reviews
                                        </h2>
                                        <Rating />
                                        <div className="comment-list__wrap">
                                            <Comment />
                                            <Reply />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="col-6 col-md-4 width-100"
                                style={{ border: "none" }}
                            >
                                <div className="tour-content__item">
                                    <div className="tour-content__item-grid">
                                        <div className="inner">
                                            <a href="#" className="inner-cta">
                                                <div className="cta-bg-wrapper">
                                                    <div className="bg"></div>
                                                    <div className="bg-overlay"></div>
                                                </div>
                                                <div className="cta-content">
                                                    <h2 className="cta-title">
                                                        happy holiday
                                                    </h2>
                                                    <div className="cta-description">
                                                        Stay &amp; Enjoy
                                                        <br />
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "16px",
                                                                fontFamily:
                                                                    "jost",
                                                                fontWeight: 400,
                                                                letterSpacing: 0,
                                                                color: "var(--text)",
                                                            }}
                                                        >
                                                            15% off on all room
                                                            types
                                                        </span>
                                                    </div>
                                                    <div className="cta-button__wrapper">
                                                        <span className="cta-button">
                                                            Book now
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="tour-content__item-grid">
                                        <div className="inner">
                                            <a href="#" className="inner-cta">
                                                <div className="cta-bg-wrapper">
                                                    <div className="bg"></div>
                                                    <div className="bg-overlay"></div>
                                                </div>
                                                <div className="cta-content">
                                                    <h2 className="cta-title">
                                                        happy holiday
                                                    </h2>
                                                    <div className="cta-description">
                                                        Stay &amp; Enjoy
                                                        <br />
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    "16px",
                                                                fontFamily:
                                                                    "jost",
                                                                fontWeight: 400,
                                                                letterSpacing: 0,
                                                                color: "#FFFFFF",
                                                            }}
                                                        >
                                                            starting from{" "}
                                                            <span
                                                                style={{
                                                                    fontSize:
                                                                        "18px",
                                                                    fontWeight: 600,
                                                                    color: "#4BD31B",
                                                                }}
                                                            >
                                                                $189
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="cta-button__wrapper">
                                                        <span className="cta-button">
                                                            Book now
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}
