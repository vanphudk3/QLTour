import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import RegisterLayout from "@/Layouts/RegisterLayout";
import { Autocomplete, TextField } from "@mui/material";
import { isEmpty } from "lodash";
import Validate from "validator/lib/isEmpty";


export default function Register() {

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

    // console.log(ward);

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

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        ward: "",
    });

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
    };

    const [validationMsg, setValidationMsg] = useState({});

    const validateAll = () => {
        const msg = {};
        if (Validate(data.name)) {
            msg.name = "Name is required";
        }
        if (Validate(data.phone)) {
            msg.phone = "Phone is required";
        }
        if (Validate(data.email)) {
            msg.email = "Email is required";
        }
        if(Validate(data.address)){
            msg.address = "Address is required";
        }
        if(Validate(data.city)){
            msg.city = "City is required";
        }
        if(Validate(data.district)){
            msg.district = "District is required";
        }
        if(Validate(data.ward)){
            msg.ward = "Ward is required";
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) {
            return false;
        }
        return true;
    };

    const submit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) {
            return;
        }
        post(route("register"));
    };

    return (
        <RegisterLayout className="py-5">
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    {/* <InputLabel forInput="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    /> */}

                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={data.name}
                        className="mt-1 block w-full w-100"
                        autoComplete="name"
                        isFocused={true}
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={validationMsg.name} className="mt-2" />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={data.phone}
                        className="mt-1 block w-full w-100"
                        autoComplete="phone"
                        isFocused={true}
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={validationMsg.phone} className="mt-2" />
                </div>

                <div className="mt-4">
                    {/* <InputLabel forInput="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    /> */}

                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        value={data.email}
                        className="mt-1 block w-full w-100"
                        autoComplete="username"
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={validationMsg.email} className="mt-2" />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    {/* <InputLabel forInput="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    /> */}

                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        label="Password"
                        value={data.password}
                        className="mt-1 block w-full w-100"
                        autoComplete="new-password"
                        onChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 mb-3">
                    {/* <InputLabel
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                        required
                    /> */}

                    <TextField
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        label="Confirm Password"
                        value={data.password_confirmation}
                        className="mt-1 block w-full w-100"
                        onChange={onHandleChange}
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 mb-3">
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                value={data.address}
                                className="mt-1 block w-full w-100"
                                autoComplete="address"
                                isFocused={true}
                                onChange={onHandleChange}
                                required
                            />

                            <InputError
                                message={validationMsg.address}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <Autocomplete
                                disablePortal
                                id="city"
                                name="city"
                                options={arrCities}
                                onChange={(event, newValue) => {
                                    setcityId({
                                        ...cityId,
                                        id: newValue.idCity,
                                    });
                                    setData("city", newValue.label);
                                }}
                                // sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="City" />
                                )}
                            />
                            <InputError
                                message={validationMsg.city}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <Autocomplete
                                disablePortal
                                id="district"
                                name="district"
                                options={arrDistricts}
                                // value={data.district}
                                onChange={(event, newValue) => {
                                    setdistrictId({
                                        ...districtId,
                                        id: newValue.idDistrict,
                                    });
                                    setData("district", newValue.label);
                                }}
                                // sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="District" />
                                )}
                            />
                            <InputError
                                message={validationMsg.district}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <Autocomplete
                                disablePortal
                                id="ward"
                                name="ward"
                                options={arrWards}
                                onChange={(event, newValue) => {
                                    setData("ward", newValue.label);
                                }}
                                // sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Ward" />
                                )}
                            />
                            <InputError
                                message={validationMsg.ward}
                                className="mt-2"
                            />
                        </div>

                <div className="flex items-center mt-4 mb-3">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>
                </div>
                <PrimaryButton className="ml-4" processing={processing}>
                    Register
                </PrimaryButton>
            </form>
        </RegisterLayout>
    );
}
