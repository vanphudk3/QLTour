import { usePage } from "@inertiajs/react";

const formartFloat = (number, n) => {
    var _pow = Math.pow(10, n);
    return Math.round(number * _pow) / _pow;
};

export default function Rating() {
    const detailCmt = usePage().props.detailCmt;
    // console.log(detailCmt['start']['five']);
    const _lang = usePage().props._lang;
    const lang = usePage().props.lang;
    return (
        <>
        {detailCmt['countCmt'] > 0 && detailCmt['agvRate'] > 0 && (
        <div className="container-rw">
            <div className="inner-rw">
                <div className="rating">
                    <span className="rating-num">{formartFloat(detailCmt["agvRate"], 1)} /5</span>
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
                        <i className="icon-user"></i> {detailCmt['countCmt']} {lang['Total']}
                    </div>
                </div>
                <div className="histo">
                    <div className="five histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 5{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-five" className="bar" style={{
                                width: `${detailCmt['start']['five']}0%`
                            }}>
                                <span>
                                    {detailCmt['start']['five']}
                                </span>
                                &nbsp;
                            </span>
                        </span>
                    </div>

                    <div className="four histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 4{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-four" className="bar" style={{
                                width: `${detailCmt['start']['four']}0%`
                            }}>
                                <span>
                                    {detailCmt['start']['four']}
                                </span>
                                &nbsp;
                            </span>
                        </span>
                    </div>

                    <div className="three histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 3{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-three" className="bar" style={{
                                width: `${detailCmt['start']['three']}0%`
                            }}>
                                <span>
                                    {detailCmt['start']['three']}
                                </span>
                                &nbsp;
                            </span>
                        </span>
                    </div>

                    <div className="two histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 2{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-two" className="bar" style={{
                                width: `${detailCmt['start']['two']}0%`
                            }}>
                                <span>
                                    {detailCmt['start']['two']}
                                </span>
                                &nbsp;
                            </span>
                        </span>
                    </div>

                    <div className="one histo-rate">
                        <span className="histo-star">
                            <i className="active icon-star"></i> 1{" "}
                        </span>
                        <span className="bar-block">
                            <span id="bar-one" className="bar"  style={{
                                width: `${detailCmt['start']['one']}0%`
                            }}>
                                <span>
                                    {detailCmt['start']['one']}
                                </span>
                                &nbsp;
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    );
}
