import Content from "@/Layouts/DetailTour";
import { Head, Link, usePage } from "@inertiajs/react";
import { Breadcrumbs, Grid, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function DetailBlog(props) {
    const blog = usePage().props.blog;
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
                        {/* <div class="row">
                            <div class="col-8">
                                <div className="content-detail">
                                    <div className="content-inner">
                                        <div className="header-inner">
                                            <h3 className="title-blog">
                                                {blog.title}
                                            </h3>
                                            <span className="line"></span>
                                        </div>
                                        <div className="content" 
                                            dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">col-4</div>
                        </div> */}
                        <Grid container spacing={2}>
                            <Grid xs={8}>
                            <div className="content-detail">
                                    <div className="content-inner">
                                        <div className="header-inner">
                                            <h1 className="news-detail__title">
                                                {blog.title}
                                            </h1>
                                            <span className="line"></span>
                                        </div>
                                        <div className="content" 
                                            dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={4}>
                                    <h3 className="Heading-title text-center">
                                        Tin tức liên quan
                                    </h3>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Content>
        </>
    );
}
