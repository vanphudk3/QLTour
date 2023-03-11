import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage, router } from "@inertiajs/react";
import Textarea from "@/Components/Bootstrap/Textarea";

export default function Edit(props) {


    const category = usePage().props.category;

    console.log(category);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: category.ten || "",
        description: category.mo_ta || "",
    });

    console.log(data);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(`/auth/category/${category.id}`, {
            _method: 'PUT',
            name: data.name,
            description: data.description,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Edit category</h2>}
        >
            <Head title="Edit category" />

            <div className="w-100 shadow">
                <div className="ml-50 mr-50 pd-25">
                    <form onSubmit={submit}>
                            <TextInput
                                id="user_id"
                                type="hidden"
                                name="user_id"
                                value={data.user_id}
                                className="mt-1 block w-full"
                                autoComplete="user_id"
                                handleChange={onHandleChange}
                            />

                        <div>
                            <InputLabel forInput="name" value="Name Category*" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                handleChange={onHandleChange}
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <InputLabel
                                forInput="description"
                                value="Description"
                            />

                            <Textarea
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="description"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <PrimaryButton className="ml-4" processing={processing}>
                            Create
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
