import Content from "@/Layouts/Tour";
import { Head, Link, router } from "@inertiajs/react";
import { usePage, useForm } from "@inertiajs/react";
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
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { isEmpty } from "lodash";
import React, { useRef, useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import Validate from "validator/lib/isEmpty";
import ValidateEmail from "validator/lib/isEmail";

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
    const error = usePage().props.error;
    const login = usePage().props.login;
    const customer = usePage().props.customer;
    const [city, setcity] = useState([]);
    const [cityId, setcityId] = useState("");
    const [district, setdistrict] = useState([]);
    const [districtId, setdistrictId] = useState("");
    const [ward, setward] = useState([]);

    useEffect(() => {
        const getCity = async () => {
            const rescity = await fetch(
                `https://provinces.open-api.vn/api/?depth=2`
            );
            const datacity = await rescity.json();
            setcity(await datacity);
        };
        getCity();
    }, []);

    useEffect(() => {
        const getDistrict = async () => {
            const resdistrict = await fetch(
                `https://provinces.open-api.vn/api/p/${cityId.id}?depth=2`
            );
            const datadistrict = await resdistrict.json();
            setdistrict(await datadistrict.districts);
        };
        getDistrict();
    }, [cityId]);

    useEffect(() => {
        const getWard = async () => {
            const resward = await fetch(
                `https://provinces.open-api.vn/api/d/${districtId.id}?depth=2`
            );
            const dataward = await resward.json();
            setward(await dataward.wards);
        };
        getWard();
    }, [districtId]);

    const arrCities = [];

    city.map((city) => {
        arrCities.push({
            label: city.name,
            idCity: city.code,
        });
    });

    const arrDistricts = [];
    if (!isEmpty(district)) {
        district.map((district) => {
            arrDistricts.push({
                label: district.name,
                idDistrict: district.code,
            });
        });
    }

    const arrWards = [];
    if (!isEmpty(ward)) {
        ward.map((ward) => {
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

    const ArrExtra = [];
    if (!isEmpty(detailTour.extra)) {
        detailTour.extra.map((extra) => {
            ArrExtra.push({
                id: extra.id,
            });
        });
    }

    const { data, setData, post, progress, processing, errors, reset } =
        useForm({
            city: "",
            district: "",
            ward: "",
            id: detailTour.id,
            nameTour: detailTour.ten_tour,
            code: detailTour.ky_hieu,
            transpost: detailTour.transpost,
            adults: detailTour.adults,
            youth: detailTour.youth,
            child: detailTour.child,
            priceAdults: detailTour.priceAdults,
            priceYouth: detailTour.priceYouth,
            priceChild: detailTour.priceChild,
            amoutDay: detailTour.so_ngay,
            amoutNight: detailTour.so_dem,
            age: detailTour.do_tuoi_tu,
            amoutPeople: detailTour.so_cho,
            departDate: detailTour.ngay_khoi_hanh,
            address_tour: detailTour.dia_chi,
            image: detailTour.hinh_anh,
            category: detailTour.loai_tour,
            departLocation: detailTour.noi_khoi_hanh,
            gatheringLocation: detailTour.noi_tap_chung,
            time: detailTour.gio_khoi_hanh,
            totalPrice: detailTour.totalPrice,
            countTraveller: detailTour.counttraveller,
            subtotal: detailTour.subtotal,
            extra: ArrExtra,
            name: "",
            email: "",
            phone: "",
            address: "",
            note: "",
        });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
        if (event.target.name === "phone") {
            const rex = /^[0-9\b]+$/;
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
            if (event.target.value === "" || rex.test(event.target.value)) {
                setData(event.target.name, event.target.value);
            }
        }
        arrCount.map((count, index) => {
            if (event.target.name === `citizen_identification_${index}`) {
                const rex = /^[0-9\b]+$/;
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
                if (event.target.value === "" || rex.test(event.target.value)) {
                    setData(event.target.name, event.target.value);
                }
            }
            if (event.target.name === `phone_${index}`) {
                const rex = /^[0-9\b]+$/;
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
                if (event.target.value === "" || rex.test(event.target.value)) {
                    setData(event.target.name, event.target.value);
                }
            }
        });
    };

    const [inforcustomerName, setinforcustomerName] = useState({});
    const [inforcustomerEmail, setinforcustomerEmail] = useState({});
    const [inforcustomerPhone, setinforcustomerPhone] = useState({});
    const [inforcustomerAddress, setinforcustomerAddress] = useState({});

    const [checked, setChecked] = useState(false);

    const onHandleCheckCustomer = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            setinforcustomerName({
                name: customer.ten_khach_hang,
            });
            setinforcustomerEmail({
                email: customer.email,
            });
            setinforcustomerPhone({
                phone: customer.so_dien_thoai,
            });
            setinforcustomerAddress({
                address: customer.dia_chi,
            });
            data.name = customer.ten_khach_hang;
            data.email = customer.email;
            data.phone = customer.so_dien_thoai;
            data.address = customer.dia_chi;
        }else{
            setinforcustomerName({
                name: "",
            });
            setinforcustomerEmail({
                email: "",
            });
            setinforcustomerPhone({
                phone: "",
            });
            setinforcustomerAddress({
                address: "",
            });
            data.name = "";
            data.email = "";
            data.phone = "";
            data.address = "";
        }
    };


    const [validationMsg, setValidationMsg] = useState({});

    const validateAll = () => {
        const msg = {};

        if (Validate(data.name)) {
            msg.name = "Name is required";
        }
        if (Validate(data.email)) {
            msg.email = "Email is required";
        }
        if (Validate(data.phone)) {
            msg.phone = "Phone is required";
        }
        if (Validate(data.address)) {
            msg.address = "Address is required";
        }
        if (data.phone.length < 10 || data.phone.length > 11) {
            msg.phone = "Phone is invalid";
        }
        if (!ValidateEmail(data.email)) {
            msg.email = "Email is invalid";
        }
        if (!checked){
            if (Validate(data.city)) {
                msg.city = "City is required";
            }
            if (Validate(data.district)) {
                msg.district = "District is required";
            }
            if (Validate(data.ward)) {
                msg.ward = "Ward is required";
            }
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
        router.visit("/checkout", { data });
    };

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
                <div
                    className="container-layout"
                    style={{ paddingTop: "20px" }}
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
                </div>
                <form onSubmit={onHandleSubmit} id="booking-form">
                    <div className="container-layout">
                        <div className="layout-02 booking-layout">
                            <div className="row">
                                <div className="col-md-8">
                                    <h3 className="heading-title">
                                        Traveller Details
                                    </h3>
                                    {/* errors */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <InputError message={error} />
                                        </div>
                                    </div>

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
                                                        onChange={(e) =>
                                                            onHandleChange(e)
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <InputError
                                                    message={
                                                        errors.first_name_1
                                                    }
                                                    className="mt-2"
                                                />
                                                <div className="w-48 mb-3">
                                                    <input
                                                        type="text"
                                                        name={`last_name_${index}`}
                                                        className="form-control"
                                                        placeholder="Last name"
                                                        aria-label="Last name"
                                                        onChange={(e) =>
                                                            onHandleChange(e)
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    name={`citizen_identification_${index}`}
                                                    className="form-control"
                                                    placeholder="Citizen Identification/Passport*"
                                                    aria-label="citizen identification/passport"
                                                    onChange={(e) =>
                                                        onHandleChange(e)
                                                    }
                                                    required
                                                    // pattern="[0-9]{9,12}"
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <select
                                                        name={`age_${index}`}
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                        onChange={(e) =>
                                                            onHandleChange(e)
                                                        }
                                                    >
                                                        <option>Age*</option>
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
                                                        aria-label="phone"
                                                        onChange={(e) =>
                                                            onHandleChange(e)
                                                        }
                                                        required
                                                        // pattern="[0-9]{10}"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <h3 className="heading-title">
                                        Contact Details
                                    </h3>
                                    {(login.customer != null || login.remember != null)  && (
                                        <div className="d-flex justify-content-start mb-4">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        sx={{
                                                            "&.Mui-checked": {
                                                                color: "var(--primary)",
                                                            },
                                                        }}
                                                        className="useAccountInfo"
                                                        name="useAccountInfo"
                                                        id="useAccountInfo"
                                                        onChange={
                                                            onHandleCheckCustomer
                                                        }
                                                    />
                                                }
                                                label="Use account information for contact details"
                                            />
                                        </div>
                                    )}
                                    <div className="contact-form">
                                        <div className="contact-infor">
                                            <div className="contact-infor__block">
                                                <label for="name">Name*</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={data.name}
                                                    placeholder="Your Name"
                                                    onChange={(e) =>
                                                        onHandleChange(e)
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={validationMsg.name}
                                                className="mt-2"
                                            />
                                            <div className="contact-infor__block">
                                                <label for="email">
                                                    Email*
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={data.email}
                                                    placeholder="Your Email"
                                                    onChange={(e) =>
                                                        onHandleChange(e)
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={validationMsg.email}
                                                className="mt-2"
                                            />
                                            <div className="contact-infor__block">
                                                <label for="phone">
                                                    Phone*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    name="phone"
                                                    value={data.phone}
                                                    placeholder="Your Phone"
                                                    onChange={(e) =>
                                                        onHandleChange(e)
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={validationMsg.phone}
                                                className="mt-2"
                                            />
                                            <div className="contact-infor__block">
                                                <label for="address">
                                                    Address*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    value={data.address}
                                                    placeholder="Your Address"
                                                    onChange={(e) =>
                                                        onHandleChange(e)
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={validationMsg.address}
                                                className="mt-2"
                                            />
                                            {!checked  && (
                                            <>
                                            <div className="contact-infor__block">
                                                <label for="country">
                                                    City*
                                                </label>

                                                <Autocomplete
                                                    disablePortal
                                                    id="city"
                                                    name="city"
                                                    options={arrCities}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setcityId({
                                                            ...cityId,
                                                            id: newValue.idCity,
                                                        });
                                                        setData(
                                                            "city",
                                                            newValue.label
                                                        );
                                                    }}
                                                    // sx={{ width: 300 }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="City"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <InputError
                                                message={validationMsg.city}
                                                className="mt-2"
                                            />
                                            <div className="contact-infor__block">
                                                <label for="city">
                                                    District*
                                                </label>
                                                <Autocomplete
                                                    disablePortal
                                                    id="district"
                                                    name="district"
                                                    options={arrDistricts}
                                                    // value={data.district}
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setdistrictId({
                                                            ...districtId,
                                                            id: newValue.idDistrict,
                                                        });
                                                        setData(
                                                            "district",
                                                            newValue.label
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
                                            <InputError
                                                message={validationMsg.district}
                                                className="mt-2"
                                            />
                                            <div className="contact-infor__block">
                                                <label for="city">Ward*</label>

                                                <Autocomplete
                                                    disablePortal
                                                    id="ward"
                                                    name="ward"
                                                    options={arrWards}
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
                                            <InputError
                                                message={validationMsg.ward}
                                                className="mt-2"
                                            />
                                            </>
                                            )}
                                            <div className="contact-infor__block">
                                                <label for="messenger">
                                                    Messenger
                                                </label>
                                                <textarea
                                                    name="note"
                                                    id=""
                                                    cols="30"
                                                    rows="10"
                                                    placeholder="writing something ..."
                                                    onChange={(e) =>
                                                        onHandleChange(e)
                                                    }
                                                ></textarea>
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
                                                        NEXT STEP{" "}
                                                        <i className="fa-solid fa-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Content>
        </>
    );
}
