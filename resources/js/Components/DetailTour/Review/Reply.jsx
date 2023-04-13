import InputError from "@/Components/InputError";
import { usePage, useForm } from "@inertiajs/react";
import { Alert, Rating, Snackbar } from "@mui/material";
import { isEmpty } from "lodash";
import { useState } from "react";
import Swal from "sweetalert2";
import Validate from "validator/lib/isEmpty";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputLabel from "@/Components/InputLabel";

export default function Reply(props) {
    // const [rating, setRating] = useState(0);
    const detailTour = usePage().props.detailTour;
    const customer = usePage().props.customer;
    const { data, setData, post, processing, errors, reset } = useForm({
        rate: 0,
        comment: "",
        customer_id: isEmpty(customer) ? 0 : customer.id,
        tour_id: detailTour.ma_tour,
    });
    const onHandleChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        );
    };

    // chỉ cho phép comment khi đã đăng nhập
    const checkComment = () => {
        if (isEmpty(customer)) {
            return false;
        }
        return true;
    };

    // chi cho phép comment khi đã đánh giá
    const checkRate = () => {
        if (data.rate === 0) {
            return false;
        }
        return true;
    };

    // chỉ cho phép comment khi đã sử dụng tour
    const checkTour = () => {
        if (!detailTour.isBooked) return false;
        return true;
    };

    // chỉ comment duy nhất 1 lần cho 1 tour
    const checkCommented = () => {
        if (detailTour.isCommented) return false;
        return true;
    };

    const [validationMsg, setValidationMsg] = useState({});

    const validateAll = () => {
        const msg = {};
        if (Validate(data.comment)) {
            msg.comment = "Comment is required";
        }
        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) {
            return false;
        }
        return true;
    };

    const submit = (e) => {
        e.preventDefault();
        if (!checkComment()) {
            Swal.fire({
                title: "Bạn chưa đăng nhập",
                text: "Bạn cần đăng nhập để comment",
                icon: "error",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đăng nhập",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = route("customer.login", {
                        redirect: window.location.href,
                        
                    });
                }
            });
            return;
        }
        if (!checkRate()) {
            Swal.fire({
                title: "Bạn chưa đánh giá",
                icon: "error",
            });
            return;
        }
        if (!checkTour()) {
            Swal.fire({
                title: "Bạn chưa sử dụng tour",
                icon: "error",
            });
            return;
        }
        if (!checkCommented()) {
            Swal.fire({
                title: "Bạn đã comment",
                icon: "error",
            });
            return;
        }
        const isValid = validateAll();
        if (!isValid) {
            return;
        }
        post(route("review.store"), {
            onSuccess: () => {
                setOpenEdit(true);
                data.comment = "";
                reset("rate");
            },
        });
    };
    const [openEdit, setOpenEdit] = useState(false);
    const [state, setState] = useState({
        vertical: "top",
        horizontal: "right",
    });

    const { vertical, horizontal } = state;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenEdit(false);
    };

    return (
        <div className="comment-respond">
            <span className="comment-reply-title">Leave a Reply</span>
            <form onSubmit={submit} className="comment-form">
                <p className="comment-notes">
                    <span id="email-notes">
                        Your email address will not be published.
                    </span>{" "}
                    <span className="required-field-message" aria-hidden="true">
                        Required fields are marked{" "}
                        <span className="required" aria-hidden="true">
                            *
                        </span>
                    </span>
                </p>
                {!isEmpty(customer) && (
                    <>
                        <Snackbar
                            open={openEdit}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical,
                                horizontal,
                            }}
                            key={vertical + horizontal}
                        >
                            <Alert
                                onClose={handleClose}
                                severity="success"
                                style={{
                                    width: "100%",
                                    Zindex: "999",
                                }}
                            >
                                Comment successfully
                            </Alert>
                        </Snackbar>
                        <div className="flex booking-guests-result">
                            <AccountCircleIcon style={{ fontSize: 50 }} />
                            <div className="booking-form__block">
                                <h6 className="">{customer.ten_khach_hang}</h6>
                                <p className="post-date">{customer.email}</p>
                            </div>
                        </div>
                    </>
                )}
                <ul className="comment-form-rating-ul">
                    <li>
                        <span className="comment-form-rating-label">
                            Your rating :
                        </span>
                    </li>
                    <li>
                        <Rating
                            name="no-value"
                            value={data.rate}
                            onChange={(event, newValue) => {
                                // setRating(newValue),
                                setData("rate", newValue);
                            }}
                        />
                    </li>
                </ul>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <InputLabel label="Comment" className="required" />
                            <textarea
                                name="comment"
                                id=""
                                cols="45"
                                rows="4"
                                placeholder="comment"
                                value={data.comment}
                                onChange={onHandleChange}
                            ></textarea>
                            <InputError
                                message={
                                    errors.comment || validationMsg.comment
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input
                                name="submit"
                                type="submit"
                                id="submit"
                                className="submit"
                                value="Post Comment"
                                processing={processing}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
