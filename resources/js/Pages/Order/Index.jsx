import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";
import { Alert, AlertTitle, Chip } from "@mui/material";
import { isEmpty, set } from "lodash";
import Swal from "sweetalert2";
import { useState } from "react";
const numberFormat = (value) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
};

const Trancate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export default function Order(props) {
    const user = usePage().props;
    const data_user = user.auth.user;
    const orders = usePage().props.orders.data;
    const error = usePage().props.error;
    const [msgerror, setMsgerror] = useState("");
    const msg = usePage().props.msgorder;
    const deleteOrder = (id) => {
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
                router.delete(`/auth/order/${id}`, {
                    _method: "DELETE",
                });
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    const handleClick = (id) => (e) => {
        e.preventDefault();
        const value = e.target.getAttribute("data-value");
        console.log(value);
        router.put(`/auth/order/${id}`, {
            _method: "PUT",
            trang_thai: value,
        });

        // if (error) {
            
        //     Swal.fire({
        //         icon: "error",
        //         title: error,
        //         showConfirmButton: false,
        //         timer: 1500,
        //         toast: true,
        //         position: "top-right",
        //     });
        //     setMsgerror("");
        // }
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Order</h2>}
        >
            <Head title="Order" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {!isEmpty(msg.success) && (
                          <Alert severity="success">
                              <AlertTitle>
                                {msg.success}
                              </AlertTitle>
                          </Alert>
                        )}
                        <table class="table table-striped shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Created at</th>
                                    {data_user.role === "admin" && (
                                        <th scope="col">Action</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr>
                                        <th scope="row">{order.id}</th>
                                        <td>{order.ten_nguoi_dat}</td>
                                        <td>{order.email}</td>
                                        <td>{order.so_dien_thoai}</td>
                                        <td>{Trancate(order.dia_chi, 30)}</td>
                                        <td>{numberFormat(order.tong_tien)}</td>
                                        {/* <td>
                                            <Chip
                                                label={order.trang_thai}
                                                // onClick={handleClick}
                                            />
                                        </td> */}
<td>
    {order.trang_thai === "Complete" ? (
        <Chip
            label={order.trang_thai}
            // onClick={handleClick}
        />
    ) : (
    <div class="btn-group">
  <button class="btn btn-secondary btn-sm dropdown-toggle "  type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={order.trang_thai === "Complete"}>
    {order.trang_thai}
  </button>
  <ul class="dropdown-menu">
    {/* <li><a class="dropdown-item" href="#" onClick={handleClick(order.id)} data-value="1">Pending</a></li> */}
    <li><a class="dropdown-item" href="#" onClick={handleClick(order.id)} data-value="2">Success</a></li>
    <li><a class="dropdown-item" href="#" onClick={handleClick(order.id)} data-value="0">Cancel</a></li>
  </ul>
</div>
    )}
                                            </td>
                                        <td>{order.created_at}</td>
                                        <td>
                                            {(data_user.role === "admin" || data_user.role === "manager") && (
                                                <>
                                                    <Link
                                                        href={route(
                                                            "order.show",
                                                            order.id
                                                        )}
                                                        class="btn btn-primary"
                                                    >
                                                        Detail
                                                    </Link>
                                                    {order.trang_thai !== "Complete" && (
                                                    <Link
                                                        class="btn btn-danger"
                                                        // method="delete"
                                                        as="button"
                                                        type="button"
                                                        onClick={() =>
                                                            deleteOrder(
                                                                order.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Link>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                <Pagination
                                    links={usePage().props.orders.links}
                                />
                                {orders.length === 0 && (
                                    <tr>
                                        <td colspan="9" class="text-center">
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
