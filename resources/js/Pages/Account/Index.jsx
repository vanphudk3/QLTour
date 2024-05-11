import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Link, usePage, useForm } from "@inertiajs/react";
import { isEmpty } from "lodash";
import Switch from '@mui/material/Switch';
import React from 'react';
import BasicPagination from "@/Components/MuiPagination";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Account(props) {

    const users = usePage().props;
    const datas = users.users;
    const role = usePage().props;
    const data_role = role.roles;
    const [data, setData] = React.useState(datas);
    const OnHandleChange = (id, status) => (event) => {
        const status = event.target.checked ? 1 : 0;
        // axios.post(route('account.status', id), { status: status });
        console.log(id, status);
        // const fetchData = async () => {
        //     const response = await fetch(`/api/account/change/${id}`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        //         },
        //         body: JSON.stringify({ status: status }),
        //     });

        //     const data = await response.json();
        //     setData(data);
        //     // console.log(data);
        // }

        router.put(`/auth/account/${id}`, {
            _method: "PUT",
            trang_thai: status,
        });
    }

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
                                    <th scope="col">Status</th>
                                    {/* <th scope="col">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((users) => (
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
                                        <td>
                                        <Switch {...label} defaultChecked={users.status == 1 ? true : false} onClick={OnHandleChange(users.id, users.status)} />
                                            </td>
                                        { users.role != 'admin' && props.auth.user.role == 'admin' && (
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
                                        )}
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
                        <BasicPagination
                            count={users.last_page}
                            page={users.current_page}
                            onChange={(event, value) => {
                                // fetchSearch(event, value);
                                // router.get(
                                //     `/auth/account?page=${value}&search=${search}`
                                // );
                                // router.get(
                                //     `/auth/category?page=${value}`
                                // );
                            }}
                        />
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
