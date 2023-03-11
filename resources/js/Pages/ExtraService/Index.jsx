import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";

export default function ExtraService(props) {
    const user = props.auth.user;
    const data_user = user;

    const extraServices = usePage().props.extraServices;

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
                            <Link
                                href={route("extraService.create")}
                                class="btn btn-primary"
                            >
                                Create
                            </Link>
                        )}
                        {data_user.role != "admin" && (
                            <Link
                                href={route("extraService.create")}
                                class="btn btn-primary disabled"
                                aria-disabled="true"
                            >
                                Create
                            </Link>
                        )}
                    </div>
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
                                {extraServices.map((extraService, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{extraService.name}</td>
                                        <td>{extraService.price}đ</td>
                                        <td>{extraService.location}</td>
                                        {/* <td>{extraService.description}</td> */}
                                        <td>
                                            <Link
                                                href={route(
                                                    "extraService.edit",
                                                    extraService.id
                                                )}
                                                class="btn btn-primary"
                                            >
                                                Edit
                                            </Link>
                                            {/* <Link
                                                href={route(
                                                    "extraService.show",
                                                    extraService.id
                                                )}
                                                class="btn btn-primary"
                                            >
                                                Show
                                            </Link> */}
                                            <Link
                                            href={route("extraService.destroy", extraService.id)}
                                            class="btn btn-danger"
                                            method="delete"
                                            as="button"
                                            type="button"
                                          >
                                              Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {extraServices.length == 0 && (
                                    <tr>
                                        <td colspan="3" class="text-center">
                                            No data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
