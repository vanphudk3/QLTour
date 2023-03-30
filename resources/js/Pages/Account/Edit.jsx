import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Link, usePage, useForm } from "@inertiajs/react";
import {
    Autocomplete,
    Box,
    FormControl,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

export default function Edit(props) {
    const roles = usePage().props.roles;
    const account = usePage().props.account;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: account.name || "",
        email: account.email || "",
        phone: account.phone || "",
        address: account.address || "",
        role_id: account.role || "",
    });

    console.log(account);

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
        router.post(`/auth/account/${account.id}`, {
            _method: "PUT",
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            district: data.district,
            ward: data.ward,
            role_id: data.role_id,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Edit</h2>}
        >
            <Head title="Edit Account" />

            <div className="flex justify-content-center w-100">
                <div className="flex justify-content-center ml-50 mr-50 pd-25 w-50 shadow">
                    <form onSubmit={submit} className="w-100">
                        {/* <TextInput
                                id="user_id"
                                type="hidden"
                                name="user_id"
                                value={data.user_id}
                                className="mt-1 block w-full"
                                autoComplete="user_id"
                                handleChange={onHandleChange}
                            /> */}

                        <div className="">
                            {/* <InputLabel forInput="name" value="Name Role*" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                handleChange={onHandleChange}
                                required
                            /> */}
                            <TextField
                                id="name"
                                name="name"
                                label="Name (Read Only)"
                                value={data.name}
                                className="mt-1 block w-full w-100"
                                autoComplete="name"
                                isFocused={true}
                                onChange={onHandleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <TextField
                                id="email"
                                name="email"
                                label="Email (Read Only)"
                                value={data.email}
                                className="mt-1 block w-full w-100"
                                autoComplete="email"
                                isFocused={true}
                                onChange={onHandleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <TextField
                                id="phone"
                                name="phone"
                                label="Phone (Read Only)"
                                value={data.phone}
                                className="mt-1 block w-full w-100"
                                autoComplete="phone"
                                isFocused={true}
                                onChange={onHandleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <TextField
                                id="address"
                                name="address"
                                label="Address (Read Only)"
                                value={data.address}
                                className="mt-1 block w-full w-100"
                                autoComplete="address"
                                isFocused={true}
                                onChange={onHandleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <InputError
                                message={errors.address}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <Box>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Roles
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="role_id"
                                        value={data.role_id}
                                        label="Roles"
                                        onChange={onHandleChange}
                                    >
                                        {roles.map((role) => (
                                        <MenuItem value={role.id}>{role.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
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
