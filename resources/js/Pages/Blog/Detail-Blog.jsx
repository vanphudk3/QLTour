import Content from "@/Layouts/DetailTour";
import { Head, Link, usePage } from "@inertiajs/react";
import { Breadcrumbs, Button, Grid, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import FacebookIcon from '@mui/icons-material/Facebook';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function DetailBlog(props) {
    const blog = usePage().props.blog;
    const relatedBlogs = usePage().props.relatedBlogs;
    const _lang = usePage().props._lang;
    const lang  = usePage().props.lang;
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
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href={route("blog")}
            style={{ textDecoration: "none", color: "white" }}
        >
            Blog
        </Link>,
        <Typography key="2" color="text.primary" style={{ color: "white" }}>
            {blog.title}
        </Typography>,
    ];

    return (
        <>
            <Head title="Detail Blog" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> Detail blog</h1>
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
                        <Grid container spacing={2}>
                            <Grid xs={8}>
                                <div className="content-detail">
                                    <div className="content-inner">
                                        <div className="header-inner">
                                            <h1 className="news-detail__title">
                                                {blog.title}
                                            </h1>

                                            <div
                                                class="fb-share-button mb-3"
                                                data-href="https://developers.facebook.com/docs/plugins/"
                                                data-layout=""
                                                data-size=""
                                            >
                                                <a
                                                    target="_blank"
                                                    href={`https://www.facebook.com/sharer/sharer.php?u=${route(
                                                        "blog.show",
                                                        blog.slug
                                                    )}&amp;src=sdkpreparse`}
                                                    class="fb-xfbml-parse-ignore"
                                                >
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        startIcon={
                                                            <FacebookIcon />
                                                        }
                                                    >
                                                        Share
                                                    </Button>
                                                </a>
                                            </div>
                                            <span className="line"></span>
                                        </div>
                                        <div
                                            className="content"
                                            dangerouslySetInnerHTML={{
                                                __html: blog.content,
                                            }}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={4}>
                                <div className="content-detail">
                                    <h3 className="Heading-title text-center">
                                        {lang['blog_relate']}
                                    </h3>
                                    <ul className="align-justify">
                                        {relatedBlogs.map((blog) => (
                                            <li className="item-news">
                                                <Link
                                                    href={route(
                                                        "blog.show",
                                                        {slug:blog.slug,lang:_lang}
                                                    )}
                                                    className="text-decor-none cl-black text-capitalize font-weight-bold d-block mb-2 cl-primary-hover"
                                                >
                                                    {blog.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Content>
        </>
    );
}
