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
    const question = usePage().props.question;

    const { data, setData, post, processing, errors, reset } = useForm({
        question: question.question || "",
        answer: question.answer || "",
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
        router.post(`/auth/question/${question.id}`, {
            _method: "PUT",
            question: data.question,
            answer: data.answer,
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
                        <div>
                            <InputLabel forInput="name" value="Question*" />

                            <Textarea
                                id="question"
                                name="question"
                                value={data.question}
                                className="mt-1 block w-full"
                                autoComplete="question"
                                isFocused={true}
                                handleChange={onHandleChange}
                                required
                            />

                            <InputError
                                message={errors.question}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 mb-3">
                            <InputLabel forInput="answer" value="Answer*" />

                            <Textarea
                                id="answer"
                                type="answer"
                                name="answer"
                                value={data.answer}
                                className="mt-1 block w-full"
                                autoComplete="answer"
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.answer}
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
