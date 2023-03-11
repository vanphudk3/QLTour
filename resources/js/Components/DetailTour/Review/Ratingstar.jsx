

export default function Ratingstar({ children }) {
    return (
        <ul className="comment-form-rating-ul">
            <li>
                <span
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
                </span>
            </li>
        </ul>
    );
}