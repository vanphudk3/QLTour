import { Head, Link, usePage, useForm, router } from "@inertiajs/react";
import Content from "@/Layouts/Tour";
import {
    Box,
    Breadcrumbs,
    Button,
    Collapse,
    IconButton,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Swal from "sweetalert2";
import Validate from "validator/lib/isEmpty";
import { forwardRef } from "react";
import { isEmpty } from "lodash";
import InputError from "@/Components/InputError";
import NavLinkB from "@/Components/Bootstrap/NavLink";

const openInforCustomer = (evt, DesName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(DesName).style.display = "block";
    evt.currentTarget.className += " active";
};

const defaultOpen = () => {
    document.getElementById("defaultOpen").click();
};

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const numberFormat = (value) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
};

export default function Profile(props) {
    const customer = usePage().props.customer;
    const list_order = usePage().props.list_order;
    const profile = usePage().props.profile;

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openEditName, setOpenEditName] = useState(false);
    const [openEditEmail, setOpenEditEmail] = useState(false);
    const [openEditPhone, setOpenEditPhone] = useState(false);
    const [openEditAddress, setOpenEditAddress] = useState(false);
    const [openEditCitizen, setOpenEditCitizen] = useState(false);
    const [openEditBirthday, setOpenEditBirthday] = useState(false);

    const { data, setData, post, progress, processing, errors, reset } =
        useForm({
            name: customer.ten_khach_hang,
            email: customer.email,
            phone: customer.so_dien_thoai,
            address: customer.dia_chi,
            citizen_identification_number:
                customer.citizen_identification_number,
            birthday: customer.ngay_sinh,
        });

    console.log(profile);
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
        if (event.target.name === "citizen_identification_number") {
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
        if (Validate(data.name)) {
            msg.name = "Name is required";
        }
        if (Validate(data.phone)) {
            msg.phone = "Phone is required";
        }
        if (Validate(data.email)) {
            msg.email = "Email is required";
        }
        if (Validate(data.address)) {
            msg.address = "Address is required";
        }
        if (Validate(data.birthday)) {
            msg.birthday = "Birthday is required";
        }
        if (Validate(data.citizen_identification_number)) {
            msg.citizen_identification_number =
                "Citizen identification is required";
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
        if (!isValid) {
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setOpenEdit(true);
                post(`/api/profileMember/${customer.id}/update`, data);
            }
        });
    };

    const onHandleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setOpenEdit(true);
                post(`/api/profileMember/${id}/cancelorder`);
            }
        });
    };

    const [state, setState] = useState({
        vertical: "top",
        horizontal: "right",
    });

    const { vertical, horizontal } = state;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenEdit(false);
    };

    return (
        <>
            <Head title="Profile" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> Profile</h1>
                        </div>
                    </div>
                </div>
                <div
                    className="container-layout"
                    style={{ paddingTop: "80px" }}
                >
                    <div className="layout-02">
                        <div className="row">
                            <div
                                className="col-6 col-md-4 width-100"
                                style={{ borderLeft: "none" }}
                            >
                                <div className="sidebar-form">
                                    <div className="search-available">
                                        <div className="flex booking-guests-result">
                                            <AccountCircleIcon
                                                style={{ fontSize: 50 }}
                                            />
                                            <div className="booking-form__block">
                                                <h6 className="">
                                                    {customer.ten_khach_hang}
                                                </h6>
                                                <p className="post-date">
                                                    {customer.email}
                                                </p>
                                            </div>
                                        </div>
                                        <Paper>
                                            <MenuList>
                                                <MenuItem
                                                    className="tablinks active"
                                                    id="defaultOpen"
                                                    ref={defaultOpen}
                                                    onClick={(e) =>
                                                        openInforCustomer(
                                                            e,
                                                            "Infor"
                                                        )
                                                    }
                                                >
                                                    Account
                                                </MenuItem>
                                                <MenuItem
                                                    className="tablinks active"
                                                    onClick={(e) =>
                                                        openInforCustomer(
                                                            e,
                                                            "Order"
                                                        )
                                                    }
                                                >
                                                    Order
                                                </MenuItem>
                                                <MenuItem
                                                    className="tablinks active"
                                                    onClick={(e) =>
                                                        openInforCustomer(
                                                            e,
                                                            "Reviews"
                                                        )
                                                    }
                                                >
                                                    Reviews
                                                </MenuItem>
                                            </MenuList>
                                        </Paper>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 width-100">
                                <div className="sidebar-form">
                                    <div
                                        id="Infor"
                                        className="search-available tabcontent"
                                    >
                                        <h6 className="heading-title">
                                            Thông tin cá nhân
                                        </h6>
                                        <Snackbar
                                            open={openEdit}
                                            autoHideDuration={6000}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical,
                                                horizontal,
                                            }}
                                            key={vertical + horizontal}
                                        >
                                            <Alert
                                                onClose={handleClose}
                                                severity="success"
                                                style={{
                                                    width: "100%",
                                                    Zindex: "999",
                                                }}
                                            >
                                                Update profile success!
                                            </Alert>
                                        </Snackbar>
                                        {/* {!isEmpty(profile.success) && (
                                        )} */}
                                        <div className="contact-detail">
                                            <div className="contact-item wrd">
                                                <table>
                                                    <tr>
                                                        <td scope="row">
                                                            Name:
                                                        </td>
                                                        <td>
                                                            {
                                                                customer.ten_khach_hang
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                name="btn-name"
                                                                onClick={() =>
                                                                    setOpenEditName(
                                                                        !openEditName
                                                                    )
                                                                }
                                                            >
                                                                {openEditName
                                                                    ? "Close"
                                                                    : "Edit"}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <Collapse
                                                            in={openEditName}
                                                            timeout="auto"
                                                            unmountOnExit
                                                            sx={{
                                                                width: "175%",
                                                            }}
                                                        >
                                                            <td scope="row">
                                                                Edit name:
                                                            </td>
                                                            <td>
                                                                {/* <InputLabel forInput="content" value="Edit name:" /> */}
                                                                <TextInput
                                                                    id="outlined-basic"
                                                                    label="Name"
                                                                    variant="outlined"
                                                                    value={
                                                                        data.name
                                                                    }
                                                                    name="name"
                                                                    handleChange={
                                                                        onHandleChange
                                                                    }
                                                                    style={{
                                                                        width: "200%",
                                                                    }}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        validationMsg.name
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type="submit"
                                                                    onClick={
                                                                        onHandleSubmit
                                                                    }
                                                                >
                                                                    Save
                                                                </Button>
                                                            </td>
                                                        </Collapse>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Email:
                                                        </td>
                                                        <td>
                                                            {customer.email}
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                name="btn-email"
                                                                onClick={() =>
                                                                    setOpenEditEmail(
                                                                        !openEditEmail
                                                                    )
                                                                }
                                                            >
                                                                {openEditEmail
                                                                    ? "Close"
                                                                    : "Edit"}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <Collapse
                                                            in={openEditEmail}
                                                            timeout="auto"
                                                            unmountOnExit
                                                            sx={{
                                                                width: "175%",
                                                            }}
                                                        >
                                                            <td scope="row">
                                                                Edit email:
                                                            </td>
                                                            <td>
                                                                {/* <InputLabel forInput="content" value="Edit name:" /> */}
                                                                <TextInput
                                                                    id="outlined-basic"
                                                                    type="email"
                                                                    label="Email"
                                                                    variant="outlined"
                                                                    value={
                                                                        data.email
                                                                    }
                                                                    name="email"
                                                                    handleChange={
                                                                        onHandleChange
                                                                    }
                                                                    style={{
                                                                        width: "200%",
                                                                    }}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        validationMsg.email
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type="submit"
                                                                    onClick={
                                                                        onHandleSubmit
                                                                    }
                                                                >
                                                                    Save
                                                                </Button>
                                                            </td>
                                                        </Collapse>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Phone:
                                                        </td>
                                                        <td>
                                                            {
                                                                customer.so_dien_thoai
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                name="btn-phone"
                                                                onClick={() =>
                                                                    setOpenEditPhone(
                                                                        !openEditPhone
                                                                    )
                                                                }
                                                            >
                                                                {openEditPhone
                                                                    ? "Close"
                                                                    : "Edit"}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <Collapse
                                                            in={openEditPhone}
                                                            timeout="auto"
                                                            unmountOnExit
                                                            sx={{
                                                                width: "175%",
                                                            }}
                                                        >
                                                            <td scope="row">
                                                                Edit phone:
                                                            </td>
                                                            <td>
                                                                <TextInput
                                                                    id="outlined-basic"
                                                                    label="Phone"
                                                                    variant="outlined"
                                                                    value={
                                                                        data.phone
                                                                    }
                                                                    name="phone"
                                                                    handleChange={
                                                                        onHandleChange
                                                                    }
                                                                    style={{
                                                                        width: "200%",
                                                                    }}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        validationMsg.phone
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type="submit"
                                                                    onClick={
                                                                        onHandleSubmit
                                                                    }
                                                                >
                                                                    Save
                                                                </Button>
                                                            </td>
                                                        </Collapse>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Citiez
                                                            identification
                                                        </td>
                                                        <td>
                                                            {
                                                                customer.citizen_identification_number
                                                            }
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                name="btn-citiez"
                                                                onClick={() =>
                                                                    setOpenEditCitizen(
                                                                        !openEditCitizen
                                                                    )
                                                                }
                                                            >
                                                                {openEditCitizen
                                                                    ? "Close"
                                                                    : "Edit"}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <Collapse
                                                            in={openEditCitizen}
                                                            timeout="auto"
                                                            unmountOnExit
                                                            sx={{
                                                                width: "175%",
                                                            }}
                                                        >
                                                            <td scope="row">
                                                                Edit citizen
                                                                identification
                                                            </td>
                                                            <td>
                                                                {/* <InputLabel forInput="content" value="Edit name:" /> */}
                                                                <TextInput
                                                                    id="outlined-basic"
                                                                    label="Citizen identification"
                                                                    variant="outlined"
                                                                    value={
                                                                        data.citizen_identification_number
                                                                    }
                                                                    name="citizen_identification_number"
                                                                    handleChange={
                                                                        onHandleChange
                                                                    }
                                                                    style={{
                                                                        width: "200%",
                                                                    }}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        validationMsg.citizen_identification_number
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type="submit"
                                                                    onClick={
                                                                        onHandleSubmit
                                                                    }
                                                                >
                                                                    Save
                                                                </Button>
                                                            </td>
                                                        </Collapse>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Birthday:
                                                        </td>
                                                        <td>
                                                            {customer.ngay_sinh}
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                name="btn-birthday"
                                                                onClick={() =>
                                                                    setOpenEditBirthday(
                                                                        !openEditBirthday
                                                                    )
                                                                }
                                                            >
                                                                {openEditBirthday
                                                                    ? "Close"
                                                                    : "Edit"}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <Collapse
                                                            in={
                                                                openEditBirthday
                                                            }
                                                            timeout="auto"
                                                            unmountOnExit
                                                            sx={{
                                                                width: "175%",
                                                            }}
                                                        >
                                                            <td scope="row">
                                                                Edit birthday:
                                                            </td>
                                                            <td>
                                                                {/* <InputLabel forInput="content" value="Edit name:" /> */}
                                                                <TextInput
                                                                    id="outlined-basic"
                                                                    label="Birthday"
                                                                    type="date"
                                                                    variant="outlined"
                                                                    value={
                                                                        data.birthday
                                                                    }
                                                                    name="birthday"
                                                                    handleChange={
                                                                        onHandleChange
                                                                    }
                                                                    style={{
                                                                        width: "200%",
                                                                    }}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        validationMsg.birthday
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type="submit"
                                                                    onClick={
                                                                        onHandleSubmit
                                                                    }
                                                                >
                                                                    Save
                                                                </Button>
                                                            </td>
                                                        </Collapse>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Address:
                                                        </td>
                                                        <td>
                                                            {customer.dia_chi}
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                name="btn-address"
                                                                onClick={() =>
                                                                    setOpenEditAddress(
                                                                        !openEditAddress
                                                                    )
                                                                }
                                                            >
                                                                {openEditAddress
                                                                    ? "Close"
                                                                    : "Edit"}
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <Collapse
                                                            in={openEditAddress}
                                                            timeout="auto"
                                                            unmountOnExit
                                                            sx={{
                                                                width: "175%",
                                                            }}
                                                        >
                                                            <td scope="row">
                                                                Edit address:
                                                            </td>
                                                            <td>
                                                                {/* <InputLabel forInput="content" value="Edit name:" /> */}
                                                                <TextInput
                                                                    id="outlined-basic"
                                                                    label="Address"
                                                                    variant="outlined"
                                                                    value={
                                                                        data.address
                                                                    }
                                                                    name="address"
                                                                    handleChange={
                                                                        onHandleChange
                                                                    }
                                                                    style={{
                                                                        width: "200%",
                                                                    }}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        validationMsg.address
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    type="submit"
                                                                    onClick={
                                                                        onHandleSubmit
                                                                    }
                                                                >
                                                                    Save
                                                                </Button>
                                                            </td>
                                                        </Collapse>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Count tour:
                                                        </td>
                                                        <td>
                                                            {
                                                                customer.tong_so_tour_da_di
                                                            }
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        id="Order"
                                        className="search-available tabcontent"
                                    >
                                        <h6 className="heading-title">
                                            Danh sách tour đã đặt
                                        </h6>
                                        {list_order.length === 0 ? (
                                            <div className="contact-detail">
                                                <div className="contact-item wrd">
                                                    <table>
                                                        <tr>
                                                            <td scope="row">
                                                                Bạn chưa đặt
                                                                tour nào
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="contact-detail">
                                                    <div className="contact-item wrd">
                                                        <Table aria-label="collapsible table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell />
                                                                    <TableCell>
                                                                        Tên tour
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        Ngày đi
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        Số lượng
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        Tổng
                                                                        tiền
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        Trạng
                                                                        thái
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            {list_order.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <TableBody>
                                                                        <TableRow
                                                                            sx={{
                                                                                "& > *":
                                                                                    {
                                                                                        borderBottom:
                                                                                            "unset",
                                                                                    },
                                                                            }}
                                                                        >
                                                                            <TableCell
                                                                                style={{
                                                                                    paddingRight:
                                                                                        "0px",
                                                                                }}
                                                                            >
                                                                                <IconButton
                                                                                    aria-label="expand row"
                                                                                    size="small"
                                                                                    name={`click${index}`}
                                                                                    onClick={() =>
                                                                                        setOpen(
                                                                                            !open
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {open ? (
                                                                                        <KeyboardArrowUpIcon />
                                                                                    ) : (
                                                                                        <KeyboardArrowDownIcon />
                                                                                    )}
                                                                                </IconButton>
                                                                            </TableCell>
                                                                            {item.tour.map(
                                                                                (
                                                                                    item,
                                                                                    index
                                                                                ) => (
                                                                                    <>
                                                                                        <TableCell
                                                                                            component="th"
                                                                                            scope="row"
                                                                                        >
                                                                                            <NavLinkB
                                                                                                aria-current="page"
                                                                                                href={`/tour/${item.slug}`}
                                                                                                className="content-book"
                                                                                            >
                                                                                                {
                                                                                                    item.ten_tour
                                                                                                }
                                                                                            </NavLinkB>
                                                                                        </TableCell>
                                                                                        <TableCell align="right">
                                                                                            {
                                                                                                item.ngay_khoi_hanh
                                                                                            }
                                                                                        </TableCell>
                                                                                    </>
                                                                                )
                                                                            )}

                                                                            <TableCell align="right">
                                                                                {
                                                                                    item
                                                                                        .detail
                                                                                        .so_luong_nguoi
                                                                                }
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {numberFormat(
                                                                                    item
                                                                                        .detail
                                                                                        .total
                                                                                )}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {item.trang_thai ==
                                                                                    0 && (
                                                                                    <>
                                                                                        Đã
                                                                                        hủy
                                                                                    </>
                                                                                )}
                                                                                {item.trang_thai ==
                                                                                    1 && (
                                                                                    <>
                                                                                        Chờ
                                                                                        xử
                                                                                        lý
                                                                                    </>
                                                                                )}

                                                                                {item.trang_thai ==
                                                                                    2 && (
                                                                                    <>
                                                                                        Đã
                                                                                        xử
                                                                                        lý
                                                                                    </>
                                                                                )}
                                                                            </TableCell>
                                                                            {item.trang_thai ==
                                                                                1 && (
                                                                                <>
                                                                                    <TableCell align="right">
                                                                                        <Button
                                                                                            class="btn btn-danger"
                                                                                            // method="delete"
                                                                                            as="button"
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                onHandleDelete(
                                                                                                    item.id
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            Cancel
                                                                                        </Button>
                                                                                    </TableCell>
                                                                                </>
                                                                            )}
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell
                                                                                style={{
                                                                                    paddingBottom: 0,
                                                                                    paddingTop: 0,
                                                                                }}
                                                                                colSpan={
                                                                                    6
                                                                                }
                                                                            >
                                                                                <Collapse
                                                                                    in={
                                                                                        open
                                                                                    }
                                                                                    timeout="auto"
                                                                                    unmountOnExit
                                                                                    sx={{
                                                                                        paddingRight:
                                                                                            "0px",
                                                                                    }}
                                                                                >
                                                                                    <Box
                                                                                        sx={{
                                                                                            margin: 1,
                                                                                        }}
                                                                                    >
                                                                                        <Typography
                                                                                            variant="h6"
                                                                                            gutterBottom
                                                                                            component="div"
                                                                                        >
                                                                                            Danh
                                                                                            sách
                                                                                            khách
                                                                                            hàng
                                                                                            đăng
                                                                                            ký
                                                                                            tour
                                                                                        </Typography>
                                                                                        <Table
                                                                                            size="small"
                                                                                            aria-label="purchases"
                                                                                        >
                                                                                            <TableHead>
                                                                                                <TableRow>
                                                                                                    <TableCell>
                                                                                                        STT
                                                                                                    </TableCell>
                                                                                                    <TableCell>
                                                                                                        Họ
                                                                                                        và
                                                                                                        tên
                                                                                                    </TableCell>
                                                                                                    <TableCell>
                                                                                                        Số
                                                                                                        điện
                                                                                                        thoại
                                                                                                    </TableCell>
                                                                                                    <TableCell align="right">
                                                                                                        CCCD
                                                                                                    </TableCell>
                                                                                                    <TableCell align="right">
                                                                                                        Độ
                                                                                                        tuổi
                                                                                                    </TableCell>
                                                                                                </TableRow>
                                                                                            </TableHead>
                                                                                            <TableBody>
                                                                                                {item.guest.map(
                                                                                                    (
                                                                                                        item,
                                                                                                        index
                                                                                                    ) => (
                                                                                                        <TableRow>
                                                                                                            <TableCell
                                                                                                                component="th"
                                                                                                                scope="row"
                                                                                                            >
                                                                                                                {index +
                                                                                                                    1}
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                {
                                                                                                                    item.name
                                                                                                                }
                                                                                                            </TableCell>
                                                                                                            <TableCell>
                                                                                                                {
                                                                                                                    item.phone
                                                                                                                }
                                                                                                            </TableCell>
                                                                                                            <TableCell align="right">
                                                                                                                {
                                                                                                                    item.CMND
                                                                                                                }
                                                                                                            </TableCell>
                                                                                                            <TableCell align="right">
                                                                                                                {
                                                                                                                    item.age
                                                                                                                }
                                                                                                            </TableCell>
                                                                                                        </TableRow>
                                                                                                    )
                                                                                                )}
                                                                                            </TableBody>
                                                                                        </Table>
                                                                                    </Box>
                                                                                </Collapse>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    </TableBody>
                                                                )
                                                            )}
                                                        </Table>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div
                                        id="Reviews"
                                        className="search-available tabcontent"
                                    >
                                        <h6 className="heading-title">
                                            Reviews
                                        </h6>
                                        <div className="contact-detail">
                                            <div className="contact-item wrd">
                                                <table>
                                                    <tr>
                                                        <td scope="row">
                                                            Name:
                                                        </td>
                                                        <td>
                                                            {
                                                                customer.ten_khach_hang
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Email:
                                                        </td>
                                                        <td>
                                                            {customer.email}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Phone:
                                                        </td>
                                                        <td>
                                                            {
                                                                customer.so_dien_thoai
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            Citiez
                                                            identification
                                                        </td>
                                                        <td>
                                                            {
                                                                customer.citizen_identification_number
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Birth date:
                                                        </td>
                                                        <td>
                                                            {customer.ngay_sinh}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Address:
                                                        </td>
                                                        <td>
                                                            {customer.dia_chi}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td scope="row">
                                                            Count tour:
                                                        </td>
                                                        <td>
                                                            {
                                                                customer.tong_so_tour_da_di
                                                            }
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}
