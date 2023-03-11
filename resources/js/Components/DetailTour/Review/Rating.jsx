export default function Rating() {
    return (
        <div className="container-rw">
            <div className="inner-rw">
                <div className="rating">
                    <span className="rating-num">4.0 /5</span>
                    <div className="rating-stars">
                        <span>
                            <i className="active icon-star"></i>
                        </span>
                        <span>
                            <i className="active icon-star"></i>
                        </span>
                        <span>
                            <i className="active icon-star"></i>
                        </span>
                        <span>
                            <i className="active icon-star"></i>
                        </span>
                        <span>
                            <i className="icon-star"></i>
                        </span>
                    </div>
                    <div className="rating-users">
                        <i className="icon-user"></i> 1,014,004 total
                    </div>
                </div>

                <div className="histo">
                    <div className="five histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 5{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-five" className="bar">
                                <span>566,784</span>
                                &nbsp;
                            </span>
                        </span>
                    </div>

                    <div className="four histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 4{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-four" className="bar">
                                <span>171,298</span>
                                &nbsp;
                            </span>
                        </span>
                    </div>

                    <div className="three histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 3{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-three" className="bar">
                                <span>94,940</span>
                                &nbsp;
                            </span>
                        </span>
                    </div>

                    <div className="two histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 2{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-two" className="bar">
                                <span>44,525</span>
                                &nbsp;
                            </span>
                        </span>
                    </div>

                    <div className="one histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 1{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-one" className="bar">
                                <span>0</span>
                                &nbsp;
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
