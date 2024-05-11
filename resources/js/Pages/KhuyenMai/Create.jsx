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
import Swal from "sweetalert2";
import Validate from "validator/lib/isEmpty";

function formatVND(value) {
    value = value.toString().replace(/,/g, "");
    let formatter = new Intl.NumberFormat("vi-VN");
    return formatter.format(value);
}
export default function Create(props) {
    const { data, setData, post, progress, processing, errors, reset, error } =
        useForm({
            title: "",
            giam_theo: "",
            gia_tri: "",
            so_lan_su_dung: "",
            ngay_bat_dau: "",
            ngay_ket_thuc: "",
        });
        const onHandleChange = (event, index) => {
            setData(
                event.target.name,
                event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
            );

            if (event.target.name === "gia_tri") {
                let value = event.target.value;
                if (value) {
                    value = value.replace(/\D/g, "");
                    value = parseInt(value);
                    setData("gia_tri", formatVND(value));
                }
            }
        };
        const [validationMsg, setValidationMsg] = React.useState({});
        const validateAll = () => {
            let gia_tri = data.gia_tri;
            if (gia_tri) {
                gia_tri = gia_tri.replace(/\D/g, "");
                gia_tri = parseInt(gia_tri);
            }
            console.log(gia_tri);
            const msg = {};
            if (Validate(data.title)) {
                msg.title = "Name is required";
            }
            if (Validate(data.giam_theo)) {
                msg.giam_theo = "Discount Type is required";
            } else if (data.giam_theo == 0 && gia_tri > 100) {
                msg.gia_tri = "Percent must be less than 100";
            }
            if (Validate(data.gia_tri)) {
                msg.gia_tri = "Value is required";
            }
            if (Validate(data.so_lan_su_dung)) {
                msg.so_lan_su_dung = "Number of times applied is required";
            }
            if (Validate(data.ngay_bat_dau)) {
                msg.ngay_bat_dau = "Start Date is required";
            }
            if (Validate(data.ngay_ket_thuc)) {
                msg.ngay_ket_thuc = "End Date is required";
            }
            // ngay ket thuc > ngay bat dau
            if (data.ngay_bat_dau && data.ngay_ket_thuc) {
                let start = new Date(data.ngay_bat_dau);
                let end = new Date(data.ngay_ket_thuc);
                if (start > end) {
                    msg.ngay_ket_thuc = "End Date must be greater than Start Date";
                }
            }
    
            setValidationMsg(msg);
            if (Object.keys(msg).length > 0) {
                Swal.fire({
                    icon: "error",
                    title: msg[Object.keys(msg)[0]],
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });
                // forcus into first element
                document.getElementsByName(Object.keys(msg)[0])[0].focus();

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
        post(route("khuyenmai.store"));
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
    console.log(validationMsg);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Add Promotion</h2>}
        >
            <Head title="Create Promotion" />

            <div className="w-100 flex justify-center pd-t-25 pd-bt-25">
                <div className="ml-50 mr-50 pd-25 w-80 shadow bg-white">
                    <form onSubmit={submit} enctype="multipart/form-data">
                        <div className="mb-3">
                            <InputLabel forInput="title" value="Title *" />
                            <TextInput
                                id="title"
                                className="w-full"
                                name="title"
                                isError={!isEmpty(errors.title)}
                                errorMessage={errors.title}
                                handleChange={onHandleChange}
                                required
                            />
                        </div>
                        <div className="row">
                        <div className="mb-3 col">
                            <InputLabel forInput="giam_theo" value="Discount Type *" />
                            <Select
                                id="giam_theo"
                                className="w-full"
                                name="giam_theo"
                                isError={!isEmpty(errors.giam_theo)}
                                errorMessage={errors.giam_theo}
                                handleChange={onHandleChange}
                                required
                            >
                                <option value="">Select Discount Type</option>
                                <option value="0">Percent</option>
                                <option value="1">Money</option>
                            </Select>

                        </div>
                        <div className="mb-3 col">
                            <InputLabel forInput="gia_tri" value="Value *" />
                            <TextInput
                                id="gia_tri"
                                className="w-full"
                                name="gia_tri"
                                isError={!isEmpty(errors.gia_tri)}
                                errorMessage={errors.gia_tri}
                                handleChange={onHandleChange}
                                value={data.gia_tri}
                                required
                            />
                        </div>
                        </div>
                        <div className="mb-3">
                            <InputLabel forInput="so_lan_su_dung" value="Number of times applied *" />
                            <TextInput
                                id="so_lan_su_dung"
                                className="w-full"
                                name="so_lan_su_dung"
                                isError={!isEmpty(errors.so_lan_su_dung)}
                                errorMessage={errors.so_lan_su_dung}
                                handleChange={onHandleChange}
                                type="number"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel forInput="ngay_bat_dau" value="Start Date *" />
                            <TextInput
                                id="ngay_bat_dau"
                                className="w-full"
                                name="ngay_bat_dau"
                                isError={!isEmpty(errors.ngay_bat_dau)}
                                errorMessage={errors.ngay_bat_dau}
                                handleChange={onHandleChange}
                                type="date"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel forInput="ngay_ket_thuc" value="End Date *" />
                            <TextInput
                                id="ngay_ket_thuc"
                                className="w-full"
                                name="ngay_ket_thuc"
                                isError={!isEmpty(errors.ngay_ket_thuc)}
                                errorMessage={errors.ngay_ket_thuc}
                                handleChange={onHandleChange}
                                type="date"
                                required
                            />
                        </div>

                        <PrimaryButton
                            className="ml-4"
                            processing={processing}
                        >
                            Save
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
