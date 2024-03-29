import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Tour(props) {
    const user = props.auth.user;
    const tours = usePage().props.tours.data;
    // console.log(tours);

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
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
                                    <th scope="col">Amount People</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tours.map((tour) => (
                                    <tr>
                                        <th scope="row">{tour.id}</th>
                                        <td>{tour.ky_hieu}</td>
                                        <td>{tour.ten_tour}</td>
                                        <td>{tour.transpost}</td>
                                        <td>{tour.do_tuoi_tu}</td>
                                        <td>{tour.so_cho}</td>
                                        <td>{tour.ngay_khoi_hanh}</td>
                                        <td>
                                            {user.role == "admin" && (
                                                <>
                                                    <Link
                                                        href={route(
                                                            "managerTour.edit",
                                                            tour.id
                                                        )}
                                                        class="btn btn-primary"
                                                    >
                                                        Edit
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
                                <Pagination
                                    links={usePage().props.tours.links}
                                />
                                {tours.length === 0 && (
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
        </AuthenticatedLayout>
    );
}
