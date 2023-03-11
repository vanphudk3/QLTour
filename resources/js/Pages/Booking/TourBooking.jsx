import Content from "@/Layouts/Tour";
import { Head, Link, router } from "@inertiajs/react";
import { usePage, useForm } from "@inertiajs/react";
import { Autocomplete, Breadcrumbs, TextField, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { isEmpty } from "lodash";
import React, { useRef, useState, useEffect } from "react";

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
        key="1"
        color="inherit"
        href={route("tour")}
        style={{ textDecoration: "none", color: "white" }}
    >
        Tour list
    </Link>,
    <Link
        underline="hover"
        key="1"
        color="inherit"
        href={route("welcome")}
        style={{ textDecoration: "none", color: "white" }}
    >
        Tour Details
    </Link>,
    <Typography key="2" color="text.primary" style={{ color: "white" }}>
        Tour Booking
    </Typography>,
];

const numberFormat = (value) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
};

export default function TourBooking(props) {
    const detailTour = usePage().props.detailTour;
    const cities = usePage().props.cities;
    const districts = usePage().props.districts;
    const wards = usePage().props.wards;
    const forcusCity = usePage().props.forcusCity;
    const forcusDistricts = usePage().props.forcusDistricts;
    const getdistrict = usePage().props.booking.district;

    const [city, setcity] = useState([]);
    const [cityId, setcityId] = useState('');

    useEffect(() => {
        const getCity = async () => {
            const rescity = await fetch("https://provinces.open-api.vn/api/");
            const datacity = await rescity.json();
            setcity(await datacity);
        };
        getCity();
    },[]);

    const arrCities = [];

    city.map((city) => {
        arrCities.push({
            label: city.name,
            idCity: city.id,
        });
    });

    const arrDistricts = [];
    if(isEmpty(districts)){
        districts.map((district) => {
            arrDistricts.push({
                label: district.name,
                idDistrict: district.id,
            });
        });
    }
    if(!isEmpty(getdistrict)){
        getdistrict.map((district) => {
            arrDistricts.push({
                label: district.name,
                idDistrict: district.id,
            });
        });
    }

    const arrWards = [];
    if (isEmpty(wards)) {
        wards.map((ward) => {
            arrWards.push({
                label: ward.name,
                idWard: ward.id,
            });
        });
    }

    const arrCount = [
        {
            name: "Traveller 1",
        },
    ];
    for (let i = 1; i < detailTour.counttraveller; i++) {
        arrCount.push({
            name: `Traveller ${i + 1}`,
        });
    }

    const { data, setData, post, progress, processing, errors, reset } = 
        useForm({
            city: isEmpty(forcusCity) ? "" : forcusCity,
            district: isEmpty(forcusDistricts) ? "" : forcusDistricts,
            ward: "",
            detailTour: detailTour.ky_hieu,

        });

    // console.log(data);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
        if(event.target.name == "city"){
            const getcityId = event.target.value;
            setcityId(getcityId);
        }
    };

    const forcuspage = useRef(null);
        useEffect(() => {
            forcuspage.current.scrollIntoView({ behavior: "smooth" });
        }, []);

    return (
        <>
            <Head title="Tour Booking" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> Tours Booking</h1>
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
                <div className="container-layout">
                    <div className="detail-tour" style={{ marginTop: "20px" }}>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">Select Tour</a>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Contact Details
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="layout-02">
                        <div className="row">
                            <div className="col-4 width-100 width-50">
                                <div className="img-detail">
                                    <img
                                        src={`http://localhost:8000/storage/${detailTour.hinh_anh}`}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-8 width-100 width-50">
                                <div className="content-detail">
                                    <span className="single-address">
                                        {detailTour.dia_chi}
                                    </span>
                                    <h1 className="heading-title">
                                        {detailTour.ten_tour}
                                    </h1>
                                    <table>
                                        <tr>
                                            <td>
                                                <i className="fa-solid fa-id-card"></i>{" "}
                                                Code
                                            </td>
                                            <td>
                                                <span>
                                                    {detailTour.ky_hieu}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i className="fa-solid fa-calendar"></i>{" "}
                                                Departure Day
                                            </td>
                                            <td>
                                                <span>
                                                    {detailTour.ngay_khoi_hanh}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i className="fa-solid fa-clock"></i>{" "}
                                                Period
                                            </td>
                                            <td>
                                                <span>
                                                    {detailTour.so_ngay} Days /{" "}
                                                    {detailTour.so_dem} Night
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i className="fa-solid fa-car"></i>{" "}
                                                Vechicle
                                            </td>
                                            <td>
                                                <span>
                                                    {detailTour.transpost}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i className="fa-solid fa-map-marker"></i>{" "}
                                                Departure Location
                                            </td>
                                            <td>
                                                <span>
                                                    {detailTour.noi_khoi_hanh}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i className="fa-solid fa-person"></i>{" "}
                                                Available
                                            </td>
                                            <td>
                                                <span>{detailTour.so_cho}</span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-layout">
                    <div className="layout-02 booking-layout">
                        <div className="row">
                            <div className="col-md-8">
                                <form action="">
                                    <h3 className="heading-title">
                                        Traveller Details
                                    </h3>
                                    {arrCount.map((e, index) => (
                                        <div className="contact-form">
                                            <label className="booking_form">
                                                {e.name}
                                            </label>
                                            <div className="flex justify-content-between">
                                                <div className="w-48 mb-3">
                                                    <input
                                                        type="text"
                                                        name={`first_name_${index}`}
                                                        className="form-control"
                                                        placeholder="First name"
                                                        aria-label="First name"
                                                    />
                                                    {/* <TextField
                                                        id="standard-basic"
                                                        label={`First name ${e.id}`}
                                                        name={`first_name_${index}`}
                                                    /> */}
                                                </div>
                                                <div className="w-48 mb-3">
                                                    <input
                                                        type="text"
                                                        name={`last_name_${index}`}
                                                        className="form-control"
                                                        placeholder="Last name"
                                                        aria-label="Last name"
                                                    />
                                                    {/* <TextField
                                                        id="standard-basic"
                                                        label={`Last name ${e.id}`}
                                                        name={`last_name_${index}`}
                                                    /> */}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    name={`citizen_identification_${index}`}
                                                    className="form-control"
                                                    placeholder="Citizen Identification/Passport*"
                                                    aria-label="citizen identification/passport"
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <select
                                                        name={`gender_${index}`}
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                    >
                                                        <option selected="">
                                                            Age*
                                                        </option>
                                                        <option value="1">
                                                            0-12
                                                        </option>
                                                        <option value="2">
                                                            13-17
                                                        </option>
                                                        <option value="3">
                                                            18+ 20
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="col mb-3">
                                                    <input
                                                        type="text"
                                                        name={`phone_${index}`}
                                                        className="form-control"
                                                        placeholder="Phone*"
                                                        aria-label="Last name"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <h3 className="heading-title">
                                        Contact Details
                                    </h3>
                                    <div className="contact-form">
                                        <div className="contact-infor">
                                            <div className="contact-infor__block">
                                                <label for="name">Name*</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                            <div className="contact-infor__block">
                                                <label for="email">
                                                    Email*
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="Your Email"
                                                />
                                            </div>
                                            <div className="contact-infor__block">
                                                <label for="phone">
                                                    Phone*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    placeholder="Your Phone"
                                                />
                                            </div>
                                            <div className="contact-infor__block">
                                                <label for="address">
                                                    Address*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    placeholder="Your Address"
                                                />
                                            </div>
                                            <div className="contact-infor__block">
                                                <label for="country">
                                                    City*
                                                </label>
                                                {/* <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                >
                                                    <option selected>
                                                        Open this select menu
                                                    </option>
                                                    <option value="1">
                                                        One
                                                    </option>
                                                    <option value="2">
                                                        Two
                                                    </option>
                                                    <option value="3">
                                                        Three
                                                    </option>
                                                </select> */}
                                                {!isEmpty(data.city) ? (
                                                <Autocomplete
                                                    disablePortal
                                                    id="city"
                                                    options={arrCities}
                                                    value={data.city}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setData(
                                                            "city",
                                                            newValue.label
                                                        );
                                        
                                                    }}
                                                    ref={forcuspage}
                                                    // sx={{ width: 300 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="City"
                                                        />
                                                    )}
                                                />
                                                ) : (
                                                <Autocomplete
                                                    disablePortal
                                                    id="city"
                                                    options={arrCities}
                                                    value={data.city}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setData(
                                                            "city",
                                                            newValue.label
                                                        );
                                                    }}
                                                    ref={forcuspage}
                                                    // sx={{ width: 300 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="City"
                                                        />
                                                    )}
                                                />
                                                )}
                                            </div>
                                            <div className="contact-infor__block">
                                                <label for="city">District*</label>
                                                {/* <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                >
                                                    <option selected>
                                                        Open this select menu
                                                    </option>
                                                    <option value="1">
                                                        One
                                                    </option>
                                                    <option value="2">
                                                        Two
                                                    </option>
                                                    <option value="3">
                                                        Three
                                                    </option>
                                                </select> */}
                                                <Autocomplete
                                                    disablePortal
                                                    id="district"
                                                    options={arrDistricts}
                                                    value={data.district}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setData(
                                                            "district",
                                                            newValue.idDistrict
                                                        );
                                            
                                                    }}
                                                    // sx={{ width: 300 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="District"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="contact-infor__block">
                                                <label for="city">
                                                    Ward*
                                                </label>
                                                {/* <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                >
                                                    <option selected>
                                                        Open this select menu
                                                    </option>
                                                    <option value="1">
                                                        One
                                                    </option>
                                                    <option value="2">
                                                        Two
                                                    </option>
                                                    <option value="3">
                                                        Three
                                                    </option>
                                                </select> */}
                                                <Autocomplete
                                                    disablePortal
                                                    id="ward"
                                                    options={arrWards}
                                                    value={data.ward}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setData(
                                                            "ward",
                                                            newValue.label
                                                        );
                                                    }}
                                                    // sx={{ width: 300 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Ward"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="contact-infor__block">
                                                <label for="zip">Zip</label>
                                                <input
                                                    type="text"
                                                    id="zip"
                                                    placeholder="Your Zip"
                                                />
                                            </div>
                                            <div className="contact-infor__block">
                                                <label for="messenger">
                                                    Messenger
                                                </label>
                                                <textarea
                                                    name="messenger"
                                                    id=""
                                                    cols="30"
                                                    rows="10"
                                                    placeholder="writing something ..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div
                                className="col-6 col-md-4 width-100"
                                style={{ borderLeft: "none" }}
                            >
                                <div className="sidebar-form">
                                    <div className="search-available">
                                        <div className="booking-form__block">
                                            <h6 className="post-title">
                                                Broome To The Bungle Bungles
                                            </h6>
                                            <form
                                                action=""
                                                className="booking-form"
                                            >
                                                <div className="input-group">
                                                    <div className="booking-block">
                                                        <span
                                                            className="booking_form"
                                                            style={{
                                                                lineHeight:
                                                                    "normal",
                                                            }}
                                                        >
                                                            Time
                                                        </span>
                                                        <span className="booking-clock">
                                                            {
                                                                detailTour.timeDeparture
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
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {
                                                                            detailTour.adults
                                                                        }{" "}
                                                                        x
                                                                        {numberFormat(
                                                                            detailTour.gia_nguoi_lon
                                                                        )}
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {numberFormat(
                                                                            detailTour.priceAdults
                                                                        )}
                                                                    </span>
                                                                </li>
                                                                {!isEmpty(
                                                                    detailTour.youth
                                                                ) && (
                                                                    <li>
                                                                        <span className="booking-title">
                                                                            Youth
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {
                                                                                detailTour.youth
                                                                            }{" "}
                                                                            x
                                                                            {numberFormat(
                                                                                detailTour.gia_thieu_nien
                                                                            )}
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {numberFormat(
                                                                                detailTour.priceYouth
                                                                            )}
                                                                        </span>
                                                                    </li>
                                                                )}
                                                                {!isEmpty(
                                                                    detailTour.child
                                                                ) && (
                                                                    <li>
                                                                        <span className="booking-title">
                                                                            Children
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {
                                                                                detailTour.child
                                                                            }{" "}
                                                                            x
                                                                            {numberFormat(
                                                                                detailTour.gia_tre_em
                                                                            )}
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {numberFormat(
                                                                                detailTour.priceChild
                                                                            )}
                                                                        </span>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    {!isEmpty(
                                                        detailTour.extra
                                                    ) && (
                                                        <>
                                                            <div className="services-block">
                                                                <label className="booking_form">
                                                                    Extra
                                                                    services
                                                                </label>
                                                                <div className="list-services">
                                                                    {detailTour.extra.map(
                                                                        (
                                                                            item
                                                                        ) => (
                                                                            <i
                                                                                className="qtip tip-left"
                                                                                data-tip={
                                                                                    item.description
                                                                                }
                                                                            >
                                                                                <label for="booking-extra">
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </label>
                                                                                <span className="price-extra">
                                                                                    {numberFormat(
                                                                                        item.price
                                                                                    )}
                                                                                </span>
                                                                            </i>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className="coupon">
                                                        <label className="booking_form">
                                                            Coupon
                                                        </label>
                                                        <div className="coupon-block">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter your coupon code"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="coupon-btn"
                                                            >
                                                                Apply
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="detail-price">
                                                        <label className="booking_form">
                                                            Detail Price
                                                        </label>
                                                        <div className="detail-price__item">
                                                            <span className="detail-price__title">
                                                                Subtotal
                                                            </span>
                                                            <span className="detail-price__price">
                                                                {numberFormat(
                                                                    detailTour.subtotal
                                                                )}
                                                            </span>
                                                        </div>
                                                        {!isEmpty(
                                                            detailTour.extra
                                                        ) && (
                                                            <>
                                                                <div className="detail-price__item">
                                                                    <span className="detail-price__title">
                                                                        Extra
                                                                        services
                                                                    </span>
                                                                    <span className="detail-price__price">
                                                                        {numberFormat(
                                                                            detailTour.priceExtra
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )}
                                                        <div className="detail-price__item">
                                                            <span className="detail-price__title">
                                                                Coupon
                                                            </span>
                                                            <span className="detail-price__price">
                                                                -300.000đ
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="total-group">
                                                    <label className="booking_form_input_label">
                                                        Total Price
                                                    </label>
                                                    <span
                                                        className="currency_amount"
                                                        data-amount="0"
                                                    >
                                                        {numberFormat(
                                                            detailTour.totalPrice
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
            </Content>
        </>
    );
}
