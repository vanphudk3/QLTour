import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage,router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Schedule(props) {

    const user = usePage().props;
    const data_user = user.auth.user;

    const schedule = usePage().props.schedules.data;
    console.log(schedule);

    const deleteSchedule = (id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          router.delete(`/auth/schedule/${id}`, {
            _method: 'DELETE',
          });
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Schedule</h2>}
        >
            <Head title="Schedule" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="flex justify-end m-2 p-2">
                        {data_user.role == 'admin' && (
                        
                        <Link
                            href={route("schedule.create")}
                            class="btn btn-primary"
                        >
                            Create
                        </Link>
                        
                        )}
                        {data_user.role != 'admin' && (
                          <Link
                                href={route("schedule.create")}
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
                                    <th scope="col">Id tour</th>
                                    <th scope="col">Name tour</th>
                                    <th scope="col">Title tour</th>
                                    <th scope="col">Content tour</th>
                                    <th scope="col">Schedule tour</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map((item, index) => (
                                  <>
                                  <tr>
                                    <th>{item.ma_tour}</th>
                                    <td>{item.ten_tour}</td>
                                    <td>{item.tieu_de}</td>
                                    <td>{item.noi_dung}</td>
                                    <td>{item.lich_trinh_ngay}</td>
                                    <td>
                                      {data_user.role == 'admin' && (
                                        <><Link
                                      href={route("schedule.edit", item.id)}
                                      class="btn btn-primary"
                                    >
                                      Edit
                                    </Link><Link
                                      class="btn btn-danger"
                                      // method="delete"
                                      as="button"
                                      type="button"
                                      onClick={() => deleteSchedule(item.ma_tour)}
                                    >
                                        Delete
                                      </Link></>
                                      )}
                                      {data_user.role != 'admin' && (
                                        <><Link
                                        href={route("schedule.edit", item.id)}
                                        class="btn btn-primary disabled"
                                        aria-disabled="true"
                                      >
                                        Edit
                                      </Link><Link
                                        href={route("schedule.destroy", item.id)}
                                        class="btn btn-danger disabled"
                                        aria-disabled="true"
                                        method="delete"
                                        name="delete"
                                        as="button"
                                        type="button"
                                      >
                                          Delete
                                        </Link>
                                        
                                        </>
                                      )}
                                    </td>
                                </tr>
                                  </>  
                                ))}
                                <Pagination
                                    links={usePage().props.schedules.links}
                                />
                                {schedule.length == 0 && (
                                    <tr>
                                        <td colspan="6" class="text-center">No data</td>
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
