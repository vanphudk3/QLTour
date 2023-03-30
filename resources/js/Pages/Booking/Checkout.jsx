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
import { isEmpty } from "lodash";
import { useState } from "react";
import InputError from "@/Components/InputError";
import validator from "validator/lib/isEmpty";

const steps = ["Select tour", "Fill in the information", "Payment"];

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

    console.log(managerTour);

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
        status: "1",
        url: "",
        redirect: "",
    });

    console.log(data);

    const [validationMsg, setValidationMsg] = useState({});
    const validateAll = () => {
        const msg = {};

        if(validator(data.payment)){
            msg.payment = "The payment field is required."
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
        if(data.payment == 0){
            post(route("checkout.process"), {
                _method: "POST",
                preserveScroll: true,
                });
        }else if(data.payment == 3){
            data.redirect = "http://localhost:8000/checkout/success";
            data.url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            post(route("checkout.process"),
            {
                _method: "POST",
                preserveScroll: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
            
        }


    };

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const handlePayment = () => {
        const byCash = document.getElementById("byCash");
        const byMomo = document.getElementById("byMomo");
        const byTransfer = document.getElementById("byTransfer");
        const byVNPay = document.getElementById("byvnpay");
        const getcash = document.getElementById("cash");
        const gettransfer = document.getElementById("transfer");
        const getmomo = document.getElementById("momo");
        const getvnpay = document.getElementById("vnpay");

        if (getcash.checked) {
            setData("payment", "0");
            byCash.style.display = "block";
            byMomo.style.display = "none";
            byTransfer.style.display = "none";
            byVNPay.style.display = "none";
        } else if (gettransfer.checked) {
            setData("payment", "1");
            byCash.style.display = "none";
            byMomo.style.display = "none";
            byTransfer.style.display = "block";
            byVNPay.style.display = "none";
        } else if (getmomo.checked) {
            setData("payment", "2");
            byCash.style.display = "none";
            byMomo.style.display = "block";
            byTransfer.style.display = "none";
            byVNPay.style.display = "none";
        } else if (getvnpay.checked) {
            setData("payment", "3");
            byCash.style.display = "none";
            byMomo.style.display = "none";
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
                    {/* <div className="detail-tour" style={{ marginTop: "20px" }}>
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
                    </div> */}
                    <Box sx={{ width: "80%", paddingBottom: "20px" }}>
                        <Stepper nonLinear activeStep={activeStep}>
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton
                                        color="inherit"
                                        onClick={handleStep(index)}
                                    >
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                        {/* <div>
                            {allStepsCompleted() ? (
                                <div>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re
                                        finished
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            pt: 2,
                                        }}
                                    >
                                        <Box sx={{ flex: "1 1 auto" }} />
                                        <Button onClick={handleReset}>
                                            Reset
                                        </Button>
                                    </Box>
                                </div>
                            ) : (
                                <div>
                                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                        Step {activeStep + 1}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            pt: 2,
                                        }}
                                    >
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: "1 1 auto" }} />
                                        <Button
                                            onClick={handleNext}
                                            sx={{ mr: 1 }}
                                        >
                                            Next
                                        </Button>
                                        {activeStep !== steps.length &&
                                            (completed[activeStep] ? (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        display: "inline-block",
                                                    }}
                                                >
                                                    Step {activeStep + 1}{" "}
                                                    already completed
                                                </Typography>
                                            ) : (
                                                <Button
                                                    onClick={handleComplete}
                                                >
                                                    {completedSteps() ===
                                                    totalSteps() - 1
                                                        ? "Finish"
                                                        : "Complete Step"}
                                                </Button>
                                            ))}
                                    </Box>
                                </div>
                            )}
                        </div> */}
                    </Box>
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
                                                            {
                                                                traveller.CMND
                                                            }
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
                                                            id="momo"
                                                            className="checked"
                                                            onChange={
                                                                handlePayment
                                                            }
                                                        />
                                                    </div>
                                                    <label for="cash">
                                                        Payment Momo
                                                    </label>
                                                </div>
                                                <i className="fa-solid fa-qrcode"></i>
                                            </div>
                                            <div
                                                className="content-method"
                                                id="byMomo"
                                            >
                                                Please pay by wallet Momo.
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

                                                    {/* <div className="services-block">
                                                    <label className="booking_form">
                                                        Extra services
                                                    </label>
                                                    <div className="list-services">
                                                        <i
                                                            className="qtip tip-left"
                                                            data-tip="Lorem ipsum dolor sit amet, utinam munere antiopam vel ad. Qui eros iusto te. Nec ad feugiat honestatis. Quo illum detraxit an. Ius eius quodsi molestiae at, nostrum definitiones his cu. Discere referrentur mea id, an pri novum possim deterruisset. Eum oratio reprehendunt cu. Nec te quem assum postea."
                                                        >
                                                            <label for="booking-extra">
                                                                Service per
                                                                booking
                                                            </label>
                                                            <span className="price-extra">
                                                                300.000đ
                                                            </span>
                                                        </i>

                                                        <i
                                                            className="qtip tip-left"
                                                            data-tip="Lorem ipsum dolor sit amet, utinam munere antiopam vel ad. Qui eros iusto te. Nec ad feugiat honestatis. Quo illum detraxit an. Ius eius quodsi molestiae at, nostrum definitiones his cu. Discere referrentur mea id, an pri novum possim deterruisset. Eum oratio reprehendunt cu. Nec te quem assum postea."
                                                        >
                                                            <label for="booking-extra">
                                                                Service per
                                                                booking
                                                            </label>
                                                            <span className="price-extra">
                                                                300.000đ
                                                            </span>
                                                        </i>

                                                        <i
                                                            className="qtip tip-left"
                                                            data-tip="Lorem ipsum dolor sit amet, utinam munere antiopam vel ad. Qui eros iusto te. Nec ad feugiat honestatis. Quo illum detraxit an. Ius eius quodsi molestiae at, nostrum definitiones his cu. Discere referrentur mea id, an pri novum possim deterruisset. Eum oratio reprehendunt cu. Nec te quem assum postea."
                                                        >
                                                            <label for="booking-extra">
                                                                Service per
                                                                booking
                                                            </label>
                                                            <span className="price-extra">
                                                                300.000đ
                                                            </span>
                                                        </i>
                                                    </div>
                                                </div> */}
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
                                                            getBooking.totalPrice
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="submit-group">
                                                    <button type="submit" name="redirect">
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
