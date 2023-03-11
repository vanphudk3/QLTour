import BlogWrap from "./BlogWrap";
import Explore from "./SectionTitle/Sectiontitle";
import MenuSearch from "./MenuSearch";
import SwiperBanner from "./SwiperBanner";
import SwiperDeal from "./SwiperDeal";
import SwiperPopular from "./SwiperPopular";
import SwiperReview from "./SwiperReview";

export default function Main() {
    return (
        <main className="main">
            <SwiperBanner />

            <div className="container-layout">
                <MenuSearch />
                <Explore />

                <div className="explore-slider">
                    <SwiperPopular />
                </div>

                <div className="list-wrap">
                    <div className="list-item">
                        <div className="row">
                            <div className="col">
                                <i className="fa-solid fa-suitcase-rolling"></i>
                                <h6>Memorable Experiences</h6>
                                <p>
                                    Browse and book tours and activities so
                                    incredible.
                                </p>
                            </div>
                            <div className="col">
                                <i className="fa-solid fa-campground"></i>
                                <h6>Ultimate flexibility</h6>
                                <p>
                                    You’re in control, with free cancellation
                                    and payment options.
                                </p>
                            </div>
                            <div className="col">
                                <i className="fa-solid fa-binoculars"></i>
                                <h6>Extended Customization</h6>
                                <p>
                                    Browse and book tours and activities so
                                    incredible.
                                </p>
                            </div>
                            <div className="col">
                                <i className="fa-solid fa-stopwatch"></i>
                                <h6>Customer Satisfaction</h6>
                                <p>
                                    Browse and book tours and activities so
                                    incredible.
                                </p>
                            </div>
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
                            <div className="section-title">
                                <p className="sectitle">
                                    CHOOSE YOUR EXPERIENCE
                                </p>
                                <h2 className="subtitle">
                                    Top Attractions Destinations
                                </h2>
                                <div className="wrap-divider">
                                    <div className="container-divider">
                                        <div className="divider-separator"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row-destination">
                        <div className="layout-row">
                            <div className="location-item">
                                <a href="">
                                    <div className="img-location">
                                        <img
                                            src="./images/home/location2.jpg"
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
                            </div>
                        </div>
                        <div className="layout-row">
                            <div className="location-item">
                                <a href="">
                                    <div className="img-location">
                                        <img
                                            src="./images/home/location4.jpg"
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="choose-us">
                <div className="container-choose">
                    <div className="row">
                        <div className="col">
                            <div className="wrap-populated">
                                <div className="wrap-heading">
                                    <div className="wrap-heading-container">
                                        <h4 className="wrap-heading-title">
                                            We Create Journeys Worth Taking For
                                            The Traveler
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="section-title">
                                <p className="sectitle">WHY CHOOSE US</p>
                                <h2 className="subtitle">
                                    Our Experiences Meet High Quality Standards
                                </h2>
                                <div className="wrap-divider">
                                    <div className="container-divider">
                                        <div className="divider-separator"></div>
                                    </div>
                                    <p className="text">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Ut elit tellus, luctus
                                        nec ullamcorper mattis, pulvinar dapibus
                                        leo.
                                    </p>
                                </div>
                            </div>

                            <div className="list-default">
                                <div className="flex justify-center">
                                    <ul className="icon-list-items">
                                        <li className="icon-list-item">
                                            <span className="icon-list-icon">
                                                <i className="fa-solid fa-check"></i>
                                            </span>
                                            <span className="icon-list-text">
                                                Professional Tour Guide
                                            </span>
                                        </li>
                                        <li className="icon-list-item">
                                            <span className="icon-list-icon">
                                                <i className="fa-solid fa-check"></i>
                                            </span>
                                            <span className="icon-list-text">
                                                Exceptional flexibility
                                            </span>
                                        </li>
                                        <li className="icon-list-item">
                                            <span className="icon-list-icon">
                                                <i className="fa-solid fa-check"></i>
                                            </span>
                                            <span className="icon-list-text">
                                                Quality you can trust
                                            </span>
                                        </li>
                                        <li className="icon-list-item">
                                            <span className="icon-list-icon">
                                                <i className="fa-solid fa-check"></i>
                                            </span>
                                            <span className="icon-list-text">
                                                Award-winning support{" "}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="wrap-button">
                                <a
                                    href="./contact.html"
                                    className="button-link"
                                >
                                    <span className="button-content">
                                        <span className="button-text">
                                            Contact Us
                                        </span>
                                        <span className="button-icon">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="category">
                <div className="container-category">
                    <div className="section-title">
                        <p className="sectitle">WHY CHOOSE US</p>
                        <h2 className="subtitle">
                            Our Experiences Meet High Quality Standards
                        </h2>
                        <div className="wrap-divider">
                            <div className="container-divider">
                                <div className="divider-separator"></div>
                            </div>
                        </div>
                    </div>
                    <div className="category-slider">
                        <div className="row">
                            <div className="col">
                                <div className="slick-list">
                                    <div className="slick-track">
                                        <a href="">
                                            <div className="icon">
                                                <i className="fas fa-mountain"></i>
                                            </div>
                                            <div className="content-location">
                                                <span className="location-name">
                                                    Adventural
                                                </span>
                                                <span className="location-count">
                                                    10 Tour+
                                                </span>
                                                <span className="from">
                                                    <span>from</span>
                                                    <span>$125</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="slick-list">
                                    <div className="slick-track">
                                        <a href="#">
                                            <div className="icon">
                                                <i className="fa-solid fa-umbrella-beach"></i>
                                            </div>
                                            <div className="content-location">
                                                <span className="location-name">
                                                    Beachs
                                                </span>
                                                <span className="location-count">
                                                    10 Tour+
                                                </span>
                                                <span className="from">
                                                    <span>from</span>
                                                    <span>$125</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="slick-list">
                                    <div className="slick-track">
                                        <a href="" className="item-inner">
                                            <div className="icon">
                                                <i className="far fa-building"></i>
                                            </div>
                                            <div className="content-location">
                                                <span className="location-name">
                                                    City Tours
                                                </span>
                                                <span className="location-count">
                                                    10 Tour+
                                                </span>
                                                <span className="from">
                                                    <span>from</span>
                                                    <span>$125</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="slick-list">
                                    <div className="slick-track">
                                        <a href="" className="item-inner">
                                            <div className="icon">
                                                <i className="fa-solid fa-tree"></i>
                                            </div>
                                            <div className="content-location">
                                                <span className="location-name">
                                                    hiking
                                                </span>
                                                <span className="location-count">
                                                    10 Tour+
                                                </span>
                                                <span className="from">
                                                    <span>from</span>
                                                    <span>$125</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="slick-list">
                                    <div className="slick-track">
                                        <a href="" className="item-inner">
                                            <div className="icon">
                                                <i className="fa-solid fa-car-side"></i>
                                            </div>
                                            <div className="content-location">
                                                <span className="location-name">
                                                    Honeymoon
                                                </span>
                                                <span className="location-count">
                                                    10 Tour+
                                                </span>
                                                <span className="from">
                                                    <span>from</span>
                                                    <span>$125</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="slick-list">
                                    <div className="slick-track">
                                        <a hre="" className="item-inner">
                                            <div className="icon">
                                                <i className="fa-solid fa-building-columns"></i>
                                            </div>
                                            <div className="content-location">
                                                <span className="location-name">
                                                    Museum Tours
                                                </span>
                                                <span className="location-count">
                                                    10 Tour+
                                                </span>
                                                <span className="from">
                                                    <span>from</span>
                                                    <span>$125</span>
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="container-layout"
                style={{ paddingBottom: "120px" }}
            >
                <div className="explore" style={{ paddingTop: "120px" }}>
                    <div className="container-explore">
                        <div className="section-title">
                            <p className="sectitle">BOOK NOW AND SAVE</p>
                            <h2 className="subtitle">
                                Last Minute Travel Deals
                            </h2>
                            <div className="wrap-divider">
                                <div className="container-divider">
                                    <div className="divider-separator"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="explore-slider">
                    <SwiperDeal />
                </div>
            </div>
            <div className="reviews-wrapper">
                <div
                    className="container-layout"
                    style={{ background: "repeat" }}
                >
                    <div className="explore">
                        <div className="container-explore">
                            <div className="section-title">
                                <p className="sectitle">
                                    CHOOSE YOUR EXPERIENCE
                                </p>
                                <h2 className="subtitle">
                                    Top Attractions Destinations
                                </h2>
                                <div className="wrap-divider">
                                    <div className="container-divider">
                                        <div className="divider-separator"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-reviews">
                        <SwiperReview />
                    </div>
                </div>
            </div>
            <div className="container-layout">
                <div className="explore" style={{ paddingTop: "120px" }}>
                    <div className="container-explore">
                        <div className="section-title">
                            <p className="sectitle">TRAVEL INSIGHTS & IDEAS</p>
                            <h2 className="subtitle">Latest Travel Guides</h2>
                            <div className="wrap-divider">
                                <div className="container-divider">
                                    <div className="divider-separator"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BlogWrap/>
            </div>
        </main>
    );
}
