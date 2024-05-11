import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import BasicTooltip from "@/Components/Toolip";
import Fab from '@mui/material/Fab';
import BasicPagination from "@/Components/MuiPagination";
import Swal from "sweetalert2";
export default function ExtraService(props) {
    const user = props.auth.user;
    const data_user = user;
    const extraServices = usePage().props.extraServices;
    const get_search = usePage().props.search;
    const [search, setSearch] = useState(get_search);
    const [selectedIds, setSelectedIds] = useState([]);
    const deletes = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("extraService.destroy", id), {
                    preserveState: false,
                });
            }
        });
    }
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Extra Service</h2>}
        >
            <Head title="Extra Service" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="flex justify-end m-2 p-2">
                        {data_user.role == "admin" && (
                            <BasicTooltip title="Create" placement="top" arrow>
                            <Fab
                                color="primary"
                                aria-label="add"
                            >
                                <Link
                                    href={route("extraService.create")}
                                    style={{ color: "white" }}
                                >
                                <AddIcon />
                                </Link>
                            </Fab>
                        </BasicTooltip>
                        )}
                    </div>
                    <TextField id="standard-basic" label="Search" variant="standard" onChange={(e) => {
                                    setSearch(e.target.value);
                                    router.get(route('extraService.index'), {search: e.target.value}, {
                                        preserveState: true,
                                        replace: true,
                                        })
                                }} />
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="table table-striped shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Location</th>
                                    {/* <th scope="col">Description</th> */}
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {extraServices.data.map((extraService, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{extraService.name}</td>
                                        <td>{extraService.price}đ</td>
                                        <td>{extraService.location}</td>
                                        {/* <td>{extraService.description}</td> */}
                                        <td>
                                        {data_user.role == "admin" && (
                                                <>
                                                    <Link
                                                        href={route(
                                                            "extraService.edit",
                                                            extraService.id
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
                                                            deletes(
                                                                extraService.id
                                                            )
                                                        }
                                                    >
                                        <DeleteForeverIcon />
                                                    </Button>
                                                </>
                                            )}
                                            {/* <Link
                                                href={route(
                                                    "extraService.edit",
                                                    extraService.id
                                                )}
                                                class="btn btn-primary"
                                            >
                                                Edit
                                            </Link> */}
                                            {/* <Link
                                                href={route(
                                                    "extraService.show",
                                                    extraService.id
                                                )}
                                                class="btn btn-primary"
                                            >
                                                Show
                                            </Link> */}
                                            {/* <Link
                                            href={route("extraService.destroy", extraService.id)}
                                            class="btn btn-danger"
                                            method="delete"
                                            as="button"
                                            type="button"
                                          >
                                              Delete
                                            </Link> */}
                                        </td>
                                    </tr>
                                ))}
                                {extraServices.data.length == 0 && (
                                    <tr>
                                        <td colspan="5" class="text-center">
                                            No data
                                        </td>
                                    </tr>
                                )}
                                {(extraServices.data.length != 0) && (
                                <>
                                {/* <Pagination
                                    links={locations.links}
                                    meta={locations.meta}
                                /> */}
                                <BasicPagination
                                count={extraServices.last_page}
                                page={extraServices.current_page}
                                onChange={(event, value) => {
                                  // fetchSearch(event, value);
                                    router.get(`/auth/extra?page=${value}&search=${search}`);
                                    // router.get(
                                    //     `/auth/category?page=${value}`
                                    // );
                                }}
                            />
                                </>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
