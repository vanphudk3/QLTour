import Explore from "@/Components/Home/SectionTitle/Sectiontitle";
import NavLinkB from "@/Components/Bootstrap/NavLink";
import { usePage, Head } from "@inertiajs/react";
import Content from "@/Layouts/DetailTour";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Destination(props) {
    const destinations1 = usePage().props.destinations1;
    const destinations2 = usePage().props.destinations2;

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
            Destination
        </Typography>,
    ];

    return (
        <>
            <Head title="Destination" />
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
                <div className="destination">
                    <div
                        className="container-layout"
                        style={{ background: "repeat" }}
                    >
                        <div className="explore">
                            <div className="container-explore">
                                <Explore>
                                    <p className="sectitle">
                                        CHOOSE YOUR EXPERIENCE
                                    </p>
                                    <h2 className="subtitle">
                                        Top Attractions Destinations
                                    </h2>
                                </Explore>
                            </div>
                        </div>
                        <div className="row-destination">
                            <div className="layout-row">
                                {destinations1.map((destination) => (
                                    <div className="location-item">
                                        <NavLinkB
                                            href={`/destination/${destination.slug}`}
                                            aria-current="page"
                                        >
                                            <div className="img-location">
                                                <img
                                                    src={`http://localhost:8000/storage/${destination.hinh_anh}`}
                                                    alt=""
                                                />
                                                <div className="location-content">
                                                    <span className="location-name">
                                                        {destination.ten}
                                                    </span>
                                                    <span className="location-count">
                                                        {destination.sum} Tours+
                                                    </span>
                                                </div>
                                            </div>
                                        </NavLinkB>
                                    </div>
                                ))}
                                {/* <div className="location-item">
                                        <a href="">
                                            <div className="img-location">
                                                <img
                                                    src="./images/home/location3.jpg"
                                                    alt=""
                                                />
                                                <div className="location-content">
                                                    <span className="location-name">
                                                        Oceania
                                                    </span>
                                                    <span className="location-count">
                                                        6 Tours+
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </div> */}
                            </div>
                            <div className="layout-row">
                                {destinations2.map((destination) => (
                                    <div className="location-item">
                                        <NavLinkB
                                            href={`/destination/${destination.slug}`}
                                            aria-current="page"
                                        >
                                            <div className="img-location">
                                                <img
                                                    src={`http://localhost:8000/storage/${destination.hinh_anh}`}
                                                    alt=""
                                                />
                                                <div className="location-content">
                                                    <span className="location-name">
                                                        {destination.ten}
                                                    </span>
                                                    <span className="location-count">
                                                        {destination.sum} Tours+
                                                    </span>
                                                </div>
                                            </div>
                                        </NavLinkB>
                                    </div>
                                ))}
                                {/* <div className="location-item">
                                        <a href="">
                                            <div className="img-location">
                                                <img
                                                    src="./images/home/location5.jpg"
                                                    alt=""
                                                />
                                                <div className="location-content">
                                                    <span className="location-name">
                                                        Oceania
                                                    </span>
                                                    <span className="location-count">
                                                        6 Tours+
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="location-item">
                                        <a href="">
                                            <div className="img-location">
                                                <img
                                                    src="./images/home/location6.jpg"
                                                    alt=""
                                                />
                                                <div className="location-content">
                                                    <span className="location-name">
                                                        Oceania
                                                    </span>
                                                    <span className="location-count">
                                                        6 Tours+
                                                    </span>
                                                </div>
                                            </div>
                                        </a>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Content>
        </>
    );
}
