import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { usePage, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";

export default function Edit(props) {
    const schedule = usePage().props.schedule;
    console.log(schedule.lich_trinh_ngay);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: schedule.tieu_de || "",
        content: schedule.noi_dung || "",
        schedule: schedule.lich_trinh_ngay || "",
    });

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
        router.post(`/auth/schedule/${schedule.id}`, {
            _method: "PUT",
            title: data.title,
            content: data.content,
        });
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Edit schedule</h2>}
        >
            <Head title="Edit schedule" />

            <div className="w-100 shadow">
                <div className="ml-50 mr-50 pd-25">
                    <form onSubmit={submit}>
                        <div className="mt-4 mb-3">
                            <TextField
                                id="outlined-basic"
                                label="Title schedule"
                                variant="outlined"
                                sx={{ width: "100%" }}
                                name="title"
                                value={data.title}
                                onChange={onHandleChange}
                            />

                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <TextField
                                id="outlined-multiline-static"
                                label="Content schedule"
                                multiline
                                rows={5}
                                variant="outlined"
                                sx={{ width: "100%" }}
                                name="content"
                                value={data.content}
                                onChange={onHandleChange}
                            />

                            <InputError
                                message={errors.content}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4 mb-3 w-30">
                            <TextInput
                                id="schedule"
                                label="Schedule"
                                name="schedule"
                                type="date"
                                value={data.schedule}
                                disabled
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
