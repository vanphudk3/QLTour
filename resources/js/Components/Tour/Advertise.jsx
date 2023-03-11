export default function Advertise() {
    return (
        <>
            <div className="tour-content__item-grid">
                <div className="inner">
                    <a href="#" className="inner-cta">
                        <div className="cta-bg-wrapper">
                            <div className="bg"></div>
                            <div className="bg-overlay"></div>
                        </div>
                        <div className="cta-content">
                            <h2 className="cta-title">happy holiday</h2>
                            <div className="cta-description">
                                Stay &amp; Enjoy
                                <br />
                                <span
                                    style={{
                                        fontSize: "16px",
                                        fontFamily: "jost",
                                        fontWeight: 400,
                                        letterSpacing: 0,
                                        color: "var(--text)",
                                    }}
                                >
                                    15% off on all booking
                                </span>
                            </div>
                            <div className="cta-button__wrapper">
                                <span className="cta-button">
                                    Book now
                                    <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className="tour-content__item-grid">
                <div className="inner">
                    <a href="#" className="inner-cta">
                        <div className="cta-bg-wrapper">
                            <div className="bg"></div>
                            <div className="bg-overlay"></div>
                        </div>
                        <div className="cta-content">
                            <h2 className="cta-title">happy holiday</h2>
                            <div className="cta-description">
                                Stay &amp; Enjoy
                                <br />
                                <span
                                    style={{
                                        fontSize: "16px",
                                        fontFamily: "jost",
                                        fontWeight: 400,
                                        letterSpacing: 0,
                                        color: "#FFFFFF",
                                    }}
                                >
                                    starting from{" "}
                                    <span
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: 600,
                                            color: "#4BD31B",
                                        }}
                                    >
                                        $189
                                    </span>
                                </span>
                            </div>
                            <div className="cta-button__wrapper">
                                <span className="cta-button">
                                    Book now
                                    <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}
