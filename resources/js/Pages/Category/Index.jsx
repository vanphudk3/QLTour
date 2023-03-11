import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";

export default function Category(props) {

    const user = props.auth.user;
    const data_user = user;

    const categories = usePage().props;
    const data_categorys = categories.categories;
    console.log(data_categorys);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Category</h2>}
        >
            <Head title="Category" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="flex justify-end m-2 p-2">
                        {data_user.role == 'admin' && (
                        
                        <Link
                            href={route("category.create")}
                            class="btn btn-primary"
                        >
                            Create
                        </Link>
                        )}
                        {data_user.role != 'admin' && (
                          <Link
                                href={route("category.create")}
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
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data_categorys.map((category) => (
                                    <tr>
                                        <th scope="row">{category.id}</th>
                                        <td>{category.ten}</td>
                                        <td>{category.mo_ta}</td>
                                        <td>
                                          {data_user.role == 'admin' && (
                                            <><Link
                                          href={route("category.edit", category.id)}
                                          class="btn btn-primary"
                                        >
                                          Edit
                                        </Link><Link
                                          href={route("category.destroy", category.id)}
                                          class="btn btn-danger"
                                          method="delete"
                                          as="button"
                                          type="button"
                                        >
                                            Delete
                                          </Link></>
                                          )}
                                          {data_user.role != 'admin' && (
                                            <><Link
                                            href={route("category.edit", category.id)}
                                            class="btn btn-primary disabled"
                                            aria-disabled="true"
                                          >
                                            Edit
                                          </Link><Link
                                            href={route("category.destroy", category.id)}
                                            class="btn btn-danger disabled"
                                            aria-disabled="true"
                                            method="delete"
                                            as="button"
                                            type="button"
                                          >
                                              Delete
                                            </Link></>
                                          )}
                                        </td>
                                    </tr>
                                ))}
                                {data_categorys.length === 0 && (
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
