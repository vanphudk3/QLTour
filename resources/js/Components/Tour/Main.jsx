import MenuSearch from "../Home/MenuSearch";
import Advertise from "./Advertise";
import ContainerBook from "./ContainerBook";
import Question from "./Question";
import Widget from "./Widget";


export default function Main() {
    return (
        <main className="main">
            <div className="breadcrumb-layout">
                <div className="bg-overlay"></div>
                <div className="container-layout" style={{background: "content-box"}}>
                    <div className="breadcrumb-main">
                        <h1 className="zourney-title"> Tours List</h1>
                        <span>
                            <a href="" className="home">
                                <span>Home</span>
                            </a>
                        </span>
                        <span>
                            <a href="" className="post-page">
                                <span>Tour list</span>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div className="container-layout">
                <MenuSearch />
            </div>
            <div className="container-layout">
                <div className="layout-02">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="bade-result">
                                <div className="count-post">20 Tours</div>
                                <div className="filter-sort">
                                    Sort by{" "}
                                    <i className="fa-solid fa-arrow-down-a-z"></i>
                                </div>
                            </div>
                            <div className="bade-inner">
                                <ContainerBook/>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 width-100">
                            <div className="sidebar">
                                <h6 className="heading-title">Filter by</h6>
                                <Widget/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-layout">
                <div className="layout-02">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="tour-content__populated">
                                <h4 className="heading-title">
                                    FAQs For Tour Packages
                                </h4>
                                <div
                                    className="accordion accordion-flush"
                                    id="accordionFlushExample"
                                >
                                    <Question/>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-6 col-md-4 display-none width-100"
                            style={{border: "none"}}
                        >
                            <div className="tour-content__item">
                                <Advertise/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
