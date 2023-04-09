import Content from "@/Layouts/Tour";
import { Head, Link, usePage } from "@inertiajs/react";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
export default function Success(props) {

    const getSlug = usePage().props.getSlug;

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
            key="2"
            color="inherit"
            href={route("tour")}
            style={{ textDecoration: "none", color: "white" }}
        >
            Tour list
        </Link>,
        <Link
            underline="hover"
            key="3"
            color="inherit"
            href={route("tour.show", getSlug)}
            style={{ textDecoration: "none", color: "white" }}
        >
            Tour Details
        </Link>,
        <Typography key="4" color="text.primary" style={{ color: "white" }}>
            Tour Booking
        </Typography>,
            <Typography key="5" color="text.primary" style={{ color: "white" }}>
            Checkout
        </Typography>,
            <Typography key="6" color="text.primary" style={{ color: "white" }}>
            Success
        </Typography>,
    ];
    return (
        <>
            <Head title="Success" />
            <Content>
                <div className="breadcrumb-layout">
                    <div className="bg-overlay"></div>
                    <div
                        className="container-layout"
                        style={{ background: "content-box" }}
                    >
                        <div className="breadcrumb-main">
                            <h1 className="zourney-title"> Tours Booking</h1>
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
                <div className="container-layout">
                    <div className="pd-t-50 pd-bt-50">
                        <div className="col-md-12">
                            <div className="success-box">
                                <div className="flex justify-content-center">
                                    {/* <i className="fa fa-check"></i> */}
                                    <CheckCircleOutlineIcon style={{ fontSize: 100 }} />
                                </div>
                                <h2 className="flex justify-content-center">Booking Success</h2>
                                <p className="flex justify-content-center">
                                    Thank you for booking with us. We will contact
                                    you soon.
                                </p>
                                <div className="flex justify-content-center">
                                    <Link href={route('welcome')} className="btn btn-primary">
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}
