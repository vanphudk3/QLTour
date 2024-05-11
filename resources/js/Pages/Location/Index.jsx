import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Select from "@/Components/Bootstrap/Select";
import PrimaryButton from "@/Components/PrimaryButton";
import BasicPagination from "@/Components/MuiPagination";
import Swal from "sweetalert2";
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import BasicTooltip from "@/Components/Toolip";
import Fab from '@mui/material/Fab';


export default function Category(props) {
    const user = props.auth.user;
    const data_user = user;
    const get_search = usePage().props.search;

    const locations = usePage().props.locations;
    const datas = locations.data;
    const categories = usePage().props.categories;
    const category = usePage().props.category;
    const arrTour = usePage().props.arrTour;
    const [search, setSearch] = useState(get_search);
    const [selectedIds, setSelectedIds] = useState([]);

    const { data, setData, post, progress, processing, errors, reset } = useForm({
        category: category || "",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value,
            router.get(route('location.index'), {category: event.target.value, search: search}, {
                preserveState: true,
                replace: true,
                })
        );
    };
    const deleteLocation = (id) => {
        if (!arrTour.map((item) => item.ma_dia_diem).includes(id)) {
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
                    router.delete(`/auth/location/${id}`, {
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
            Swal.fire("Error!", "This location is being used in a tour", "error");
        }
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Location</h2>}
        >
            <Head title="Location" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="flex justify-end m-2 p-2">
                        {data_user.role == "admin" && (
                            // <Link
                            //     href={route("location.create")}
                            //     class="btn btn-primary"
                            // >
                            //     Create
                            // </Link>
                            <BasicTooltip title="Create" placement="top" arrow>
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                >
                                    <Link
                                        href={route("location.create")}
                                        style={{ color: "white" }}
                                    >
                                    <AddIcon />
                                    </Link>
                                </Fab>
                            </BasicTooltip>
                        )}
                    </div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex justify-between w-50">
                            <form className="display-contents">
                                <TextField id="standard-basic" label="Search" variant="standard" onChange={(e) => {
                                    setSearch(e.target.value);
                                    router.get(route('location.index'), {category: data.category, search: e.target.value}, {
                                        preserveState: true,
                                        replace: true,
                                        })
                                }} />
                                <div className="w-48 mb-3">
                                    <Select
                                        id="category"
                                        name="category"
                                        label="Category"
                                        value={data.category}
                                        handleChange={onHandleChange}
                                    >
                                        <option value="0">All</option>
                                        {categories.map((category) => (
                                            <option value={category.id}
                                            >
                                                {category.ten}
                                            </option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="w-48 mb-3">
                                </div>
                            </form>
                        </div>
                        <table class="table table-striped shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    {/* <th scope="col">Description</th> */}
                                    <th scope="col">Address</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((location, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{location.ten}</td>
                                        {/* <td>{location.mo_ta}</td> */}
                                        <td>{location.dia_chi}</td>
                                        {(location.du_lieu_map != null && location.du_lieu_map != "") ? (
                                            <td>Active</td>
                                        ) : (
                                            <td>Missing map data</td>
                                        )}
                                        <td>
                                            {data_user.role == "admin" && (
                                                <>
                                                    <Link
                                                        href={route(
                                                            "location.edit",
                                                            location.id
                                                        )}
                                                        variant="text"
                                                        color="primary"
                                                    >
                                        <EditIcon />
                                                        
                                                    </Link>
                                                    <Button
                                                        variant="text"
                                                        color="error"
                                                        onClick={() =>
                                                            deleteLocation(
                                                                location.id
                                                            )
                                                        }
                                                    >
                                        <DeleteForeverIcon />
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div class="flex justify-left">
                            {(data.length == 0) && (
                                <div class="flex justify-center">
                                    <h3 class="text-gray-500">
                                        No data available
                                    </h3>
                                </div>
                            )}
                            {(data.length != 0) && (
                                <>
                                {/* <Pagination
                                    links={locations.links}
                                    meta={locations.meta}
                                /> */}
                                <BasicPagination
                                count={locations.last_page}
                                page={locations.current_page}
                                onChange={(event, value) => {
                                  // fetchSearch(event, value);
                                    router.get(`/auth/location?page=${value}&search=${search}`);
                                    // router.get(
                                    //     `/auth/category?page=${value}`
                                    // );
                                }}
                            />
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
