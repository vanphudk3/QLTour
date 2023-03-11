import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import Select from "@/Components/Bootstrap/Select";
import Textarea from "@/Components/Bootstrap/Textarea";
import FileInput from "@/Components/FileInput";

export default function Create(props) {
    const { data, setData, post, progress, processing, errors, reset } =
        useForm({
            location: "",
            name: "",
            description: "",
            price: "",
        });

    console.log(data);

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

        post(route("extraService.store"));
    };

    const locations = usePage().props.locations;

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Create category</h2>}
        >
            <Head title="Create category" />

            <div className="w-100 shadow flex justify-center">
                <div className="ml-50 mr-50 pd-25 w-80">
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <div className="mb-3">
                            <InputLabel
                                forInput="name"
                                value="Name category*"
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

                        <div className="flex justify-between">
                            <div className="mt-4 mb-3 w-48">
                                <InputLabel forInput="price" value="Price*" />

                                <TextInput
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={data.price}
                                    className="mt-1 block w-full"
                                    autoComplete="price"
                                    placeholder="price"
                                    handleChange={onHandleChange}
                                />

                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4 mb-3 w-48">
                            <InputLabel
                                    forInput="location"
                                    value="Choose location*"
                                />

                                <Select
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
                                </Select>

                                <InputError
                                    message={errors.price}
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

                        <PrimaryButton className="ml-4" processing={processing}>
                            Create
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
