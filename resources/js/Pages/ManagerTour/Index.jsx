import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import BasicPagination from "@/Components/MuiPagination";
export default function Tour(props) {
    const user = props.auth.user;
    const tours = usePage().props.tours.data;
    const error = usePage().props.error;
    // console.log(error);

    const deleteTour = (id) => {
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
                router.delete(`/auth/managerTour/${id}`, {
                    _method: "DELETE",
                });
                if (error) {
                    Swal.fire({
                        icon: "error",
                        title: error,
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    return;
                } else {
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                }
            }
        });
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">List Tours</h2>}
        >
            <Head title="List Tours" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="flex justify-end m-2 p-2">
                        {user.role == "admin" && (
                            <Link
                                href={route("managerTour.create")}
                                class="btn btn-primary"
                            >
                                Create
                            </Link>
                        )}
                        {user.role != "admin" && (
                            <Link
                                href={route("managerTour.create")}
                                class="btn btn-primary disabled"
                                aria-disabled="true"
                                type="hidden"
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
                                    <th scope="col">Code</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Tranport</th>
                                    <th scope="col">Age from</th>
                                    <th scope="col">Seat</th>
                                    <th scope="col">Amount Date</th>
                                    <th scope="col">Schedule</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tours.map((tour) => (
                                    <tr>
                                        <th scope="row" style={{width: "5%"}}>{tour.id}</th>
                                        <td><Link href={route("managerTour.edit", tour.id)} className="text-blue-500" style={{textDecoration: "none"}}>{tour.ky_hieu}</Link></td>
                                        <td>{tour.ten_tour}</td>
                                        <td>{tour.transpost}</td>
                                        <td>{tour.do_tuoi_tu}</td>
                                        <td>{tour.so_cho}</td>
                                        <td>{tour.so_ngay}</td>
                                        <td>{tour.co_lich_trinh == 1 ? "updated" : "not updated"}</td>
                                        <td>
                                            {user.role == "admin" && (
                                                <>
                                                    <Link
                                                        href={
                                                            route("schedule.create", {
                                                                idTour: tour.id,
                                                            })
                                                        }
                                                        class="btn btn-primary"
                                                    >
                                                        Edit schedule
                                                    </Link>
                                                    <Link
                                                        // href={route(
                                                        //     "managerTour.destroy",
                                                        //     tour.id
                                                        // )}
                                                        class="btn btn-danger"
                                                        // method="delete"
                                                        as="button"
                                                        type="button"
                                                        onClick={() =>
                                                            deleteTour(tour.id)
                                                        }
                                                    >
                                                        Delete
                                                    </Link>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                
                            {/* <div class="flex justify-end m-2 p-2">
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
                        </div> */}
                                {tours.length === 0 && (
                                    <tr>
                                        <td colspan="4" class="text-center">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination
                                    links={usePage().props.tours.links}
                                />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
