import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, usePage } from "@inertiajs/react";

export default function Question(props) {

    const user = usePage().props;
    const data_user = user.auth.user;

    const questions = usePage().props.questions;

    console.log(data_user);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Question</h2>}
        >
            <Head title="Question" />

            <div className="w-100">
                <div className="ml-50 mr-50">
                    <div class="flex justify-end m-2 p-2">
                        {data_user.role == 'admin' && (
                        
                        <Link
                            href={route("question.create")}
                            class="btn btn-primary"
                        >
                            Create
                        </Link>
                        )}
                        {data_user.role != 'admin' && (
                          <Link
                                href={route("question.create")}
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
                                    <th scope="col">Question</th>
                                    <th scope="col">Answer</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question) => (
                                <tr>
                                    <th scope="row">{question.id}</th>
                                    <td>{question.question}</td>
                                    <td>{question.answer}</td>
                                    {/* <td>{question.answer.length != "" ? 'True' : 'False'}</td> */}
                                    <td>
                                      {data_user.role == 'admin' && (
                                        <><Link
                                      href={route("question.edit", question.id)}
                                      class="btn btn-primary"
                                    >
                                      Edit
                                    </Link><Link
                                      href={route("question.destroy", question.id)}
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
                                        href={route("question.edit", question.id)}
                                        class="btn btn-primary disabled"
                                        aria-disabled="true"
                                      >
                                        Edit
                                      </Link><Link
                                        href={route("question.destroy", question.id)}
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
                            {questions.length === 0 && (
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
