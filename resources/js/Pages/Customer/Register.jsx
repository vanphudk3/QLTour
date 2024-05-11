import { Head, Link, usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import Content from "@/Layouts/Tour";
import {
    Autocomplete,
    Breadcrumbs,
    Button,
    TextField,
    Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import Validate from "validator/lib/isEmpty";
import ValidatePassword from "validator/lib/isLength";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Alert from '@mui/material/Alert';

const Day = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
    { label: "13", value: 13 },
    { label: "14", value: 14 },
    { label: "15", value: 15 },
    { label: "16", value: 16 },
    { label: "17", value: 17 },
    { label: "18", value: 18 },
    { label: "19", value: 19 },
    { label: "20", value: 20 },
    { label: "21", value: 21 },
    { label: "22", value: 22 },
    { label: "23", value: 23 },
    { label: "24", value: 24 },
    { label: "25", value: 25 },
    { label: "26", value: 26 },
    { label: "27", value: 27 },
    { label: "28", value: 28 },
    { label: "29", value: 29 },
    { label: "30", value: 30 },
    { label: "31", value: 31 },
];

const Month = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "10", value: 10 },
    { label: "11", value: 11 },
    { label: "12", value: 12 },
];

const Year = [
    { label: "2021", value: 2021 },
    { label: "2020", value: 2020 },
    { label: "2019", value: 2019 },
    { label: "2018", value: 2018 },
    { label: "2017", value: 2017 },
    { label: "2016", value: 2016 },
    { label: "2015", value: 2015 },
    { label: "2014", value: 2014 },
    { label: "2013", value: 2013 },
    { label: "2012", value: 2012 },
    { label: "2011", value: 2011 },
    { label: "2010", value: 2010 },
    { label: "2009", value: 2009 },
    { label: "2008", value: 2008 },
    { label: "2007", value: 2007 },
    { label: "2006", value: 2006 },
    { label: "2005", value: 2005 },
    { label: "2004", value: 2004 },
    { label: "2003", value: 2003 },
    { label: "2002", value: 2002 },
    { label: "2001", value: 2001 },
    { label: "2000", value: 2000 },
    { label: "1999", value: 1999 },
    { label: "1998", value: 1998 },
    { label: "1997", value: 1997 },
    { label: "1996", value: 1996 },
    { label: "1995", value: 1995 },
    { label: "1994", value: 1994 },
    { label: "1993", value: 1993 },
    { label: "1992", value: 1992 },
    { label: "1991", value: 1991 },
    { label: "1990", value: 1990 },
    { label: "1989", value: 1989 },
    { label: "1988", value: 1988 },
    { label: "1987", value: 1987 },
    { label: "1986", value: 1986 },
];

