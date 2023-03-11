import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import Selects from "@/Components/Bootstrap/Select";
import Textarea from "@/Components/Bootstrap/Textarea";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";


export default function Create(props) {
    const locations = usePage().props.locations;
    const cities = usePage().props.cities;
    // cities.map((city) => {
    //     labels.push(city);
    // });
    // console.log(...labels);
    const { data, setData, post, progress, processing, errors, reset } =
        useForm({
            code: "",
            name: "",
            transpost: "",
            agerfrom: "",
            priceAdult: "",
            priceYoung: "",
            priceChild: "",
            description: "",
            dateStart: "",
            amountPeople: "",
            amountDay: "",
            amountNight: "",
            required: "",
            notice: "",
            status: "active",
            location: "",
            location_depart: "",
            location_general: "",
            time_depart: "",
        });

    // console.log(data);

    const handlechange = (e) => {
        const ArrayImage = [];
        for (let i = 0; i < e.target.files.length; i++) {
            ArrayImage.push(e.target.files[i]);
            console.log(ArrayImage);
        }
        setData(e.target.name, ArrayImage);
    };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("managerTour.store"));
    };

    const top100Films = useState([]);

    cities.map((city) => {
        top100Films.push({ 
            label: city.name,
         });
    });

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Create tour</h2>}
        >
            <Head title="Create Tour" />

            <div className="w-100 shadow flex justify-center">
                <div className="ml-50 mr-50 pd-25 w-80">
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <div className="flex justify-between">
                            <div className="w-48 mb-3">
                                <InputLabel
                                    forInput="code"
                                    value="Code tour*"
                                />

                                <TextInput
                                    id="code"
                                    name="code"
                                    value={data.code}
                                    className="mt-1 block w-full"
                                    autoComplete="code"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.code}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-48 mb-3">
                                <InputLabel
                                    forInput="name"
                                    value="Name tour*"
                                />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-48 mb-3">
                                <InputLabel
                                    forInput="location"
                                    value="Choose location*"
                                />

                                <Selects
                                    id="location"
                                    name="location"
                                    value={data.location}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                >
                                    <option>Choose location</option>
                                    {locations.map((location) => (
                                        <option value={location.id}>
                                            {location.ten}
                                        </option>
                                    ))}
                                </Selects>

                                <InputError
                                    message={errors.location}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-48 mb-3">
                                <InputLabel
                                    forInput="transpost"
                                    value="Choose transpost"
                                />

                                <Selects
                                    id="transpost"
                                    name="transpost"
                                    value={data.transpost}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                >
                                    <option>Choose transpost</option>
                                    <option value="1">Car</option>
                                    <option value="2">Bus</option>
                                    <option value="3">Train</option>
                                    <option value="4">Plane</option>
                                </Selects>

                                <InputError
                                    message={errors.transpost}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-30 mb-3">
                                <InputLabel
                                    forInput="locationdepart"
                                    value="Depart location*"
                                />
                                {/*
                                <TextInput
                                    id="location_depart"
                                    name="location_depart"
                                    value={data.location_depart}
                                    className="mt-1 block w-full"
                                    autoComplete="location_depart"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                /> */}
                                {/* <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={labels}
                                    sx={{ width: 300 }}
                                    renderInput={(location) => (
                                        <TextField {...location} label="Movie" />
                                    )}
                                /> */}
                                {/* <Select
                                    defaultValue={[colourOptions[2], colourOptions[3]]}
                                    isMulti
                                    name="colors"
                                    options={colourOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                /> */}
                                <Autocomplete
                                    disablePortal
                                    id="location_depart"
                                    options={top100Films}
                                    onChange={(event, newValue) => {
                                        setData(
                                            "location_depart",
                                            newValue.label
                                        );
                                    }}
                                    // sx={{ width: 300 }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Movie" />
                                    )}
                                />

                                <InputError
                                    message={errors.location_depart}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-30 mb-3">
                                <InputLabel
                                    forInput="location_general"
                                    value="General location*"
                                />

                                <TextInput
                                    id="location_general"
                                    name="location_general"
                                    value={data.location_general}
                                    className="mt-1 block w-full"
                                    autoComplete="location_general"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.location_general}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-30 mb-3">
                                <InputLabel
                                    forInput="time_depart"
                                    value="Depart time*"
                                />

                                <TextInput
                                    type="time"
                                    id="time_depart"
                                    name="time_depart"
                                    value={data.time_depart}
                                    className="mt-1 block w-full"
                                    autoComplete="time_depart"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.time_depart}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="w-23 mb-3">
                                <InputLabel
                                    forInput="agerfrom"
                                    value="Age appropriate*"
                                />

                                <TextInput
                                    id="agerfrom"
                                    name="agerfrom"
                                    type="number"
                                    value={data.agerfrom}
                                    className="mt-1 block w-full"
                                    autoComplete="agerfrom"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.agerfrom}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-23 mb-3">
                                <InputLabel
                                    forInput="priceAdult"
                                    value="Price adult*"
                                />

                                <TextInput
                                    id="priceAdult"
                                    name="priceAdult"
                                    type="number"
                                    value={data.priceAdult}
                                    className="mt-1 block w-full"
                                    autoComplete="priceAdult"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.priceAdult}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-23 mb-3">
                                <InputLabel
                                    forInput="priceYoung"
                                    value="Price young*"
                                />

                                <TextInput
                                    id="priceYoung"
                                    name="priceYoung"
                                    type="number"
                                    value={data.priceYoung}
                                    className="mt-1 block w-full"
                                    autoComplete="priceYoung"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.priceYoung}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-23 mb-3">
                                <InputLabel
                                    forInput="priceChild"
                                    value="Price child*"
                                />

                                <TextInput
                                    id="priceChild"
                                    name="priceChild"
                                    type="number"
                                    value={data.priceChild}
                                    className="mt-1 block w-full"
                                    autoComplete="priceChild"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.priceChild}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex w-100 justify-between">
                            <div className="w-23">
                                <InputLabel
                                    forInput="dateStart"
                                    value="Date depart*"
                                />

                                <TextInput
                                    id="dateStart"
                                    type="date"
                                    name="dateStart"
                                    value={data.dateStart}
                                    className="mt-1 block w-full"
                                    autoComplete="dateStart"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.dateStart}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-23">
                                <InputLabel
                                    forInput="amountPeople"
                                    value="Amount people*"
                                />

                                <TextInput
                                    id="amountPeople"
                                    name="amountPeople"
                                    type="number"
                                    value={data.amountPeople}
                                    className="mt-1 block w-full"
                                    autoComplete="amountPeople"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.amountPeople}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-23">
                                <InputLabel
                                    forInput="amountDay"
                                    value="Amount day*"
                                />

                                <TextInput
                                    id="amountDay"
                                    name="amountDay"
                                    type="number"
                                    value={data.amountDay}
                                    className="mt-1 block w-full"
                                    autoComplete="amountDay"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.amountDay}
                                    className="mt-2"
                                />
                            </div>

                            <div className="w-23">
                                <InputLabel
                                    forInput="amountNight"
                                    value="Amount night*"
                                />

                                <TextInput
                                    id="amountNight"
                                    name="amountNight"
                                    type="number"
                                    min="1"
                                    value={data.amountNight}
                                    className="mt-1 block w-full"
                                    autoComplete="amountNight"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.amountNight}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="mt-4 mb-3">
                            <InputLabel
                                forInput="description"
                                value="Description"
                            />

                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="description"
                                placeholder="Description"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="mb-3 w-48">
                                <InputLabel
                                    forInput="required"
                                    value="Required"
                                />

                                <Textarea
                                    id="required"
                                    name="required"
                                    value={data.required}
                                    className="mt-1 block w-full"
                                    autoComplete="required"
                                    placeholder="Required"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.required}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mb-3 w-48">
                                <InputLabel forInput="notice" value="Notice" />

                                <Textarea
                                    id="notice"
                                    name="notice"
                                    value={data.notice}
                                    className="mt-1 block w-full"
                                    autoComplete="notice"
                                    placeholder="Notice"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.notice}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <PrimaryButton className="ml-4" processing={processing}>
                            Create
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
