import { Link, usePage } from "@inertiajs/react";

const Trancate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
};

export default function BlogWrap(props) {
    const specialBlogs = usePage().props.specialBlogs;
    const forcusBlogs = usePage().props.forcusBlogs;
    return (
        <div className="blog-wrap">
            <div className="row">
                <div className="col">
                    <div className="column-item">
                        <div className="post-inner">
                            <img
                                src={`http://localhost:8000/storage/${specialBlogs.image}`}
                                alt=""
                            />
                        </div>
                        <div className="content-inner">
                            <div className="header-inner">
                                <div className="meta">
                                    <div className="categories-link">
                                        <Link href={route("welcome")}>
                                            Travel
                                        </Link>
                                    </div>
                                    <div className="posted-on">
                                        {specialBlogs.formartDate}
                                    </div>
                                    <div className="post-author">
                                        By {specialBlogs.nameUser}
                                    </div>
                                </div>
                                <h3 className="title">
                                    <Link
                                        href={route(
                                            "blog.show",
                                            specialBlogs.slug
                                        )}
                                    >
                                        {specialBlogs.title}
                                    </Link>
                                </h3>
                                <span className="line"></span>
                            </div>
                            <div className="content">
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: Trancate(
                                            specialBlogs.content,
                                            200
                                        ),
                                    }}
                                />
                                <div className="more-link-wrap">
                                    <Link
                                        href={route(
                                            "blog.show",
                                            specialBlogs.slug
                                        )}
                                        className="more-link"
                                    >
                                        Read More{" "}
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {forcusBlogs.map((item) => (
                        <div className="column-inner">
                            <div className="post-inner">
                                <div className="post-thumb">
                                    <img
                                        src={`http://localhost:8000/storage/${item.image}`}
                                        alt=""
                                    />
                                </div>
                                <div className="content-inner">
                                    <div className="header-inner">
                                        <div className="meta">
                                            <div className="posted-on">
                                                {item.formartDate}
                                            </div>
                                            <div className="post-author">
                                                <a href="#">
                                                    By {item.nameUser}
                                                </a>
                                            </div>
                                        </div>
                                        <h3 className="title">
                                            <Link
                                                href={route(
                                                    "blog.show",
                                                    item.slug
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
