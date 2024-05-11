import Content from "@/Layouts/Tour";
import { Head, Link, router } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
import * as React from "react";
import {
    Autocomplete,
    Box,
    Breadcrumbs,
    Button,
    Step,
    StepButton,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { isEmpty, round } from "lodash";
import { useState } from "react";
import InputError from "@/Components/InputError";
import validator from "validator/lib/isEmpty";
// import ButtonPaypal from "@/Components/Paypal/ButtonPaypal";
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import TextInput from "@/Components/TextInput";

import AlertDialog from "@/Components/DialogPlayout";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import BasicTooltip from "@/Components/Toolip";
import Swal from "sweetalert2";
import Select from "@/Components/Bootstrap/Select";
const numberFormat = (value) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
};

export default function Checkout(props) {
    const getBooking = usePage().props.getBooking;
    const detailTour = usePage().props.detailTour;
    const managerTour = usePage().props.managerTour;
    const lang = usePage().props.lang;
    const _lang = usePage().props._lang;
    const arrCount = Array.from({ length: getBooking.travellers.length }, (_, i) => ({
        name: lang['Traveller'] + " " + (i + 1),
    }));
    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href={route("welcome", {lang: _lang})}
            style={{ textDecoration: "none", color: "white" }}
        >
            {lang['Home']}
        </Link>,
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href={route("tour", {lang: _lang})}
            style={{ textDecoration: "none", color: "white" }}
        >
            {lang['Tour list']}
        </Link>,
        <Link
            underline="hover"
            key="1"
            color="inherit"
            // href={route("tour.detail", {lang: _lang, id: detailTour.tourId})}
            href={"/tour/" + detailTour.slug + "?lang=" + _lang + "&adults=" + detailTour.adults + "&youth=" + detailTour.youth??0 + "&child=" + detailTour.child}
            style={{ textDecoration: "none", color: "white" }}
        >
            {lang['Tour Details']}
        </Link>,
        <Typography key="2" color="text.primary" style={{ color: "white" }}>
            {lang['Tour Booking']}
        </Typography>,
    ];
    const { data, setData, post, processing, errors, reset } = useForm({
        tour_id: detailTour.tourId,
        customer: "",
        user: "",
        name: getBooking.name,
        email: getBooking.email,
        phone: getBooking.phone,
        address: getBooking.customer_address,
        note: getBooking.note || "",
        payment: "",
        total: getBooking.totalPrice,
        subtotal: getBooking.subtotal,
        coupon: getBooking.coupon,
        travellers: getBooking.travellers,
        time: detailTour.gio_khoi_hanh,
        date: detailTour.ngay_khoi_hanh,
        date_id: getBooking.date_id,
        adult: getBooking.adult,
        youth: getBooking.youth,
        child: getBooking.child,
        coupon: getBooking.coupon,
        extra: getBooking.extra,
        coupon_id: getBooking.coupon_id,
        _lang: _lang,
    });
    const [showCoupon, setShowCoupon] = useState(false);
    // nếu có coupon thì xóa class hide
    useEffect(() => {
        setShowCoupon(data.coupon_id !== undefined);
    }, [data.coupon_id]);


    // const total = _lang == "en" ? data.total / 23447 : data.total;
    const total = data.total / 23447;
    const gettotal = round(total, 2);
    const amount = `${gettotal}`;
    // const currency = _lang == "en" ? "USD" : "VND";
    const currency = "USD";
    const style = { layout: "vertical" };
    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(datas, actions) => {
                        if (data.adult + data.youth + data.child > detailTour.so_cho) {
                            Swal.fire({
                                icon: 'error',
                                title: lang['The number of people exceeds the number of seats'],
                                showConfirmButton: false,
                                toast: true,
                                timer: 3000,
                                timerProgressBar: true,
                                position: 'top-end',
                            });
                            return;
                        }
                        if (data.adult == 0) {
                            Swal.fire({
                                icon: 'error',
                                title: lang['The number of people at least 1 adult'],
                                showConfirmButton: false,
                                toast: true,
                                timer: 3000,
                                timerProgressBar: true,
                                position: 'top-end',
                            });
                            return;
                        }
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function () {
                            post(route("checkout.process"), {
                                _method: "POST",
                                preserveScroll: true,
                            });
                        });
                    }}
                />
            </>
        );
    };

    const [validationMsg, setValidationMsg] = useState({});
    const validateAll = () => {
        const msg = {};

        if (validator(data.payment)) {
            msg.payment = "The payment field is required.";
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) {
            return false;
        }
        return true;
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = (id, name, description, type) => () => {
        setOpen(true);
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        if (data.adult + data.youth + data.child > detailTour.so_cho) {
            // confirm(lang['The number of people exceeds the number of seats']);
            Swal.fire({
                icon: 'error',
                title: lang['The number of people exceeds the number of seats'],
                showConfirmButton: false,
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                position: 'top-end',
            });
            return;
        }
        if (data.adult == 0) {
            // confirm(lang['The number of people exceeds the number of seats']);
            Swal.fire({
                icon: 'error',
                title: lang['The number of people at least 1 adult'],
                showConfirmButton: false,
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                position: 'top-end',
            });
            return;
        }
        if (data.payment == 0) {
            post(route("checkout.process"), {
                _method: "POST",
                preserveScroll: true,
            });
        }
    };

    const [travellers, setTravellers] = useState(data.travellers || []);
    useEffect(() => {
        setTravellers(data.travellers || []);
      }, [data.travellers]);
      const handleToggle = () => {
        setOpen(!open);
        // trả lại data cũ nếu cancel
        // setData("travellers", getBooking.travellers);
        setTravellers(data.travellers);
        
    };
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        const index = name.split("_")[1];
        const key = name.split("_")[0];
        let newValue = value;
        if (key === "phone" || key === "CMND") {
            newValue = value.replace(/[^0-9]/g, "");
        }
        if (key === "age") {
            newValue = value;
        }
        // console.log(newValue);

        const newTravellers = [...travellers];
        newTravellers[index] = {
            ...newTravellers[index],
            [key]: newValue,
        };
        setTravellers(newTravellers);
        
    };

    const confirmcustom = (message, yesText, noText, callback) => {
        const result = window.confirm(message);
        if (result) {
          callback();
        }
      };
    
    const onHandleChangeTraveller = (e) => {
        e.preventDefault();
        // nếu rỗng thì không cho submit
        if (travellers.length === 0) {
            confirm(lang['Please enter the information of the traveler']);
            // Swal.fire({
            //     icon: 'error',
            //     title: lang['Please enter the information of the traveler'],
            //     showConfirmButton: false,
            //     toast: true,
            //     timer: 3000,
            //     timerProgressBar: true,
            // });

            return;
        }

        // nếu các trường rỗng thì không cho submit
        let check = false;
        travellers.forEach((e) => {
            if (e.name === "" || e.phone === "") {
                check = true;
            }
        });
        if (check) {
            // Swal.fire({
            //     icon: 'error',
            //     title: lang['Please enter the information of the traveler'],
            //     showConfirmButton: false,
            //     position: 'top-end',
            //     toast: true,
            //     timer: 3000,
            //     timerProgressBar: true,
            //     zIndex: 9999,
            // });
            confirm(lang['Please enter the information of the traveler']);
            return;
        }

        confirmcustom(lang['You want to save the changes'], lang['Yes'], lang['No'], () => {
            // tăng số lượng người lớn, trẻ em, em bé
            let adult = 0;
            let youth = 0;
            let child = 0;
            let extra = 0;
            travellers.forEach((e) => {
                console.log(e);
                if (e.age == 1 || e.age == ''){
                    child++;
                } else if (e.age == 2) {
                    youth++;
                }
                else {
                    adult++;
                }
            });

            data.adult = adult;
            data.youth = youth;
            data.child = child;
            // console.log(adult + " " + youth + " " + child);
            if (getBooking.extra.length > 0) {
                getBooking.extra.forEach((e) => {
                    extra += e.price;
                });
            }
            data.subtotal = adult * detailTour.get_price + youth * detailTour.get_price * 0.8 + child * detailTour.get_price * 0.5;
            data.total = adult * detailTour.get_price + youth * detailTour.get_price * 0.8 + child * detailTour.get_price * 0.5 + extra;
            if (data.coupon_id !== undefined && data.coupon.indexOf("%") !== -1) {
                let value = data.coupon.replace("%", "");
                data.total = data.total - data.total * value / 100;
            }            
            setData("travellers", travellers);
            handleToggle();
        });
          };

    const removeTraveller = (index) => {
        setTravellers((prevTravellers) => prevTravellers.filter((_, i) => i !== index));
      };

      
      const addTraveller = () => {
        setTravellers((prevTravellers) => [...prevTravellers, { name: '', CMND: '', age: '', phone: '' }]);
      };
      

    const handlePayment = () => {
        const byCash = document.getElementById("byCash");
        const bypaypal = document.getElementById("bypaypal");
        const byTransfer = document.getElementById("byTransfer");
        const byVNPay = document.getElementById("byvnpay");
        const getcash = document.getElementById("cash");
        const gettransfer = document.getElementById("transfer");
        const getpaypal = document.getElementById("paypal");
        const getvnpay = document.getElementById("vnpay");

        if (getcash.checked) {
            setData("payment", "0");
            byCash.style.display = "block";
            bypaypal.style.display = "none";
            byTransfer.style.display = "none";
            byVNPay.style.display = "none";
        } else if (gettransfer.checked) {
            setData("payment", "1");
            byCash.style.display = "none";
            bypaypal.style.display = "none";
            byTransfer.style.display = "block";
            byVNPay.style.display = "none";
        } else if (getpaypal.checked) {
            setData("payment", "2");
            byCash.style.display = "none";
            bypaypal.style.display = "block";
            byTransfer.style.display = "none";
            byVNPay.style.display = "none";
        } else if (getvnpay.checked) {
            setData("payment", "3");
            byCash.style.display = "none";
            bypaypal.style.display = "none";
            byTransfer.style.display = "none";
            byVNPay.style.display = "block";
        }
    };

    return (
        <>
            <Head title="Checkout" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> {lang['Tours Booking']}</h1>
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
                <div
                    className="container-layout"
                    style={{ paddingTop: "25px" }}
                >
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
                                                {lang['Code']}
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
                                                {lang['Departure Day']}
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
                                                {lang['Period']}
                                            </td>
                                            <td>
                                                <span>
                                                    {detailTour.so_ngay} {lang['days']} /{" "}
                                                    {detailTour.so_dem} {lang['Night']}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <i className="fa-solid fa-car"></i>{" "}
                                                {lang['Vechicle']}
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
                                                {lang['Departure Location']}
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
                                                {lang['Available']}
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
                    <div className="layout-02 booking-layout">
                        <div className="row">
                            <div className="col-md-8">
                                <h4 className="heading-title">
                                        {lang['Contact Details']}
                                </h4>
                                <div className="contact-detail">
                                    <div className="contact-item wrd">
                                        <table>
                                            <tr>
                                                <td>{lang['Name']}:</td>
                                                <td>{getBooking.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email:</td>
                                                <td>{getBooking.email}</td>
                                            </tr>
                                            <tr>
                                                <td>{lang['Phone']}:</td>
                                                <td>{getBooking.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>{lang['Address']}:</td>
                                                <td>
                                                    {
                                                        getBooking.customer_address
                                                    }
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <h4 className="heading-title">
                                    {lang['Traveller Details']}
                                    <a
                                            className="edit-contact"
                                            variant="contained"
                                            color="primary"
                                            onClick={handleOpen()}
                                        >
                                            {/* <i className="fa-solid fa-edit"></i> */}
                                            <i class="fas fa-edit fa-xs"></i>
                                        </a>
                                </h4>
                                <div className="contact-traveller">
                                    {data.travellers.map(
                                        (traveller, index) => (
                                            <div className="contact-item">
                                                <label className="booking_form">
                                                    {lang['Traveller']} {index + 1}
                                                </label>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            {lang['First and Last Name']}:
                                                        </td>
                                                        <td>
                                                            {traveller.name}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {lang['Citizen Identification/Passport']}
                                                        </td>
                                                        <td>
                                                            {traveller.CMND}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>{lang['Age']}:</td>
                                                        <td>{traveller.age == 1 ? '0-12' : traveller.age == 2 ? '13-17' : '18 + 20'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{lang['Phone']}:</td>
                                                        <td>
                                                            {traveller.phone}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        )
                                    )}
                                </div>
                                <h4 className="heading-title">{lang['Payment']}</h4>
                                <label for="Payment">{lang['Payment Methods']}</label>
                                <InputError
                                    message={validationMsg.payment}
                                    className="mt-2"
                                />
                                <div className="row">
                                    <div className="col">
                                        <div className="detail-method">
                                            <div className="plt">
                                                <div className="method">
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            name="cash"
                                                            id="cash"
                                                            className="checked"
                                                            onChange={
                                                                handlePayment
                                                            }
                                                        />
                                                    </div>
                                                    <label for="cash">
                                                        {lang['Cash']}
                                                    </label>
                                                </div>
                                                <i className="fa-solid fa-money-bill"></i>
                                            </div>
                                            <div
                                                className="content-method"
                                                id="byCash"
                                            >
                                                {/* Please pay at any Zourney office
                                                nationwide and overseas
                                                branches. See details. */}
                                                {lang['byCash']}
                                            </div>
                                        </div>
                                        <div className="detail-method">
                                            <div className="plt">
                                                <div className="method">
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            name="cash"
                                                            id="transfer"
                                                            onChange={
                                                                handlePayment
                                                            }
                                                        />
                                                    </div>
                                                    <label for="cash">
                                                        {lang['Transfer']}
                                                    </label>
                                                </div>
                                                <i className="fa-solid fa-building-columns"></i>
                                            </div>
                                            <div
                                                className="content-method"
                                                id="byTransfer"
                                            >
                                                <p
                                                    style={{
                                                        textAlign: "justify",
                                                    }}
                                                    className="content-payment"
                                                >
                                                    {/* After making the transfer,
                                                    please send an email to
                                                    emb1910059@student.ctu.edu.com
                                                    or call the hotline
                                                    123456789 for confirmation
                                                    from our company. */}
                                                    {lang['byTransfer']}
                                                </p>
                                                <span>{lang['Name account']}: </span>
                                                <span className="infor-payment">
                                                    ZOURNEY
                                                </span>
                                                <br />
                                                <span>{lang['Number Account']}: </span>
                                                <span className="infor-payment">
                                                    02345 10546 6065
                                                </span>
                                                <br />
                                                <span>{lang['Bank']}: </span>
                                                <span className="infor-payment">
                                                    VietComBank - Can Tho
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="detail-method">
                                            <div className="plt">
                                                <div className="method">
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            name="cash"
                                                            id="paypal"
                                                            className="checked"
                                                            onChange={
                                                                handlePayment
                                                            }
                                                        />
                                                    </div>
                                                    <label for="cash">
                                                        {lang['Payment Paypal']}
                                                    </label>
                                                </div>
                                                <i className="fa-solid fa-qrcode"></i>
                                            </div>
                                            <div
                                                className="content-method"
                                                id="bypaypal"
                                            >
                                                {lang['Please pay by port payment']}
                                            </div>
                                        </div>
                                        <div className="detail-method">
                                            <div className="plt">
                                                <div className="method">
                                                    <div>
                                                        <input
                                                            type="radio"
                                                            name="cash"
                                                            id="vnpay"
                                                            onChange={
                                                                handlePayment
                                                            }
                                                        />
                                                    </div>
                                                    <label for="cash">
                                                        {lang['Payment']} VNPAY
                                                    </label>
                                                </div>
                                                <i className="payment-icon payment-icon--1"></i>
                                            </div>
                                            <div
                                                className="content-method"
                                                id="byvnpay"
                                            >
                                                {/* Please pay by port payment
                                                electronic VNPAY. */}
                                                {lang['byVNPAY']}
                                            </div>
                                        </div>
                                    </div>
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
                                                {lang['Broome To The Bungle Bungles']}
                                            </h6>
                                            <form
                                                onSubmit={onHandleSubmit}
                                                method="post"
                                                className="booking-form"
                                                encType="application/x-www-form-urlencoded"
                                            >
                                                <input
                                                    name="date"
                                                    type="date"
                                                    hidden
                                                    value={detailTour.ngay_khoi_hanh}
                                                    onChange={
                                                        (e) => setData("date", e.target.value)
                                                    }
                                                />
                                                <div className="input-group">
                                                    <div className="booking-block">
                                                        <span
                                                            className="booking_form"
                                                            style={{
                                                                lineHeight:
                                                                    "normal",
                                                            }}
                                                        >
                                                            {lang['Time']}
                                                        </span>
                                                        <span className="booking-clock">
                                                            {
                                                                detailTour.gio_khoi_hanh
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="booking-ticket">
                                                        <label className="booking_form">
                                                            {lang['Tickets']}
                                                        </label>
                                                        <div className="booking-guests-result">
                                                            <ul>
                                                                <li>
                                                                    <span className="booking-title">
                                                                        {lang['Adult']}
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {
                                                                            // getBooking.adult
                                                                            data.adult
                                                                        }{" "}
                                                                        x{" "}
                                                                        {numberFormat(
                                                                            detailTour.get_price
                                                                        )}
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {numberFormat(
                                                                            data.adult *
                                                                                detailTour.get_price
                                                                        )}
                                                                    </span>
                                                                </li>
                                                                    <li>
                                                                        <span className="booking-title">
                                                                            {lang['Youth']}
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {
                                                                                data.youth
                                                                            }{" "}
                                                                            x{" "}
                                                                            {numberFormat(
                                                                                detailTour.get_price * 0.8
                                                                            )}
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {numberFormat(
                                                                                data.youth *
                                                                                    detailTour.get_price * 0.8
                                                                            )}
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="booking-title">
                                                                            {lang['Children']}
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {
                                                                                data.child
                                                                            }{" "}
                                                                            x{" "}
                                                                            {numberFormat(
                                                                                detailTour.get_price * 0.5
                                                                            )}
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {numberFormat(
                                                                                data.child *
                                                                                    detailTour.get_price * 0.5
                                                                            )}
                                                                        </span>
                                                                    </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {!isEmpty(
                                                        getBooking.extra
                                                    ) && (
                                                        <>
                                                            <div className="services-block">
                                                                <label className="booking_form">
                                                                    {lang['Extra services']}
                                                                </label>
                                                                <div className="list-services">
                                                                    {getBooking.extra.map(
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

                                                    <div className="detail-price">
                                                        <label className="booking_form">
                                                            {lang['Detail Price']}
                                                        </label>
                                                        <div className="detail-price__item">
                                                            <span className="detail-price__title">
                                                                {lang['Subtotal']}
                                                            </span>
                                                            <span className="detail-price__price">
                                                                {numberFormat(
                                                                    data.subtotal
                                                                )}
                                                            </span>
                                                        </div>
                                                        {!isEmpty(
                                                            detailTour.extra
                                                        ) && (
                                                            <div className="detail-price__item">
                                                                <span className="detail-price__title">
                                                                    {lang['Extra services']}
                                                                </span>
                                                                <span className="detail-price__price">
                                                                    900.000đ
                                                                </span>
                                                            </div>
                                                        )}
                                                        {showCoupon &&
                                                        <div id="coupon" className="detail-price__item">
                                                            <span className="detail-price__title">
                                                                Coupon
                                                            </span>
                                                            <span className="detail-price__price" style={{color: "red",position: "absolute",right: "20px"}}>
                                                                - {" "}
                                                                {data.coupon}
                                                            </span>
                                                            {/* <a
                                                                className="remove-coupon"
                                                                style={{cursor: "pointer"}}
                                                                onClick={() => {
                                                                    data.coupon = "";
                                                                    data.totalPrice = detailTour.totalPrice;
                                                                    document.querySelector("#coupon").classList.add("hide");
                                                                    document.querySelector("#total-old").classList.add("hide");
                                                                    // enable button
                                                                    document.querySelector(".coupon-block button").disabled = false;
                                                                    setData("totalPrice", data.totalPrice);
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-times"></i>
                                                            </a> */}
                                                        </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="total-group">
                                                    <label className="booking_form_input_label">
                                                        {lang['Total Price']}
                                                    </label>
                                                    <span
                                                        className="currency_amount"
                                                        data-amount="0"
                                                    >
                                                        {numberFormat(
                                                            data.total
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="submit-group mb-3">
                                                    {data.payment === "2" ? (
                                                        <div
                                                            style={{
                                                                maxWidth:
                                                                    "750px",
                                                                minHeight:
                                                                    "200px",
                                                            }}
                                                        >
                                                            <PayPalScriptProvider
                                                                options={{
                                                                    "client-id":
                                                                        "test",
                                                                    components:
                                                                        "buttons",
                                                                    currency: "USD"
                                                                        // _lang ==
                                                                        // "en"
                                                                        //     ? "USD"
                                                                        //     : "VND",
                                                                }}
                                                            >
                                                                <ButtonWrapper
                                                                    currency={
                                                                        currency
                                                                    }
                                                                    showSpinner={
                                                                        false
                                                                    }
                                                                />
                                                            </PayPalScriptProvider>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="submit"
                                                            name="redirect"
                                                        >
                                                            {lang['Book Now']}{" "}
                                                            <i className="fa-solid fa-arrow-right"></i>
                                                        </button>
                                                    )}
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
            <AlertDialog
                open={open}
                handleClose={handleToggle}
                title={lang['Edit Traveller']}
                width="800px"
                height="auto"
                agree="Edit"
            >
                <DialogContentText sx={{ padding: "20px" }}>
                    <form
                        className="booking-form"
                        encType="application/x-www-form-urlencoded"
                    >
                        {travellers.map((e, index) => (
                                        <div className="contact-form">
                                            <label className="booking_form">
                                                {lang['Traveller']} {index + 1} 
                                                <a
                                                    style={{
                                                        marginLeft: "10px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => removeTraveller(index)}
                                                >
                                                    <BasicTooltip title={lang['Remove']} placement="top" arrow>
                                                    <i className="fa-solid fa-trash"></i>
                                                    </BasicTooltip>
                                                </a>
                                            </label>
                                                <div className="mb-3">
                                                    <input
                                                        type="text"
                                                        name={`name_${index}`}
                                                        className="form-control"
                                                        placeholder={lang['Full name'] + "*"}
                                                        value={e.name}
                                                        aria-label="Full name"
                                                        onChange={(v) =>
                                                            onHandleChange(v)
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <InputError
                                                    message={
                                                        errors.name
                                                    }
                                                    className="mt-2"
                                                />
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    name={`CMND_${index}`}
                                                    className="form-control"
                                                    placeholder={lang['Citizen Identification/Passport']}
                                                    aria-label="citizen identification/passport"
                                                    value={e.CMND}
                                                    onChange={(e) =>
                                                        onHandleChange(e)
                                                    }
                                                    // required
                                                    // pattern="[0-9]{9,12}"
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3 edit-contact-detail">
                                                    <Select
                                                        name={`age_${index}`}
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                        value={e.age}
                                                        handleChange={(e) =>
                                                            onHandleChange(e)
                                                        }
                                                    >
                                                        <option value="1">
                                                            0-12
                                                        </option>
                                                        <option value="2">
                                                            13-17
                                                        </option>
                                                        <option value="3">
                                                            18+ 20 
                                                        </option>
                                                    </Select>
                                                </div>
                                                <div className="col mb-3">
                                                    <input
                                                        type="text"
                                                        name={`phone_${index}`}
                                                        className="form-control"
                                                        placeholder={lang['Phone'] + "*"}
                                                        value={e.phone}
                                                        aria-label="phone"
                                                        onChange={(e) =>
                                                            onHandleChange(e)
                                                        }
                                                        required
                                                        pattern="[0-9]{10}"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                        <div className="mb-3" 
                            style={{ cursor: "pointer" }}
                        >
                            <i className="fa-solid fa-plus"></i>
                            <a
                                onClick={addTraveller}
                            >
                                {lang['Add more']}
                            </a>
                        </div>
                    </form>
                    
                </DialogContentText>
                <DialogActions>
                                <Button onClick={handleToggle}>{lang['Cancel']}</Button>
                                <Button type="submit" autoFocus onClick={onHandleChangeTraveller}>
                                    {lang['Save']}
                                </Button>
                            </DialogActions>
            </AlertDialog>    
        </>
    );
}
