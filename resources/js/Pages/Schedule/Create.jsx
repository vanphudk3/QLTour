import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage, router } from "@inertiajs/react";
import Select from "@/Components/Bootstrap/Select";
import Textarea from "@/Components/Bootstrap/Textarea";
import FileInput from "@/Components/FileInput";
import { Autocomplete, TextareaAutosize, TextField } from "@mui/material";
import { isEmpty } from "lodash";
import React, { Component } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { useEffect } from "react";


export default function Create(props) {
    const tours = usePage().props.tours;
    const forcusTour = usePage().props.forcusTour;
    const { data, setData, post, progress, processing, errors, reset, error } =
        useForm({
            id: forcusTour.id,
            idTour: !isEmpty(forcusTour) ? forcusTour.ten_tour : "",
            schedule: !isEmpty(forcusTour) ? forcusTour.schedule : [],
        });
        console.log("forcusTour", forcusTour);
        const onHandleChange = (event, index) => {
            const { name, value } = event.target;
            setData(name, value); // Update the form data
        
            if (name === `title${index}`) {
                const updatedSchedule = [...data.schedule];
                updatedSchedule[index].tieu_de = value;
                setData("schedule", updatedSchedule);
            }
        };
        

    const submit = (e) => {
        e.preventDefault();
        post(route("schedule.store"));
        if (error) {
            Swal.fire({
                icon: "error",
                title: error,
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }
    };

    const top100Films = [];

    tours.map((tour) => {
        top100Films.push({
            label: tour.ten_tour,
            idTour: tour.id,
        });
    });

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Edit Schedule</h2>}
        >
            <Head title="Create Schedule" />

            <div className="w-100 flex justify-center pd-t-25 pd-bt-25">
                <div className="ml-50 mr-50 pd-25 w-80 shadow bg-white">
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <div className="mb-3">
                            <Autocomplete
                                disablePortal
                                id="idTour"
                                options={top100Films}
                                value={data.idTour}
                                onChange={(event, newValue) => {
                                    setData("idTour", newValue.label);
                                    router.get(
                                        route("schedule.create", {
                                            idTour: newValue.idTour,
                                        })
                                    );
                                }}
                                // sx={{ width: 300 }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Tours" />
                                )}
                                disabled={true}
                            />

                            <InputError
                                message={errors.idTour}
                                className="mt-2"
                            />
                            
                        </div>
                        {!isEmpty(forcusTour) && (
                            <>
                                {forcusTour.schedule.map((schedule, index) => {
                                    return (
                                        <>

                                            <div className="">
                                                {/* <div className="mt-4 mb-3">
                                                <InputLabel forInput="date" value="Date:" />
                                                    <TextInput
                                                        id="schedule"
                                                        label="Schedule"
                                                        name="schedule"
                                                        type="date"
                                                        value={schedule}
                                                        disabled
                                                    />
                                                </div> */}
                                                <div className="mt-4 mb-3">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Title schedule"
                                                        variant="outlined"
                                                        value={schedule.tieu_de}
                                                        sx={{ width: "100%" }}
                                                        name={`title${index}`}
                                                        // value={data.title}
                                                        onChange={(event) =>
                                                            onHandleChange(
                                                                event,
                                                                index
                                                            )
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={errors.title}
                                                        className="mt-2"
                                                    />
                                                </div>

                                                <div className="mt-4 mb-3">
                                                    {/* <TextField
                                                        id={`ckeditor${index}`}
                                                        label="Content schedule"
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                        sx={{ width: "100%" }}
                                                        name={`content${index}`}
                                                        // value={data.content}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                    /> */}

                                                    <InputLabel forInput="content" value="Content schedule:" />

                                                    <CKEditor
                                                        editor={ClassicEditor}
                                                        data={schedule.noi_dung}
                                                        onChange={(event, editor) => {
                                                            const data = editor.getData();
                                                            // setData(`content${index}`, data);
                                                            schedule.noi_dung = data;

                                                        }}
                                            
                                                    />

                                                    <InputError
                                                        message={errors.content}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                                {forcusTour.schedule.length == 0 && (
                                    <div className="text-red-500 text-sm">
                                        Tour not have schedule
                                    </div>
                                )}
                                {errors.schedule && (
                                    <div className="text-red-500 text-sm">
                                        {errors.schedule}
                                    </div>
                                )}
                                <PrimaryButton
                                    className="ml-4"
                                    processing={processing}
                                >
                                    Save
                                </PrimaryButton>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
