import { usePage } from "@inertiajs/react";
import { Rating } from "@mui/material";


export default function Comment() {
    const comments = usePage().props.comments;
    console.log(comments);

    return (
        <ol className="comment-list">
            {comments.map((item, index) => (
                <>
            <li className="comment">
                <div className="comment-body">

                    <div className="comment-author">
                        <img
                            src="../images/avarta.png"
                            alt=""
                            className="avatar"
                        />
                    </div>
                    <div className="comment-content">
                        <div className="comment-head">
                            <div className="comment-meta">
                                <cite className="fn">
                                    {item.ten_khach_hang}
                                </cite>
                                
                            </div>
                            <div className="reply">
                                <time datetime="2022-06-30T03:32:01+00:00">
                                    {item.created_at}
                                </time>
                            </div>
                        </div>
                        <div className="comment-text">
                            <ul className="comment-rating-ul">
                                <li>
                                    <Rating name="read-only" value={item.so_sao} readOnly />
                                </li>
                            </ul>
                            <p>
                                {item.noi_dung}
                            </p>
                        </div>
                    </div>
                </div>
            </li>
            </>
            ))}
            {comments.length === 0 && (
                <li className="comment">
                    <div className="comment-body">
                        <div className="comment-content">
                            <div className="comment-text">
                                <p>
                                    Chưa có đánh giá nào
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
            )}
        </ol>
    );
}
