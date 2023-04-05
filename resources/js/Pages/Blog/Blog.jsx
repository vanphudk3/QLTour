import Content from "@/Layouts/DetailTour";
import { Head, Link, usePage } from "@inertiajs/react";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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
        Blog
    </Typography>,
];

export default function Blog(props) {
    const specialBlogs = usePage().props.specialBlogs;
    const forcusBlogs = usePage().props.forcusBlogs;
    const blogs = usePage().props.blogs.data;
    return (
        <>
            <Head title="Blog" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> Tours Booking</h1>
                            <div className="flex justify-content-center">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="container-layout"
                    style={{ paddingTop: "50px" }}
                >
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
                                                    <Link
                                                        href={route("welcome")}
                                                    >
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
                                            <p>{specialBlogs.content}</p>
                                            <div className="more-link-wrap">
                                                <a
                                                    href="#"
                                                    className="more-link"
                                                >
                                                    Read More{" "}
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                {forcusBlogs.map((item, index) => (
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
                                                            <a href="#">
                                                                {
                                                                    item.formartDate
                                                                }
                                                            </a>
                                                        </div>
                                                        <div className="post-author">
                                                            <a href="#">
                                                                By
                                                                {item.nameUser}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <h3 className="title">
                                                        <a href="#">
                                                            {item.title}
                                                        </a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="layout-02">
                        <div className="row layout-wrap">
                            <div className="col-4 width-100 width-50">
                                <div className="img-detail-blog">
                                    <img
                                        src="../public/images/home/tour_1.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-8 width-100 width-50">
                                <div className="content-detail">
                                    <div className="content-inner">
                                        <div className="header-inner">
                                            <div className="meta">
                                                <div className="posted-on">
                                                    <a href="#">May 20, 2020</a>
                                                </div>
                                                <div className="post-author">
                                                    <a href="#">By Admin</a>
                                                </div>
                                            </div>
                                            <h3 className="title-blog">
                                                <a href="#">
                                                    Hành trình “Áo Ấm Cho Em
                                                    2023”: Đưa trẻ em từ vùng
                                                    miền cao có thành tích học
                                                    tập xuất sắc về thăm Thủ đô
                                                    Hà Nội
                                                </a>
                                            </h3>
                                            <span className="line"></span>
                                        </div>
                                        <div className="content">
                                            <p>
                                                Tiếp nối hành trình từ thiện 10
                                                năm tới vùng miền núi Đông - Tây
                                                Bắc, ngày 7-9/1/2023, Công ty Du
                                                lịch Vietravel tổ chức chương
                                                trình thiện nguyện “Áo ấm cho
                                                em”, đưa 15 em học sinh ưu tú từ
                                                trường Đức Xuân, huyện Bắc
                                                Quang, Hà Giang về thăm thủ đô
                                                Hà Nội và tham quan di sản thiên
                                                nhiên – Vịnh Hạ Long.
                                            </p>
                                            <div className="more-link-wrap">
                                                <a
                                                    href="#"
                                                    className="more-link"
                                                >
                                                    Read More{" "}
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row layout-wrap">
                            <div className="col-4 width-100 width-50">
                                <div className="img-detail-blog">
                                    <img
                                        src="../public/images/home/tour_1.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-8 width-100 width-50">
                                <div className="content-detail">
                                    <div className="content-inner">
                                        <div className="header-inner">
                                            <div className="meta">
                                                <div className="posted-on">
                                                    <a href="#">May 20, 2020</a>
                                                </div>
                                                <div className="post-author">
                                                    <a href="#">By Admin</a>
                                                </div>
                                            </div>
                                            <h3 className="title-blog">
                                                <a href="#">
                                                    Hành trình “Áo Ấm Cho Em
                                                    2023”: Đưa trẻ em từ vùng
                                                    miền cao có thành tích học
                                                    tập xuất sắc về thăm Thủ đô
                                                    Hà Nội
                                                </a>
                                            </h3>
                                            <span className="line"></span>
                                        </div>
                                        <div className="content">
                                            <p>
                                                Tiếp nối hành trình từ thiện 10
                                                năm tới vùng miền núi Đông - Tây
                                                Bắc, ngày 7-9/1/2023, Công ty Du
                                                lịch Vietravel tổ chức chương
                                                trình thiện nguyện “Áo ấm cho
                                                em”, đưa 15 em học sinh ưu tú từ
                                                trường Đức Xuân, huyện Bắc
                                                Quang, Hà Giang về thăm thủ đô
                                                Hà Nội và tham quan di sản thiên
                                                nhiên – Vịnh Hạ Long.
                                            </p>
                                            <div className="more-link-wrap">
                                                <a
                                                    href="#"
                                                    className="more-link"
                                                >
                                                    Read More{" "}
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row layout-wrap">
                            <div className="col-4 width-100 width-50">
                                <div className="img-detail-blog">
                                    <img
                                        src="../public/images/home/tour_1.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="col-8 width-100 width-50">
                                <div className="content-detail">
                                    <div className="content-inner">
                                        <div className="header-inner">
                                            <div className="meta">
                                                <div className="posted-on">
                                                    <a href="#">May 20, 2020</a>
                                                </div>
                                                <div className="post-author">
                                                    <a href="#">By Admin</a>
                                                </div>
                                            </div>
                                            <h3 className="title-blog">
                                                <a href="#">
                                                    Hành trình “Áo Ấm Cho Em
                                                    2023”: Đưa trẻ em từ vùng
                                                    miền cao có thành tích học
                                                    tập xuất sắc về thăm Thủ đô
                                                    Hà Nội
                                                </a>
                                            </h3>
                                            <span className="line"></span>
                                        </div>
                                        <div className="content">
                                            <p>
                                                Tiếp nối hành trình từ thiện 10
                                                năm tới vùng miền núi Đông - Tây
                                                Bắc, ngày 7-9/1/2023, Công ty Du
                                                lịch Vietravel tổ chức chương
                                                trình thiện nguyện “Áo ấm cho
                                                em”, đưa 15 em học sinh ưu tú từ
                                                trường Đức Xuân, huyện Bắc
                                                Quang, Hà Giang về thăm thủ đô
                                                Hà Nội và tham quan di sản thiên
                                                nhiên – Vịnh Hạ Long.
                                            </p>
                                            <div className="more-link-wrap">
                                                <a
                                                    href="#"
                                                    className="more-link"
                                                >
                                                    Read More{" "}
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}
