export default function Question({

}) {
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                        style={{
                            boxShadow: "none",
                            borderColor: "none",
                            color: "black",
                            background: "content-box",
                        }}
                    >
                        <div className="accodition-title">
                            <span style={{ color: "var(--primary)" }}>Q.</span>{" "}
                            Can we customize our package with you?
                        </div>
                    </button>
                </h2>
                <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                >
                    <div
                        className="accordion-body"
                        style={{
                            color: "var(--text)",
                            fontSize: "16px",
                            padding: "10px 65px 0px 28px",
                            fontStyle: "italic",
                        }}
                    >
                        The best destinations for honeymoon are Kerala, Goa,
                        Uttarakhand, Andaman Islands, and Kashmir.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                        style={{
                            boxShadow: "none",
                            borderColor: "none",
                            color: "black",
                            background: "content-box",
                        }}
                    >
                        <div className="accodition-title">
                            <span style={{ color: "var(--primary)" }}>Q.</span>{" "}
                            Can we customize our package with you?
                        </div>
                    </button>
                </h2>
                <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                >
                    <div
                        className="accordion-body"
                        style={{
                            color: "var(--text)",
                            fontSize: "16px",
                            padding: "10px 65px 0px 28px",
                            fontStyle: "italic",
                        }}
                    >
                        The best destinations for honeymoon are Kerala, Goa,
                        Uttarakhand, Andaman Islands, and Kashmir.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                        style={{
                            boxShadow: "none",
                            borderColor: "none",
                            color: "black",
                            background: "content-box",
                        }}
                    >
                        <div className="accodition-title">
                            <span style={{ color: "var(--primary)" }}>Q.</span>{" "}
                            Why would we book our package?
                        </div>
                    </button>
                </h2>
                <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                >
                    <div
                        className="accordion-body"
                        style={{
                            color: "var(--text)",
                            fontSize: "16px",
                            padding: "10px 65px 0px 28px",
                            fontStyle: "italic",
                        }}
                    >
                        The best destinations for honeymoon are Kerala, Goa,
                        Uttarakhand, Andaman Islands, and Kashmir.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingFour">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                        aria-controls="flush-collapseFour"
                        style={{
                            boxShadow: "none",
                            borderColor: "none",
                            color: "black",
                            background: "content-box",
                        }}
                    >
                        <div className="accodition-title">
                            <span style={{ color: "var(--primary)" }}>Q.</span>{" "}
                            How early should we book?
                        </div>
                    </button>
                </h2>
                <div
                    id="flush-collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingFour"
                    data-bs-parent="#accordionFlushExample"
                >
                    <div
                        className="accordion-body"
                        style={{
                            color: "var(--text)",
                            fontSize: "16px",
                            padding: "10px 65px 0px 28px",
                            fontStyle: "italic",
                        }}
                    >
                        The best destinations for honeymoon are Kerala, Goa,
                        Uttarakhand, Andaman Islands, and Kashmir.
                    </div>
                </div>
            </div>
        </>
    );
}
