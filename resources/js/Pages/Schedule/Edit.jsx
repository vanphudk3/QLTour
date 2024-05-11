import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { usePage, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import BasicDatePicker from "@/Components/days";

export default function Edit(props) {
    // disabled ngày hiện tại và ngày quá khứ
    // const today = new Date().toISOString().split("T")[0];
    // today.setDate(today.getDate() + 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const today = tomorrow.toISOString().split("T")[0];
    const schedule = usePage().props.schedule;
    const nhan_vien = usePage().props.nhan_viens;
    const [nhanVien, setNhanVien] = useState(nhan_vien);
    const errorMessage = usePage().props.error;
    const { data, setData, post, put, processing, errors, error, reset } = useForm({
        id: schedule.id || "",
        ngay: schedule.ngay || "",
        so_ngay: schedule.so_ngay || "",
        trang_thai: schedule.trang_thai || "",
        ma_nhan_vien: schedule.ma_nhan_vien || "",
        so_cho: schedule.so_cho || "",
        disable: schedule.disable || false,

    });
    // console.log(schedule);
    // chuyển object thành mảng
    // const nhan_vien = Object.keys(data_nhan_vien).map((key) => data_nhan_vien[key]);
    if (nhan_vien.length === 0) {
        return (
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="heading-title">Edit schedule</h2>}
            >
                <Head title="Edit schedule" />
                <div className="w-100 shadow">
                    <div className="ml-50 mr-50 pd-25">
                        <h2>There are no employees</h2>
                    </div>
                </div>
            </Authenticated>
        );
    }

    if (Object.keys(schedule).length === 0) {
        return (
            <Authenticated
                auth={props.auth}
                errors={props.errors}
                header={<h2 className="heading-title">Edit schedule</h2>}
            >
                <Head title="Edit schedule" />
                <div className="w-100 shadow">
                    <div className="ml-50 mr-50 pd-25">
                        <h2>There are no schedules</h2>
                    </div>
                </div>
            </Authenticated>
        );
    }

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );

        // nếu là số ngày thì kiểm tra xem có phải là số không
        if (event.target.name === "so_ngay" || event.target.name === "so_cho") {
                const rex = /^[0-9\b]+$/;
                event.target.value = event.target.value.replace(/[^0-9]/g, "");
                if (event.target.value === "" || rex.test(event.target.value)) {
                    setData(event.target.name, event.target.value);
                }
        }

        // khi thay đổi ngày thì fetch lại nhân viên
        if (event.target.name === "ngay") {
            fetchNhanVien(event.target.value);
        }
    };

    const fetchNhanVien = async (ngay) => {
        const res = await fetch(`/api/nhanvien?id=${data.ma_nhan_vien}&ngay=${ngay}&so_ngay=${data.so_ngay}&tour_ngay_id=${schedule.id}`, {
            // method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json, text/plain, */*",
            },
        });
        const datas = await res.json();
        console.log(datas.data);
        if (datas.status === 'success') {
            let arr_data = Object.keys(datas.data).map((key) => datas.data[key]);
            setNhanVien(arr_data);

        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (data.ngay === "") {
            Swal.fire({
                icon: "error",
                title: "Date is required",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        } else {
            const getYear = data.ngay.split("-")[0];
            const getMonth = data.ngay.split("-")[1];
            const getDay = data.ngay.split("-")[2];
            // yếu năm nhỏ hơn năm hiện tại thì không cho sửa
            if (getYear < today.split("-")[0]) {
                Swal.fire({
                    icon: "error",
                    title: "Year must be greater than or equal to the current year",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });
                return;
            }
        if (data.ngay < today) {
            Swal.fire({
                icon: "error",
                title: "Date must be greater than today",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }
        }
        if (data.so_ngay === "") {
            Swal.fire({
                icon: "error",
                title: "Amount of days off is required",
                toast: true,
                position: "top-end",
                backgroudColor: "red",

                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }
        if (data.ma_nhan_vien === "") {
            Swal.fire({
                icon: "error",
                title: "Employee is required",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                backgroudColor: "red",
                timer: 3000,
            });
            return;
        }
        if (data.so_cho === "") {
            Swal.fire({
                icon: "error",
                title: "Number of seats is required",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                backgroudColor: "red",
                timer: 3000,
            });
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You want to edit this schedule?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, edit it!",
        }).then((result) => {
            if (result.isConfirmed) {
                // router.put(`/auth/schedule/${schedule.id}`, data);
                // Swal.fire({
                //     icon: "success",
                //     title: "Edit schedule successfully",
                //     showConfirmButton: false,
                //     timer: 3000,
                //     toast: true,
                //     position: "top-end",

                // });

                put(`/auth/schedule/${schedule.id}`, {
                    preserveScroll: true,
                    onSuccess: (data) => {
                        console.log(data);
                        if (data.props.error != null) {
                            Swal.fire({
                                icon: "error",
                                title: data.props.error,
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                            return;
                        }
                        Swal.fire({
                            icon: "success",
                            title: "Edit schedule successfully",
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                        });
                    },
                    onError: (errors) => {
                        if (errors.ngay) {
                            Swal.fire({
                                icon: "error",
                                title: errors.ngay,
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                        }
                        if (errors.so_ngay) {
                            Swal.fire({
                                icon: "error",
                                title: errors.so_ngay,
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                        }
                        if (errors.ma_nhan_vien) {
                            Swal.fire({
                                icon: "error",
                                title: errors.ma_nhan_vien,
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                        }
                        if (errors.so_cho) {
                            Swal.fire({
                                icon: "error",
                                title: errors.so_cho,
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                        }
                        if (error) {
                            Swal.fire({
                                icon: "error",
                                title: error,
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                        }
                    },
                });
            }
        });

        // router.post(`/auth/schedule/${schedule.id}`, data);
    };


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Edit schedule</h2>}
        >
            <Head title="Edit schedule" />

            <div className="w-100 shadow">
                <div className="ml-50 mr-50 pd-25">
                    <form onSubmit={submit}>

                        <div className="mt-4 mb-3">
                            <TextField
                                id="outlined-basic"
                                label="Title schedule"
                                type="date"
                                variant="outlined"
                                sx={{ width: "100%" }}
                                name="ngay"
                                days={today}
                                value={data.ngay}
                                onChange={onHandleChange}
                                // nếu là ngày trong quá khứ thì không cho sửa
                                disabled={data.disable}
                            />

                            <InputError
                                message={errors.ngay}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <TextField
                                id="outlined-multiline-static"
                                label="Amount of days off"
                                // multiline
                                // rows={5}
                                variant="outlined"
                                sx={{ width: "100%" }}
                                name="so_ngay"
                                value={data.so_ngay}
                                onChange={onHandleChange}
                            />

                            <InputError
                                message={errors.so_ngay}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4 mb-3">
                            <TextField
                                id="outlined-multiline-static"
                                label="Number of seats"
                                // multiline
                                // rows={5}
                                variant="outlined"
                                sx={{ width: "100%" }}
                                name="so_cho"
                                value={data.so_cho}
                                onChange={onHandleChange}
                            />

                            <InputError
                                message={errors.so_cho}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4 mb-3">
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-status">Status</InputLabel>
                            <Select
                                name="trang_thai"
                                value={data.trang_thai}
                                onChange={onHandleChange}
                                // className="form-select"
                                id="demo-simple-select-status"
                            >
                                <MenuItem  value={0}>Active</MenuItem>
                                <MenuItem  value={1}>Completed</MenuItem>
                                <MenuItem  value={2}>Cancel</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                        <div className="mt-4 mb-3">
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-nhanvien">Employee</InputLabel>
                            <Select
                                name="ma_nhan_vien"
                                value={data.ma_nhan_vien}
                                onChange={onHandleChange}
                                // className="form-select"
                                id="demo-simple-select-nhanvien"
                            >
                                {nhanVien.map((item, index) => (
                                    <MenuItem  key={index} value={item.id}>
                                        {item.name}
                                    </MenuItem >
                                ))}
                            </Select>
                        </FormControl>
                        </div>
                        <PrimaryButton className="ml-4" processing={processing}>
                            Edit
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
