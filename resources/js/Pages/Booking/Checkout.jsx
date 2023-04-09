import Content from "@/Layouts/Tour";
import { Head, Link, router } from "@inertiajs/react";
import { useForm, usePage } from "@inertiajs/react";
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

export default function Checkout(props) {
    const getBooking = usePage().props.getBooking;
    const detailTour = usePage().props.detailTour;
    const managerTour = usePage().props.managerTour;
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
        travellers: getBooking.travellers,
        time: detailTour.gio_khoi_hanh,
    });
    const total = data.total / 23447;
    const gettotal = round(total, 2);
    const amount = `${gettotal}`;
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
                    createOrder={(data, actions) => {
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

    const onHandleSubmit = (event) => {
        event.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        if (data.payment == 0) {
            post(route("checkout.process"), {
                _method: "POST",
                preserveScroll: true,
            });
        }
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
                    <div className="layout-02 booking-layout">
                        <div className="row">
                            <div className="col-md-8">
                                <h4 className="heading-title">
                                    Contact Details
                                </h4>
                                <div className="contact-detail">
                                    <div className="contact-item wrd">
                                        <table>
                                            <tr>
                                                <td>Name:</td>
                                                <td>{getBooking.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email:</td>
                                                <td>{getBooking.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone:</td>
                                                <td>{getBooking.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Address:</td>
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
                                    Traveller Details
                                </h4>
                                <div className="contact-traveller">
                                    {getBooking.travellers.map(
                                        (traveller, index) => (
                                            <div className="contact-item">
                                                <label className="booking_form">
                                                    Traveller {index + 1}
                                                </label>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            First and Last Name:
                                                        </td>
                                                        <td>
                                                            {traveller.name}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Citizen
                                                            Identification:
                                                        </td>
                                                        <td>
                                                            {traveller.CMND}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Age:</td>
                                                        <td>{traveller.age}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Phone:</td>
                                                        <td>
                                                            {traveller.phone}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        )
                                    )}
                                </div>
                                <h4 className="heading-title">Payment</h4>
                                <label for="Payment">Payment Methods</label>
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
                                                        Cash
                                                    </label>
                                                </div>
                                                <i className="fa-solid fa-money-bill"></i>
                                            </div>
                                            <div
                                                className="content-method"
                                                id="byCash"
                                            >
                                                Please pay at any Zourney office
                                                nationwide and overseas
                                                branches. See details.
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
                                                        Transfer
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
                                                    After making the transfer,
                                                    please send an email to
                                                    emb1910059@student.ctu.edu.com
                                                    or call the hotline
                                                    123456789 for confirmation
                                                    from our company.
                                                </p>
                                                <span>Name account: </span>
                                                <span className="infor-payment">
                                                    ZOURNEY
                                                </span>
                                                <br />
                                                <span>Number Account: </span>
                                                <span className="infor-payment">
                                                    02345 10546 6065
                                                </span>
                                                <br />
                                                <span>Bank: </span>
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
                                                        Payment Paypal
                                                    </label>
                                                </div>
                                                <i className="fa-solid fa-qrcode"></i>
                                            </div>
                                            <div
                                                className="content-method"
                                                id="bypaypal"
                                            >
                                                Please pay by port payment
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
                                                        Payment VNPAY
                                                    </label>
                                                </div>
                                                <i className="payment-icon payment-icon--1"></i>
                                            </div>
                                            <div
                                                className="content-method"
                                                id="byvnpay"
                                            >
                                                Please pay by port payment
                                                electronic VNPAY.
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
                                                Broome To The Bungle Bungles
                                            </h6>
                                            <form
                                                onSubmit={onHandleSubmit}
                                                method="post"
                                                className="booking-form"
                                                encType="application/x-www-form-urlencoded"
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
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {
                                                                            getBooking.adult
                                                                        }{" "}
                                                                        x{" "}
                                                                        {numberFormat(
                                                                            detailTour.gia_nguoi_lon
                                                                        )}
                                                                    </span>
                                                                    <span className="booking-price">
                                                                        {numberFormat(
                                                                            getBooking.adult *
                                                                                detailTour.gia_nguoi_lon
                                                                        )}
                                                                    </span>
                                                                </li>
                                                                {!isEmpty(
                                                                    getBooking.youth
                                                                ) && (
                                                                    <li>
                                                                        <span className="booking-title">
                                                                            Youth
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {
                                                                                getBooking.youth
                                                                            }{" "}
                                                                            x{" "}
                                                                            {numberFormat(
                                                                                detailTour.gia_thieu_nien
                                                                            )}
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {numberFormat(
                                                                                getBooking.youth *
                                                                                    detailTour.gia_thieu_nien
                                                                            )}
                                                                        </span>
                                                                    </li>
                                                                )}
                                                                {!isEmpty(
                                                                    getBooking.child
                                                                ) && (
                                                                    <li>
                                                                        <span className="booking-title">
                                                                            Children
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {
                                                                                getBooking.child
                                                                            }{" "}
                                                                            x{" "}
                                                                            {numberFormat(
                                                                                detailTour.gia_tre_em
                                                                            )}
                                                                        </span>
                                                                        <span className="booking-price">
                                                                            {numberFormat(
                                                                                getBooking.child *
                                                                                    detailTour.gia_tre_em
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
                                                            Detail Price
                                                        </label>
                                                        <div className="detail-price__item">
                                                            <span className="detail-price__title">
                                                                Subtotal
                                                            </span>
                                                            <span className="detail-price__price">
                                                                {numberFormat(
                                                                    getBooking.subtotal
                                                                )}
                                                            </span>
                                                        </div>
                                                        {!isEmpty(
                                                            detailTour.extra
                                                        ) && (
                                                            <div className="detail-price__item">
                                                                <span className="detail-price__title">
                                                                    Extra
                                                                    services
                                                                </span>
                                                                <span className="detail-price__price">
                                                                    900.000đ
                                                                </span>
                                                            </div>
                                                        )}
                                                        {/* <div className="detail-price__item">
                                                            <span className="detail-price__title">
                                                                Coupon
                                                            </span>
                                                            <span className="detail-price__price">
                                                                -300.000đ
                                                            </span>
                                                        </div> */}
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
                                                            getBooking.totalPrice
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
                                                                    currency:
                                                                        "USD",
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
                                                            Book Now{" "}
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
        </>
    );
}
