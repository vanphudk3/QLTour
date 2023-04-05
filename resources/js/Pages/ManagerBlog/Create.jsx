import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import Validate from "validator/lib/isEmpty";
import { isEmpty } from "lodash";
import { Alert } from "@mui/material";

export default function Create(props) {
    const user = usePage().props;
    const user_id = user.auth.user.id;
    const blog = usePage().props.blog;
    const [slugs, setSlug] = useState("");

    const getSlug = (e) => {
        var a = document.getElementById("title").value;

        //   ho tro tieng viet
        var b = a.toLowerCase();
        b = b.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        b = b.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        b = b.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        b = b.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        b = b.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        b = b.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        b = b.replace(/đ/g, "d");
        // Xóa ký tự đặc biệt
        b = b.replace(/([^0-9a-z-\s])/g, "");
        // Xóa khoảng trắng thay bằng ký tự -
        b = b.replace(/(\s+)/g, "-");
        // xóa phần dự - ở đầu
        b = b.replace(/^-+/g, "");
        // xóa phần dư - ở cuối
        b = b.replace(/-+$/g, "");

        return (document.getElementById("slug").value = b);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        content: "",
        image: null,
        slug: "",
    });
    console.log(data);
    if (slugs != "") {
        data.slug = slugs;
    }

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
        if (event.target.name === "title") {
            setSlug(getSlug(event));
        }
        if (event.target.name === "image") {
            setData(event.target.name, event.target.files[0]);
        }
    };

    const [validationMsg, setValidationMsg] = useState({});
    const validateAll = () => {
        const msg = {};
        if (Validate(data.title)) {
            msg.title = "Title is required";
        }
        if (Validate(data.content)) {
            msg.content = "Content is required";
        }
        if (Validate(data.slug)) {
            msg.slug = "Slug is required";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) {
            return false;
        }
        return true;
    };

    const submit = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        post(route("managerblog.store"));
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Create</h2>}
        >
            <Head title="Create blog" />

            <div className="w-100 shadow">
                <div className="ml-50 mr-50 pd-25">
                    <form onSubmit={submit}>
                        {!isEmpty(blog.error) && (
                            <Alert
                                variant="outlined"
                                severity="error"
                                sx={{
                                    marginBottom: "1rem",
                                }}
                            >
                                {blog.error}
                            </Alert>
                        )}
                        <div className="mb-3">
                            <InputLabel forInput="title" value="Title blog*" />

                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                autoComplete="title"
                                handleChange={onHandleChange}
                            />
                            <InputError
                                message={errors.title || validationMsg.title}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel forInput="slug" value="Slug*" />

                            <TextInput
                                id="slug"
                                name="slug"
                                value={slugs}
                                className="mt-1 block w-full"
                                autoComplete="slug"
                                handleChange={onHandleChange}
                            />
                            <InputError
                                message={errors.slug || validationMsg.slug}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel forInput="image" value="Image*" />
                            <br />
                            <TextInput
                                id="image"
                                name="image"
                                type="file"
                                // value={data.image}
                                className="mt-1 block w-full"
                                autoComplete="image"
                                handleChange={onHandleChange}
                            />
                            <InputError
                                message={errors.image}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel forInput="content" value="Content*" />

                            <CKEditor
                                editor={ClassicEditor}
                                data={data.content}
                                name="content"
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setData("content", data);
                                }}
                            />
                            <InputError
                                message={
                                    errors.content || validationMsg.content
                                }
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton
                                className="ml-4"
                                processing={processing}
                            >
                                Create
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}
