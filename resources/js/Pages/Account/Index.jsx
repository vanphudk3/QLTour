import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage, useForm } from "@inertiajs/react";
import { isEmpty } from "lodash";

export default function Account(props) {

    const users = usePage().props;
    const datas = users.users;
    const role = usePage().props;
    const data_role = role.roles;


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Account</h2>}
        >
            <Head title="Account" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="table table-striped shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Role</th>
                                    {/* <th scope="col">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {datas.map((users) => (
                                    <tr>
                                        <th scope="row">{users.id}</th>
                                        <td>{users.name}</td>
                                        <td>{users.email}</td>
                                        {users.phone == null && (
                                        <td>
                                            Null
                                        </td>
                                        )}
                                        {users.phone != null && (
                                        <td>
                                            {users.phone}
                                        </td>
                                        )}
                                        {users.address == null && (
                                        <td>
                                            Null
                                        </td>
                                        )}
                                        {users.address != null && (
                                        <td>{users.address}</td>
                                        )}
                                        {!isEmpty(users.role) ? (
                                        <td>
                                            {users.role}
                                        </td>
                                        )
                                        : (
                                        <td>
                                           Null
                                        </td>
                                        )}
                                        { users.role != 'admin' && props.auth.user.role == 'admin' ? (
                                            <td>
                                                <Link
                                                    href={route("account.edit", users.id)}
                                                    class="btn btn-primary"
                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    href={route("account.destroy", users.id)}
                                                    class="btn btn-danger"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        ) : (
                                            <td>
                                                <Link
                                                    href={route("account.edit", users.id)}
                                                    class="btn btn-primary disabled"

                                                >
                                                    Edit
                                                </Link>

                                                <Link
                                                    href={route("account.destroy", users.id)}
                                                    class="btn btn-danger disabled"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        )
                                        }
                                    </tr>
                                ))}
                                {datas.length === 0 && (
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
