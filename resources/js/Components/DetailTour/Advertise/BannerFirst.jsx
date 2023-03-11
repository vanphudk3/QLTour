export default function BannerFirst({ children }) {
    return (
        <>
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
                        {children}
                    </span>
                </div>
                <div className="cta-button__wrapper">
                    <span className="cta-button">
                        Book now
                        <i className="fa-solid fa-arrow-right"></i>
                    </span>
                </div>
            </div>
        </>
    );
}
