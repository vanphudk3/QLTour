import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage, router } from "@inertiajs/react";
import Textarea from "@/Components/Bootstrap/Textarea";
import Swal from "sweetalert2";
import { isEmpty } from "lodash";
import Validate from "validator/lib/isEmpty";
import { useEffect, useState } from "react";


export default function Edit(props) {

    const location = usePage().props.location;
    const imgLocation = usePage().props.imgLocation;
    console.log(imgLocation);

    const { data, setData, post, progress, processing, errors, reset } = useForm({
        name: location.ten || "",
        description: location.mo_ta || "",
        address: location.dia_chi || "",
        mapdata: location.du_lieu_map || "",
        images: [],
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

    const renderImage = () => {
        return imgLocation.map((img, index) => {
            return (
                <div className="col-md-3" key={index}>
                    <div className="card">
                        <img
                            src={`http://localhost:8000/storage/${img.ten}`}
                            className="card-img-top"
                            alt="..."
                        />
                    </div>
                </div>
            );
        });
    };

    const [validationMsg, setValidationMsg] = useState({});

    const validateAll = () => {
        const msg = {};
        if (Validate(data.name)) {
            msg.name = "Name is required";
        }
        if(Validate(data.address)){
            msg.address = "Address is required";
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
        router.post(`/auth/location/${location.id}`, {
            _method: 'PUT',
            name: data.name,
            description: data.description,
            address: data.address,
            mapdata: data.mapdata,
            images: data.images,

        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Edit location</h2>}
        >
            <Head title="Edit location" />

            <div className="w-100 shadow">
                <div className="ml-50 mr-50 pd-25">
                    <form onSubmit={submit}>

                        <div>
                            <InputLabel forInput="name" value="Name location*" />

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
                    <InputError message={validationMsg.name} className="mt-2" />
                    <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4 mb-3">
                            <InputLabel
                                forInput="address"
                                value="Address"
                            />

                            <Textarea
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                handleChange={onHandleChange}
                            />

<InputError message={validationMsg.address} className="mt-2" />
                    <InputError message={errors.address} className="mt-2" />
                        </div>

                        <div className="mt-4 mb-3">
                            <InputLabel
                                forInput="description"
                                value="Description"
                            />

                            <Textarea
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="description"
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
                                type="text"
                                name="mapdata"
                                value={data.mapdata}
                                className="mt-1 block w-full"
                                autoComplete="mapdata"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.mapdata}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <InputLabel
                                forInput="images"
                                value="Images"
                            />
                            <br/>
                            <input
                                    type="file"
                                    name="images"
                                    onChange={handlechange}
                                    autoComplete="images"
                                    multiple
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
                        {imgLocation.length > 0 && (
                            <>
                            <InputLabel
                                forInput="Images private"
                                value="Images private"
                            />
                            <div className="row mb-3">{renderImage()}</div>
                            </>
                        )}
                        <PrimaryButton className="ml-4" processing={processing}>
                            Create
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
