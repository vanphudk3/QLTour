import { Head, Link, usePage, useForm } from "@inertiajs/react";
import Content from "@/Layouts/Tour";
import {
    Alert,
    Breadcrumbs,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Snackbar,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { isEmpty } from "lodash";
import Validate from "validator/lib/isEmpty";
import InputError from "@/Components/InputError";
import { useState } from "react";
import Notification from "@/Components/Notification";

const breadcrumbs = [
    <Link
        underline="hover"
        key="1"
        color="inherit"
        href={route("welcome")}
        style={{ textDecoration: "none", color: "white" }}
    >
        Home
    </Link>,
    <Typography key="2" color="text.primary" style={{ color: "white" }}>
        Login
    </Typography>,
];

export default function LoginMember(props) {
    const login = usePage().props.login;
    const redirect = usePage().props.redirect;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
        redirect: redirect,
    });

    console.log(data);

    const onHandleChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };
    const [validationMsg, setValidationMsg] = useState({});

    const validateAll = () => {
        const msg = {};
        if (Validate(data.email)) {
            msg.email = "Email is required";
        }
        if (Validate(data.password)) {
            msg.password = "Password is required";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const submit = (e) => {
        e.preventDefault();
        if (!validateAll()) return;
        post(route("customer.process_login"));
    };
    return (
        <>
            <Head title="Login member" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> Login</h1>
                            {/* <div className="flex justify-content-center">
                                <Breadcrumbs
                                    separator={
                                        <NavigateNextIcon
                                            fontSize="small"
                                            style={{ color: "white" }}
                                        />
                                    }
                                    aria-label="breadcrumb"
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>
                            </div> */}
                        </div>
                    </div>
                </div>
                <section
                    className="vh-100"
                    style={{ backgroundColor: "#f6f8fb" }}
                >
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <form onSubmit={submit}>
                                    <div
                                        className="card shadow-2-strong"
                                        style={{ borderRadius: "1rem" }}
                                    >
                                        <div className="card-body p-5 text-center">
                                            <h3 className="mb-5">Sign in</h3>
                                            {!isEmpty(login.error) && (
                                                <Alert
                                                    variant="outlined"
                                                    severity="error"
                                                    sx={{
                                                        marginBottom: "1rem",
                                                    }}
                                                >
                                                    {login.error}
                                                </Alert>
                                            )}
                                            {!isEmpty(login.error_server) && (
                                                <Alert
                                                    variant="outlined"
                                                    severity="error"
                                                    sx={{
                                                        marginBottom: "1rem",
                                                    }}
                                                >
                                                    {login.error_server}
                                                </Alert>
                                            )}
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="floatingInput"
                                                    name="email"
                                                    placeholder="name@example.com"
                                                    onChange={onHandleChange}
                                                />
                                                <label for="floatingInput">
                                                    UserName
                                                </label>
                                                <InputError
                                                    message={
                                                        validationMsg.email
                                                    }
                                                    className="mt-2 flex justify-content-start"
                                                />
                                                <InputError
                                                    message={errors.email}
                                                    className="mt-2 flex justify-content-start"
                                                />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingPassword"
                                                    name="password"
                                                    placeholder="Password"
                                                    onChange={onHandleChange}
                                                />
                                                <label for="floatingPassword">
                                                    Password
                                                </label>
                                                <InputError
                                                    message={
                                                        validationMsg.password
                                                    }
                                                    className="mt-2 flex justify-content-start"
                                                />
                                                <InputError
                                                    message={errors.password}
                                                    className="mt-2 flex justify-content-start"
                                                />
                                            </div>
                                            <div className="d-flex justify-content-start mb-4">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            sx={{
                                                                "&.Mui-checked":
                                                                    {
                                                                        color: "var(--primary)",
                                                                    },
                                                            }}
                                                            name="remember"
                                                            onChange={
                                                                onHandleChange
                                                            }
                                                        />
                                                    }
                                                    label="Remember password"
                                                />
                                            </div>

                                            <Button
                                                variant="contained"
                                                disableElevation
                                                sx={{
                                                    width: "100%",
                                                    height: "3rem",
                                                    backgroundColor:
                                                        "var(--primary)",
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "var(--primary_hover)",
                                                    },
                                                }}
                                                type="submit"
                                                processing={processing}
                                            >
                                                Login
                                            </Button>

                                            {/* <hr className="my-4" />

                                            <Button
                                                variant="contained"
                                                disableElevation
                                                className="mb-3"
                                                sx={{
                                                    width: "100%",
                                                    height: "3rem",
                                                    backgroundColor: "#dd4b39",
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#dd4b39",
                                                    },
                                                }}
                                            >
                                                <i className="fab fa-google me-2"></i>{" "}
                                                Sign in with google
                                            </Button>

                                            <Button
                                                variant="contained"
                                                disableElevation
                                                sx={{
                                                    width: "100%",
                                                    height: "3rem",
                                                    backgroundColor: "#3b5998",
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#3b5998",
                                                    },
                                                }}
                                            >
                                                <i className="fab fa-facebook-f me-2"></i>
                                                Sign in with facebook
                                            </Button> */}

                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-start mb-2">
                                                <span>
                                                    DO NOT HAVE AN ACCOUNT?{" "}
                                                </span>
                                                <Link
                                                    href={route(
                                                        "customer.register"
                                                    )}
                                                    className="link"
                                                    type="submit"
                                                >
                                                    Register
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Content>
        </>
    );
}
