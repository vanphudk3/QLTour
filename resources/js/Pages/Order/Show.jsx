import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button } from "@mui/material";

const numberFormat = (value) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);
};

export default function Show(props) {
    const order = usePage().props.order;
    console.log(order);


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Detail order</h2>}
        >
            <Head title="Detail order" />

            <div className="w-100">
                <div className="ml-50 mr-50 flex justify-content-center">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-80">
                        <div className="row">
                            <div className="col shadow">
                                <h5>Contact Details</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Name:</td>
                                            <td className="pd-l-25">
                                                {order.ten_nguoi_dat}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td className="pd-l-25">
                                                {order.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Phone:</td>
                                            <td className="pd-l-25">
                                                {order.so_dien_thoai}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td className="pd-l-25">
                                                {order.dia_chi}
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                            <div className="col shadow">
                                <h5>Tour Details</h5>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Name:</td>
                                            <td className="pd-l-25">
                                                {order.tour.ten_tour}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Code:</td>
                                            <td className="pd-l-25">
                                                {order.tour.ky_hieu}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date depart:</td>
                                            <td className="pd-l-25">
                                                {order.ngay_khoi_hanh}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Time depart:</td>
                                            <td className="pd-l-25">
                                                {order.gio_khoi_hanh}
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className="row shadow"
                            style={{ marginTop: "25px" }}
                        >
                            <h5>Traveller Details</h5>
                            <div className="contact-traveller">
                                {order.travellers.map((traveller, index) => (
                                    <div className="contact-item">
                                        <label className="booking_form">
                                            Traveller {index + 1}
                                        </label>
                                        <table>
                                            <tr>
                                                <td>First and Last Name:</td>
                                                <td>{traveller.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Citizen Identification:</td>
                                                <td>{traveller.CMND}</td>
                                            </tr>
                                            <tr>
                                                <td>Age:</td>
                                                <td>{traveller.age}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone:</td>
                                                <td>{traveller.phone}</td>
                                            </tr>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            className="row shadow"
                            style={{ marginTop: "25px" }}
                        >
                            <div className="flex justify-content-between">
                                <h5>Total Price:</h5>
                                <h5 className="cl-primary">
                                    {numberFormat(order.tong_tien)}
                                </h5>
                            </div>
                        </div>
                        {/* {order.trang_thai === "1" && (
                        <div
                            className="row shadow"
                            style={{ marginTop: "25px" }}
                        >
                            <Link
                                href={route("order.browse", order.id)}
                                class="btn btn-primary"
                            >
                                Browse
                            </Link>
                        </div>
                        )} */}
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
