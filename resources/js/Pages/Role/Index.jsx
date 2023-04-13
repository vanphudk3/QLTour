import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";

export default function Role(props) {
    const roles = usePage().props;
    const data = roles.roles.data;

    const user = usePage().props;
    const data_user = user.auth.user;

    console.log(data_user);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Role</h2>}
        >
            <Head title="Dashboard" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="flex justify-end m-2 p-2">
                        {data_user.role == "admin" && (
                            <Link
                                href={route("role.create")}
                                class="btn btn-primary"
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
                                    <th scope="col">Description</th>
                                    {data_user.role !== "admin" && (
                                        <th scope="col">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((role) => (
                                    <tr>
                                        <th scope="row">{role.id}</th>
                                        <td>{role.name}</td>
                                        <td>{role.description}</td>
                                        {data_user.role == "admin" && (
                                            <td>
                                                <>
                                                    <Link
                                                        href={route(
                                                            "role.edit",
                                                            role.id
                                                        )}
                                                        class="btn btn-primary"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={route(
                                                            "role.destroy",
                                                            role.id
                                                        )}
                                                        class="btn btn-danger"
                                                        method="delete"
                                                        as="button"
                                                        type="button"
                                                    >
                                                        Delete
                                                    </Link>
                                                </>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                                {data.length === 0 && (
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            No data found
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
