import { usePage, useForm } from "@inertiajs/react";
import { Rating } from "@mui/material";
import { isEmpty } from "lodash";
import { useState } from "react";

export default function Reply(props) {
    const [rating, setRating] = useState(0);
    const customer = usePage().props.customer;
    
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 0,
        comment: "",
        customer_id: isEmpty(customer) ? 0 : customer.id,
        tour_id: props.tour_id,
    });

    console.log(data);

    return (
        <div className="comment-respond">
            <span className="comment-reply-title">Leave a Reply</span>
            <form action="" className="comment-form">
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
                <ul className="comment-form-rating-ul">
                    <li>
                        {/* <span className="comment-form-rating-criterion">
                            Location
                        </span> */}
                        {/* <span
                            className="comment-form-rating-stars stars"
                            data-rating-cr="location"
                        >
                            <span className="star star-1" data-rating-val="1">
                                <i className="fa-regular fa-star"></i>
                            </span>
                            <span className="star star-2" data-rating-val="2">
                                <i className="fa-regular fa-star"></i>
                            </span>
                            <span className="star star-3" data-rating-val="3">
                                <i className="fa-regular fa-star"></i>
                            </span>
                            <span className="star star-4" data-rating-val="4">
                                <i className="fa-regular fa-star"></i>
                            </span>
                            <span className="star star-5" data-rating-val="5">
                                <i className="fa-regular fa-star"></i>
                            </span>
                        </span> */}
                        <Rating
                            name="no-value"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </li>
                </ul>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                size="30"
                                placeholder="Your name*"
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="email address*"
                            />
                        </div>
                    </div>
                    {/* <div className="col-lg-4">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Your website*"
                            />
                        </div>
                    </div> */}
                    <div className="col-lg-12">
                        <div className="form-group">
                            <textarea
                                name=""
                                id=""
                                cols="45"
                                rows="4"
                                placeholder="comment"
                            ></textarea>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <p className="comment-form-cookies-consent">
                            <input
                                id="wp-comment-cookies-consent"
                                name="wp-comment-cookies-consent"
                                type="checkbox"
                                value="yes"
                            />{" "}
                            <label for="wp-comment-cookies-consent">
                                Save my name, email, and website in this browser
                                for the next time I comment.
                            </label>
                        </p>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input
                                name="submit"
                                type="submit"
                                id="submit"
                                className="submit"
                                value="Post Comment"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
