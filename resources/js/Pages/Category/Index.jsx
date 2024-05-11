import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ModalPlayout from "@/Components/modalPlayout";
import AlertDialog from "@/Components/DialogPlayout";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import BasicTooltip from "@/Components/Toolip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Textarea from "@/Components/Bootstrap/Textarea";
import Swal from "sweetalert2";

import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

import BasicPagination from "@/Components/MuiPagination";
import { router } from "@inertiajs/react";
import { cutStrings } from "@/Components/cutString";
import Slide from "@mui/material/Slide";

import DragDrop from "@/Components/DragDrop";
import KanbanBoard from "@/Components/KanbanBoard";
import Task from "@/Components/Task";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 500,
//     height: 500,
//     bgcolor: "background.paper",
//     border: "2px solid #ccc",
//     boxShadow: 24,
//     p: 4,
//     background: "white",
//     // overflow: "scroll",
//     borderRadius: "10px",
// };

export default function Category(props) {
    const [completed, setCompleted] = React.useState([]);
    const [incompleted, setIncompleted] = React.useState([]);

    const { data, setData, post, progress, processing, errors, reset } =
        useForm({
            name: "",
            description: "",
        });

    const [open, setOpen] = React.useState(false);
    const handleOpen = (id, name, description, type) => () => {
        // truyền vào id và name vào modal
        setDataOneCategory({ id: id, name: name, description, type: type });

        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const [data_one_category, setDataOneCategory] = React.useState({
        id: "",
        name: "",
        description: "",
        type: "",
    });

    const resetForm = () => {
        resetEdit();
    };

    const user = props.auth.user;
    const data_user = user;

    const categories = usePage().props;
    const last_page = categories.categories.last_page;
    const current_page = categories.categories.current_page;
    const data_categorys = categories.categories.data;
    const arrLocation = usePage().props.arrLocation;
    const arrAllLocation = usePage().props.arrAllLocation;
    const dataLocationNotIn = usePage().props.locationsNotIn;
    const arr = [];
    const arrAll = [];
    const arrAllNotIn = [];

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClearSnackbar = () => setOpenSnackbar(false);

    const [messageSnackbar, setMessageSnackbar] = React.useState("");

    if (Array.isArray(arrLocation)) {
        arrLocation.map((item) => arr.push(item.ma_loai_tour));
    } else {
        for (const [key, value] of Object.entries(arrLocation)) {
            arr.push(value);
        }
    }

    const [openLocation, setOpenLocation] = React.useState(false);
    const [openDatalocation, setOpenDatalocation] = React.useState([]);
    const handleOpenLocation =
        (id = 0) =>
        () => {
            console.log("click");
            setOpenLocation(!openLocation);
            arrAll.map((item) => {
                if (item.ma_loai_tour == id) {
                    setOpenDatalocation(item);
                }
            });
        };

    if (Array.isArray(dataLocationNotIn)) {
        dataLocationNotIn.map((item) =>
            arrAllNotIn.push({
                content:item.ten,
                ma_loai_tour: item.ma_loai_tour,
                id: item.id,
            })
        );
    } else {
        for (const [key, value] of Object.entries(dataLocationNotIn)) {
            console.log(value);
            arrAllNotIn.push(value);
        }
    }

    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const handleToggle = () => {
        setOpenBackdrop(!openBackdrop);
        // clear array
        setTimeout(() => {
            setCompleted([]);
            setIncompleted([]);
        }, 100);
    };

    const handleCloseLocation = () => setOpenLocation(false);

    if (Array.isArray(arrAllLocation)) {
        arrAllLocation.map((item) =>
            item.map((item) =>
                arrAll.push({
                    content:item.ten,
                    ma_loai_tour: item.ma_loai_tour,
                    id: item.id,
                })
            )
        );
    } else {
        for (const [key, value] of Object.entries(arrAllLocation)) {
            arrAll.push(value);
        }
    }

    const [storeid, setStoreid] = React.useState(0);

    const handleOpenDrag = (result) => () => {
        setOpenBackdrop(!openBackdrop);
        arrAll.map((item) => {
            if (item.ma_loai_tour == result) {
                setCompleted((completed) => [...completed, item]);
            }
        });
        setIncompleted(arrAllNotIn);
        setStoreid(result);
    };

    const addLocation = async (id, task) => {
        try {
            await fetch(`/api/addLocation/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    _method: "PUT",
                    ma_loai_tour: task,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                    Accept: "application/json, text/plain, */*",
                },
            });
            setOpenSnackbar(!openSnackbar);
            setMessageSnackbar("Add location success");
            router.reload();
        } catch (err) {
            console.log(err);
        }
    };
    const removeLocation = async (id) => {
        try {
            await fetch(`/api/removeLocation/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    _method: "PUT",
                }),
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                    Accept: "application/json, text/plain, */*",
                },
            });
            setOpenSnackbar(!openSnackbar);
            setMessageSnackbar("Remove location success");
            router.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (source.droppableId == destination.droppableId) return;
        if (source.droppableId == 2) {
            setCompleted(removeItemById(draggableId, completed));
        } else {
            setIncompleted(removeItemById(draggableId, incompleted));
        }
        const task = findItemById(draggableId, [...incompleted, ...completed]);
        if (destination.droppableId == 2) {
            setCompleted([
                { ...task, completed: !task.completed },
                ...completed,
            ]);
            task.ma_loai_tour = storeid;
            addLocation(task.id, task.ma_loai_tour);
        } else {
            setIncompleted([
                { ...task, completed: !task.completed },
                ...incompleted,
            ]);
            removeLocation(task.id);
        }
    };

    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    const deleteCategory = (id) => {
        if (!arr.map((item) => item.ma_loai_tour).includes(id)) {
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
                    router.delete(`/auth/category/${id}`, {
                        _method: "DELETE",
                    });
                    Swal.fire(
                        "Deleted!",
                        "Your file has been deleted.",
                        "success"
                    );
                }
            });
        } else {
            Swal.fire("Error!", "This category is used in location.", "error");
        }
    };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );

        setDataOneCategory({
            ...data_one_category,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        if (data_one_category.type == "create") {
            // router.post(`/auth/category`, formProps);
            // clear error
            post(route("category.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                },
                onError: (errors) => {
                    if (
                        typeof errors.name != "undefined" &&
                        errors.name != ""
                    ) {
                        Swal.fire({
                            icon: "error",
                            position: "top-end",
                            title: errors.name,
                            showConfirmButton: false,
                            toast: true,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                },
            });
        }
        if (data_one_category.type == "edit") {
            router.post(
                `/auth/category/${data_one_category.id}`,
                {
                    _method: "PUT",
                    name: data_one_category.name,
                    description: data_one_category.description,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        reset();
                    },
                    onError: (errors) => {
                        if (
                            typeof errors.name != "undefined" &&
                            errors.name != ""
                        ) {
                            Swal.fire({
                                icon: "error",
                                position: "top-end",
                                title: errors.name,
                                showConfirmButton: false,
                                toast: true,
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                    },
                }
            );
        }
        setOpen(false);
    };
    const [dataImage, setDataImage] = React.useState([]);
    const handlechangeImg =(e)=>{
        const ArrayImage = [];
        for(let i = 0; i < e.target.files.length; i++){
            ArrayImage.push(e.target.files[i]);
        }
        setDataImage(ArrayImage);

    }

    const handleSubmitLocation = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        formProps._method = "PUT";
        formProps.images = dataImage;

        // router.post(`/auth/location`, formProps);
        console.log(formProps);

        // const data = await fetch(`/api/location`, {
        //     method: "POST",
        //     body: JSON.stringify(formProps),
        //     headers: {
        //         "Content-Type": "application/json",
        //         "X-CSRF-TOKEN": document
        //             .querySelector('meta[name="csrf-token"]')
        //             .getAttribute("content"),
        //         Accept: "application/json, text/plain, */*",
        //     },
        // });

        // const response = await data.json();

        // setOpenSnackbar(!openSnackbar);
        // setMessageSnackbar(response.message);
        // if (response.status == 200) {
        //     // reset();
        //     router.reload();
        //     handleCloseLocation();
        // }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Category</h2>}
        >
            <Head title="Category" />
            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="flex justify-end m-2 p-2">
                        {data_user.role == "admin" && (
                            // <Link
                            //     href={route("category.create")}
                            //     class="btn btn-primary"
                            // >
                            //     Create
                            // </Link>
                            <BasicTooltip title="Create" placement="top" arrow>
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    onClick={handleOpen("", "", "", "create")}
                                >
                                    <AddIcon />
                                </Fab>
                            </BasicTooltip>
                        )}
                        {data_user.role != "admin" && (
                            <Link
                                href={route("category.create")}
                                class="btn btn-primary disabled"
                                aria-disabled="true"
                            >
                                Create
                            </Link>
                        )}
                    </div>
                    <div class="relative shadow-md sm:rounded-lg">
                        <table class="table table-striped shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data_categorys.map((category) => (
                                    <tr>
                                        <th scope="row">{category.id}</th>
                                        {/* <td>{category.ten}</td> */}
                                        <td>
                                            <Button
                                                onClick={handleOpenDrag(
                                                    category.id
                                                )}
                                                sx={{
                                                    textTransform: "none",
                                                }}
                                            >
                                                {category.ten}
                                            </Button>
                                        </td>
                                        <td>
                                            {cutStrings(category.mo_ta, 50)}
                                        </td>
                                        <td>
                                            {data_user.role == "admin" && (
                                                <>
                                                    {/* 
                                                        bật modal
                                                    */}
                                                    {/* <Link
                                                        // href={route(
                                                        //     "category.edit",
                                                        //     category.id
                                                        // )}
                                                        class="btn btn-primary"
                                                        href="javascript:void(0)"
                                                        onClick={handleOpen}
                                                    >
                                                        Edit
                                                    </Link> */}
                                                    <BasicTooltip
                                                        title="View"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Button
                                                            onClick={handleOpen(
                                                                category.id,
                                                                category.ten,
                                                                category.mo_ta,
                                                                "view"
                                                            )}
                                                        >
                                                            {/* View */}
                                                            <i class="fa-regular fa-eye"></i>
                                                        </Button>
                                                    </BasicTooltip>
                                                    <BasicTooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Button
                                                            onClick={handleOpen(
                                                                category.id,
                                                                category.ten,
                                                                category.mo_ta,
                                                                "edit"
                                                            )}
                                                        >
                                                            {/* Edit */}
                                                            <i class="fa-regular fa-pen-to-square"></i>
                                                        </Button>
                                                    </BasicTooltip>

                                                    <BasicTooltip title="Delete">
                                                        <Button
                                                            onClick={() =>
                                                                deleteCategory(
                                                                    category.id
                                                                )
                                                            }
                                                        >
                                                            {/* Delete */}
                                                            <i class="fa-solid fa-trash"></i>
                                                        </Button>
                                                    </BasicTooltip>
                                                </>
                                            )}
                                            {data_user.role != "admin" && (
                                                <>
                                                    <Link
                                                        href={route(
                                                            "category.edit",
                                                            category.id
                                                        )}
                                                        class="btn btn-primary disabled"
                                                        aria-disabled="true"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "category.destroy",
                                                            category.id
                                                        )}
                                                        class="btn btn-danger disabled"
                                                        aria-disabled="true"
                                                        method="delete"
                                                        as="button"
                                                        type="button"
                                                    >
                                                        Delete
                                                    </Link>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {data_categorys.length === 0 && (
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div class="flex justify-end m-2 p-2">
                            <BasicPagination
                                count={last_page}
                                page={current_page}
                                onChange={(event, value) => {
                                    router.get(`/auth/category?page=${value}`);
                                    // router.get(
                                    //     `/auth/category?page=${value}`
                                    // );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <ModalPlayout
                open={open}
                handleClose={handleClose}
                title={data_one_category.name}
            >
                <h2>{data_one_category.name}</h2>
            </ModalPlayout> */}
            <AlertDialog
                open={open}
                handleClose={handleClose}
                title={
                    data_one_category.name ? data_one_category.name : "Create"
                }
                width="500px"
                height="400px"
                agree="Edit"
            >
                {data_one_category.type == "create" && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <DialogContentText>
                                        <div class="mb-3">
                                            <label for="" class="form-label">
                                                Name category{" "}
                                                <span class="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            {/* <TextField
                                                id="outlined-basic"
                                                label="Name caterogy"
                                                variant="outlined"
                                                sx={{ width: "100%" }}
                                                required
                                                name="name"
                                            /> */}
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                handleChange={onHandleChange}
                                                sx={{ width: "100%" }}
                                                required
                                            />

                                            {/* <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            /> */}
                                        </div>
                                        <div class="mb-3">
                                            <label for="" class="form-label">
                                                Description
                                            </label>
                                            {/* <TextField id="outlined-basic" label="Description" variant="outlined" sx={{width:"100%"}}/> */}
                                            {/* <textarea
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                placeholder="Description"
                                                name="description"
                                            ></textarea> */}
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={data.description}
                                                className="mt-1 block w-full"
                                                autoComplete="description"
                                                placeholder="Description"
                                                handleChange={onHandleChange}
                                            />

                                            {/* <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            /> */}
                                        </div>
                                    </DialogContentText>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                <Button type="submit" autoFocus>
                                    Create
                                </Button>
                            </DialogActions>
                        </form>
                    </>
                )}
                {data_one_category.type == "edit" && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <DialogContentText>
                                        <div class="mb-3">
                                            <label for="" class="form-label">
                                                Name category{" "}
                                                <span class="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            {/* <TextField
                                                id="outlined-basic"
                                                label="Name caterogy"
                                                variant="outlined"
                                                sx={{ width: "100%" }}
                                                required
                                                name="name"
                                            /> */}
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={data_one_category.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                handleChange={onHandleChange}
                                                sx={{ width: "100%" }}
                                                required
                                            />

                                            {/* <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            /> */}
                                        </div>
                                        <div class="mb-3">
                                            <label for="" class="form-label">
                                                Description
                                            </label>
                                            {/* <TextField id="outlined-basic" label="Description" variant="outlined" sx={{width:"100%"}}/> */}
                                            {/* <textarea
                                                class="form-control"
                                                id="exampleFormControlTextarea1"
                                                rows="3"
                                                placeholder="Description"
                                                name="description"
                                            ></textarea> */}
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={
                                                    data_one_category.description
                                                }
                                                className="mt-1 block w-full"
                                                autoComplete="description"
                                                placeholder="Description"
                                                handleChange={onHandleChange}
                                            />

                                            {/* <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            /> */}
                                        </div>
                                    </DialogContentText>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                                <Button type="submit" autoFocus>
                                    Edit
                                </Button>
                            </DialogActions>
                        </form>
                    </>
                )}
                {data_one_category.type == "view" && (
                    <>
                        <DialogContentText sx={{ padding: "20px" }}>
                            <b for="" class="form-label">
                                Mô tả
                            </b>
                            <div class="mb-3">
                                {data_one_category.description
                                    ? data_one_category.description
                                    : "(Chưa có mô tả)"}
                            </div>
                            <b for="" class="form-label">
                                Địa điểm trong loại tour
                            </b>
                            <div class="mb-3">
                                {arrAll.map(
                                    (item) =>
                                        item.ma_loai_tour ==
                                            data_one_category.id && (
                                            <li>{item.content}</li>
                                        )
                                )}
                            </div>
                        </DialogContentText>
                    </>
                )}
            </AlertDialog>
            <AlertDialog
                open={openBackdrop}
                fullScreen={true}
                TransitionComponent={Transition}
                handleClose={handleToggle}
                title="Choose location"
                width="800px"
                height="600px"
                agree="Edit"
            >
                <DialogContentText sx={{ padding: "20px" }}>
                    <KanbanBoard onDragEnd={handleDragEnd}>
                        <DragDrop
                            title="Location"
                            tasks={incompleted}
                            id="1"
                            // createTask={handleOpenLocation()}
                        />
                        <DragDrop title="Categogy" tasks={completed} id="2" />
                    </KanbanBoard>
                </DialogContentText>
            </AlertDialog>
            <AlertDialog
                open={openLocation}
                handleClose={handleCloseLocation}
                title="Add location"
                width="700px"
                height="700px"
                agree="Edit"
            >
                <form onSubmit={handleSubmitLocation} enctype="multipart/form-data">
                <DialogContent>
                <DialogContentText sx={{ padding: "20px" }}>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid item xs={6}>
                            <b for="" class="form-label">
                                Tên địa điểm <span class="text-danger">*</span>
                            </b>
                            <div class="mb-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Tên địa điểm"
                                    name="name"
                                    value={openDatalocation.ten}
                                    required
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <b for="" class="form-label">
                                Danh mục
                            </b>
                            <div class="mb-3">
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    name="category"
                                    value={openDatalocation.ma_loai_tour}
                                >
                                    <option value="" selected>
                                        Chọn danh mục
                                        </option>
                                    {arrAllLocation.map((item) =>
                                        item.map((item) => (
                                            <option value={item.ma_loai_tour}>
                                                {item.ten}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <b for="" class="form-label">
                                Địa chỉ
                            </b>
                            <div class="mb-3">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Địa chỉ"
                                    name="address"
                                    value={openDatalocation.dia_chi}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <b for="" class="form-label">
                                Mô tả
                            </b>
                            <div class="mb-3">
                                <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="Mô tả"
                                    name="description"
                                    value={openDatalocation.mo_ta}
                                ></textarea>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <b for="" class="form-label">
                                Dữ liệu bản đồ
                            </b>
                            <div class="mb-3">
                                <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="Dữ liệu bản đồ"
                                    name="map"
                                    value={openDatalocation.du_lieu_ban_do}
                                ></textarea>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <b for="" class="form-label">
                                Ảnh
                            </b>
                            <div class="mb-3">
                                <input
                                    class="form-control"
                                    type="file"
                                    id="formFile"
                                    name="image"
                                    value={openDatalocation.hinh_anh}
                                    multiple
                                    onChange={handlechangeImg}
                                />
                                {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit" autoFocus>
                        Create
                    </Button>
                </DialogActions>
                </form>
            </AlertDialog>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClearSnackbar}
                message={messageSnackbar}
                action={
                    <React.Fragment>
                        <Button
                            color="secondary"
                            size="small"
                            onClick={handleClearSnackbar}
                        >
                            UNDO
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClearSnackbar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Authenticated>
    );
}
