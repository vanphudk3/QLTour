import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";


export default function Blog(props) {
    const blogs = usePage().props.blogs.data;

    const deleteBlog = (id) => {
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
                router.delete(`/auth/managerblog/${id}`, {
                    _method: "DELETE",
                });
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Blog</h2>}
        >
            <Head title="Blog" />
            
            <div className="w-100">
                <div className="ml-50 mr-50">
                <div class="flex justify-end m-2 p-2">
                        <Link
                            href={route("managerblog.create")}
                            class="btn btn-primary"
                        >
                            Create
                        </Link>
                    </div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {/* {!isEmpty(msg.success) && (
                          <Alert severity="success">
                              <AlertTitle>
                                {msg.success}
                              </AlertTitle>
                          </Alert>
                        )} */}
                        <table class="table table-striped shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Post by</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Date post</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog, index) => (
                                    <tr key={index}>
                                        <th scope="row">{blog.id}</th>
                                        <td>{blog.name}</td>
                                        <td>{blog.title}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:8000/storage/${blog.image}`}
                                                alt={blog.title}
                                                width="100"
                                            />
                                        </td>
                                        <td>{blog.created_at}</td>
                                        <td>
                                            <Link
                                                href={route(
                                                    "managerblog.edit",
                                                    blog.id
                                                )}
                                                class="btn btn-primary"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                class="btn btn-danger"
                                                onClick={() => {
                                                    deleteBlog(blog.id);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <Pagination
                                    links={usePage().props.blogs.links}
                                />
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}