
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage, router } from "@inertiajs/react";

export default function Edit(props) {

    const user = usePage().props;
    const user_id = user.auth.user.id;

    const role = usePage().props.role;

    console.log(role.id);
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: user_id,
        name: role.name || "",
        description: role.description || "",
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
        router.post(`/auth/role/${role.id}`, {
            _method: 'PUT',
            user_id: data.user_id,
            name: data.name,
            description: data.description,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Edit</h2>}
        >
            <Head title="Edit" />

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
                            <InputLabel forInput="name" value="Name Role*" />

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

                            <TextInput
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
