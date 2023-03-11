import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm,usePage } from "@inertiajs/react";
import { useState } from "react";
import Select from "@/Components/Bootstrap/Select";
import Textarea from "@/Components/Bootstrap/Textarea";
import FileInput from "@/Components/FileInput";

export default function Create(props) {

    const categories = usePage().props.categories;
    console.log(categories);
    const { data, setData, post, progress, processing, errors, reset } = useForm({
        category: "",
        name: "",
        description: "",
        address: "",
        mapdata: "",
        images: "",
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

    const handlechange =(e)=>{
        const ArrayImage = [];
        for(let i = 0; i < e.target.files.length; i++){
            ArrayImage.push(e.target.files[i]);
            console.log(ArrayImage);
        }
        setData(e.target.name, ArrayImage);

    }


    const submit = (e) => {
        e.preventDefault();
        
        post(route("location.store"));
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Create location</h2>}
        >
            <Head title="Create location" />

            <div className="w-100 shadow flex justify-center">
                <div className="ml-50 mr-50 pd-25 w-80">
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <div className="flex justify-between">
                            <div className="mb-3 w-48">
                                <InputLabel forInput="name" value="Name Location*" />

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
                            <div className="w-48 mb-3">
                                <InputLabel
                                    forInput="category"
                                    value="Choose category*"
                                />

                                <Select
                                    id="category"
                                    name="category"
                                    value={data.category}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                >
                                    <option>Choose category</option>
                                    {categories.map((category) => (
                                        <option value={category.id}>
                                            {category.ten}
                                        </option>
                                    ))}
                                </Select>

                                <InputError
                                    message={errors.category}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                                <InputLabel forInput="address" value="Address*" />

                                <TextInput
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    className="mt-1 block w-full"
                                    autoComplete="address"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.address}
                                    className="mt-2"
                                />
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

                        <div className="mt-4 mb-3">
                            <InputLabel
                                forInput="mapdata"
                                value="Mapdata"
                            />

                            <Textarea
                                id="mapdata"
                                name="mapdata"
                                value={data.mapdata}
                                className="mt-1 block w-full"
                                autoComplete="mapdata"
                                placeholder="mapdata"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.mapdata}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">

                            <input
                                    type="file"
                                    name="images"
                                    onChange={handlechange}
                                    autoComplete="images"
                                    multiple
                                    required
                                />
                                {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                                )}
                            
                            <InputError
                                message={errors.images}
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