export default function RegisterMember(props) {
    const register = usePage().props.register;
    const lang = usePage().props.lang;
    const _lang = usePage().props._lang;
    const [city, setcity] = useState([]);
    const [cityId, setcityId] = useState("");
    const [district, setdistrict] = useState([]);
    const [districtId, setdistrictId] = useState("");
    const [ward, setward] = useState([]);

    useEffect(() => {
        const getCity = async () => {
            const rescity = await fetch(
                `https://vapi.vnappmob.com/api/province`
            );
            const datacity = await rescity.json();
            // console.log(datacity);
            setcity(await datacity.results);
        };
        getCity();
    }, []);

    useEffect(() => {
        const getDistrict = async () => {
            const resdistrict = await fetch(
                `https://vapi.vnappmob.com/api/province/district/${cityId.id}`
            );
            const datadistrict = await resdistrict.json();
            setdistrict(await datadistrict.results);
        };
        getDistrict();
    }, [cityId]);

    useEffect(() => {
        const getWard = async () => {
            const resward = await fetch(
                `https://vapi.vnappmob.com/api/province/ward/${districtId.id}`
            );
            const dataward = await resward.json();
            setward(await dataward.results);
        };
        getWard();
    }, [districtId]);

    const arrCities = [];

    city.map((city) => {
        arrCities.push({
            label: city.province_name,
            idCity: city.province_id,
        });
    });

    const arrDistricts = [];
    if (!isEmpty(district)) {
        district.map((district) => {
            arrDistricts.push({
                label: district.district_name,
                idDistrict: district.district_id,
            });
        });
    }

    const arrWards = [];
    if (!isEmpty(ward)) {
        ward.map((ward) => {
            arrWards.push({
                label: ward.ward_name,
                idWard: ward.ward_id,
            });
        });
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        ward: "",
        day: "",
        month: "",
        year: "",
        citizen_identification: "",
    });

    // console.log(data);
    console.log(errors);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

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
        if (event.target.name === "citizen_identification") {
            const rex = /^[0-9\b]+$/;
            event.target.value = event.target.value.replace(/[^0-9]/g, "");
            if (event.target.value === "" || rex.test(event.target.value)) {
                setData(event.target.name, event.target.value);
            }
        }
    };

    const [validationMsg, setValidationMsg] = useState({});

    const validateAll = () => {
        const msg = {};
        if (Validate(data.first_name)) {
            msg.first_name = "First name is required";
        }
        if (Validate(data.last_name)) {
            msg.last_name = "Last name is required";
        }
        if (Validate(data.phone)) {
            msg.phone = "Phone is required";
        }
        if (Validate(data.email)) {
            msg.email = "Email is required";
        }
        if (Validate(data.password)) {
            msg.password = "Password is required";
        }
        if (Validate(data.password_confirmation)) {
            msg.password_confirmation = "Password confirmation is required";
        }
        // confirm password
        if (data.password !== data.password_confirmation) {
            msg.password_confirmation = "Password confirmation is not match";
        }
        if (Validate(data.address)) {
            msg.address = "Address is required";
        }
        if (Validate(data.city)) {
            msg.city = "City is required";
        }
        if (Validate(data.district)) {
            msg.district = "District is required";
        }
        if (Validate(data.ward)) {
            msg.ward = "Ward is required";
        }
        if (Validate(data.day) || Validate(data.month) || Validate(data.year)) {
            msg.day = "Day of birth is required";
        }
        if (Validate(data.citizen_identification)) {
            msg.citizen_identification = "Citizen identification is required";
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) {
            return false;
        }
        return true;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) {
            return;
        }
        post(route("customer.process_register"));
    };

    return (
        <>
            <Head title="Register member" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> Register</h1>
                        </div>
                    </div>
                </div>
                <section className="h-100 bg-light">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col">
                                <div className="card card-registration my-4">
                                    <div className="row g-0">
                                        <div className="col-xl-6 d-none d-xl-block">
                                            <img
                                                src="http://127.0.0.1:8000/images/home/h1_img.jpg"
                                                alt="Sample photo"
                                                className="img-fluid"
                                                style={{
                                                    borderTopLeftRadius:
                                                        ".25rem",
                                                    borderBottomLeftRadius:
                                                        ".25rem",
                                                }}
                                            />
                                        </div>
                                        <div className="col-xl-6">
                                            <form onSubmit={onSubmit}>
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="heading-title">
                                                        Register
                                                    </h3>
                                                    {!isEmpty(errors) && (
                                                        <Alert variant="outlined" severity="error">
                                                            {errors.error_register}
                                                      </Alert>
                                                    )}
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    name="first_name"
                                                                    className="form-control"
                                                                    id="floatingInput"
                                                                    placeholder="Van"
                                                                    onChange={
                                                                        onHandleChange
                                                                    }
                                                                />
                                                                <label for="floatingInput">
                                                                    First Name
                                                                </label>
                                                                <InputError
                                                                    message={
                                                                        validationMsg.first_name ||
                                                                        errors.first_name
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    name="last_name"
                                                                    className="form-control"
                                                                    id="floatingInput"
                                                                    placeholder="Phu"
                                                                    onChange={
                                                                        onHandleChange
                                                                    }
                                                                />
                                                                <label for="floatingInput">
                                                                    Last Name
                                                                </label>
                                                                <InputError
                                                                    message={
                                                                        validationMsg.last_name ||
                                                                        errors.last_name
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="mb-3">
                                                            <div className="form-floating">
                                                                <input
                                                                    type="text"
                                                                    name="phone"
                                                                    className="form-control"
                                                                    id="floatingInput"
                                                                    placeholder="0265464"
                                                                    onChange={
                                                                        onHandleChange
                                                                    }
                                                                />
                                                                <label for="floatingInput">
                                                                    Phone
                                                                </label>
                                                                <InputError
                                                                    message={
                                                                        validationMsg.phone ||
                                                                        errors.phone
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                                        <div className="flex flex-column">
                                                            <h6 className="mb-0 me-4">
                                                                Birth Date:{" "}
                                                            </h6>
                                                            <InputError
                                                                message={
                                                                    validationMsg.day ||
                                                                    errors.day
                                                                }
                                                                // style={{
                                                                //     fontSize: 10,
                                                                // }}
                                                                // className="mt-2"
                                                            />
                                                        </div>
                                                        <div className="form-check-inline mb-0 me-4">
                                                            <select
                                                                className="form-select"
                                                                id="floatingSelectGrid"
                                                                name="day"
                                                                onChange={
                                                                    onHandleChange
                                                                }
                                                            >
                                                                <option
                                                                    selected
                                                                >
                                                                    --Day--
                                                                </option>
                                                                {Day.map(
                                                                    (day) => (
                                                                        <option
                                                                            value={
                                                                                day.value
                                                                            }
                                                                        >
                                                                            {
                                                                                day.label
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>

                                                        <div className="form-check-inline mb-0 me-4">
                                                            <select
                                                                className="form-select"
                                                                id="floatingSelectGrid"
                                                                name="month"
                                                                onChange={
                                                                    onHandleChange
                                                                }
                                                            >
                                                                <option
                                                                    selected
                                                                >
                                                                    --Month--
                                                                </option>
                                                                {Month.map(
                                                                    (month) => (
                                                                        <option
                                                                            value={
                                                                                month.value
                                                                            }
                                                                        >
                                                                            {
                                                                                month.label
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>

                                                        <div className="form-check-inline mb-0">
                                                            <select
                                                                className="form-select"
                                                                id="floatingSelectGrid"
                                                                name="year"
                                                                onChange={
                                                                    onHandleChange
                                                                }
                                                            >
                                                                <option
                                                                    selected
                                                                >
                                                                    --Year--
                                                                </option>
                                                                {Year.map(
                                                                    (year) => (
                                                                        <option
                                                                            value={
                                                                                year.value
                                                                            }
                                                                        >
                                                                            {
                                                                                year.label
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            name="address"
                                                            placeholder="0265464"
                                                            onChange={
                                                                onHandleChange
                                                            }
                                                        />
                                                        <label for="floatingInput">
                                                            Address
                                                        </label>
                                                        <InputError
                                                            message={
                                                                validationMsg.address
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <div className="form-floating">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="city"
                                                                    name="city"
                                                                    options={
                                                                        arrCities
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                        newValue
                                                                    ) => {
                                                                        setcityId(
                                                                            {
                                                                                ...cityId,
                                                                                id: newValue.idCity,
                                                                            }
                                                                        );
                                                                        setData(
                                                                            "city",
                                                                            newValue.label
                                                                        );
                                                                    }}
                                                                    // sx={{ width: 300 }}
                                                                    renderInput={(
                                                                        params
                                                                    ) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="City"
                                                                        />
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        validationMsg.city
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <div className="form-floating">
                                                                <Autocomplete
                                                                    disablePortal
                                                                    id="district"
                                                                    name="district"
                                                                    options={
                                                                        arrDistricts
                                                                    }
                                                                    // value={data.district}
                                                                    onChange={(
                                                                        event,
                                                                        newValue
                                                                    ) => {
                                                                        setdistrictId(
                                                                            {
                                                                                ...districtId,
                                                                                id: newValue.idDistrict,
                                                                            }
                                                                        );
                                                                        setData(
                                                                            "district",
                                                                            newValue.label
                                                                        );
                                                                    }}
                                                                    // sx={{ width: 300 }}
                                                                    renderInput={(
                                                                        params
                                                                    ) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="District"
                                                                        />
                                                                    )}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        validationMsg.district
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-floating mb-3">
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
                                                            renderInput={(
                                                                params
                                                            ) => (
                                                                <TextField
                                                                    {...params}
                                                                    label="Ward"
                                                                />
                                                            )}
                                                        />
                                                        <InputError
                                                            message={
                                                                validationMsg.ward
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            name="citizen_identification"
                                                            placeholder="104891348569"
                                                            onChange={
                                                                onHandleChange
                                                            }
                                                        />
                                                        <label for="floatingInput">
                                                            Citizen
                                                            identification
                                                        </label>
                                                        <InputError
                                                            message={
                                                                validationMsg.citizen_identification ||
                                                                errors.citizen_identification
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            onChange={
                                                                onHandleChange
                                                            }
                                                        />
                                                        <label for="floatingInput">
                                                            Email address
                                                        </label>
                                                        <InputError
                                                            message={
                                                                validationMsg.email
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="floatingInput"
                                                            name="password"
                                                            value={data.password}
                                                            placeholder="0265464"
                                                            onChange={
                                                                onHandleChange
                                                            }
                                                        />
                                                        <label for="floatingInput">
                                                            Password
                                                        </label>
                                                        <InputError
                                                            message={
                                                                validationMsg.password
                                                            }
                                                            className="mt-2"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.password
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="password_confirmation"
                                                            name="password_confirmation"
                                                            value={data.password_confirmation}
                                                            onChange={
                                                                onHandleChange
                                                            }
                                                        />
                                                        <label for="floatingInput">
                                                            Confirm Password
                                                        </label>
                                                        <InputError
                                                            message={
                                                                validationMsg.password_confirmation
                                                            }
                                                            className="mt-2"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.password_confirmation
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div className="d-flex justify-content-end pt-3">
                                                        {/* <button type="button" className="btn btn-warning btn-lg ms-2">Submit form</button> */}
                                                        {/* <Button
                                                            variant="contained"
                                                            disableElevation
                                                            sx={{
                                                                width: "100%",
                                                                height: "3rem",
                                                                backgroundColor:
                                                                    "var(--primary)",
                                                                color: "white",
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        "var(--primary_hover)",
                                                                },
                                                            }}
                                                            processing={
                                                                processing
                                                            }
                                                        >
                                                            Submit form
                                                        </Button> */}
                                                        <PrimaryButton
                                                            className="ml-4"
                                                            processing={
                                                                processing
                                                            }
                                                        >
                                                            REGISTER
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Content>
        </>
    );
}
