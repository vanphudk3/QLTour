
export default function Tourplan({ children }) {
    return (
        <div className="container py-2 mt-4 mb-4">
            {/* <!-- timeline item 1 --> */}
            <div className="row">
                {/* <!-- timeline item 1 left dot --> */}
                <div className="col-auto text-center flex-column d-none d-sm-flex">
                    <div className="row h-50">
                        <div className="col">&nbsp;</div>
                        <div className="col">&nbsp;</div>
                    </div>
                    <h5 className="m-2">
                        <span
                            className="badge badge-pill bg-light border"
                            style={{ borderRadius: "20px" }}
                        >
                            &nbsp;
                        </span>
                    </h5>
                    <div className="row h-50">
                        <div className="col border-right">&nbsp;</div>
                        <div className="col">&nbsp;</div>
                    </div>
                </div>
                {/* <!-- timeline item 1 event content --> */}
                <div className="col py-2">
                    <div className="card">
                        <div className="card-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--/row--> */}
            {/* <!-- timeline item 2 --> */}
            {/* <div className="row">
                <div className="col-auto text-center flex-column d-none d-sm-flex">
                    <div className="row h-50">
                        <div className="col border-right">&nbsp;</div>
                        <div className="col">&nbsp;</div>
                    </div>
                    <h5 className="m-2">
                        <span
                            className="badge badge-pill bg-light border"
                            style={{ borderRadius: "20px" }}
                        >
                            &nbsp;
                        </span>
                    </h5>
                    <div className="row h-50">
                        <div className="col border-right">&nbsp;</div>
                        <div className="col">&nbsp;</div>
                    </div>
                </div>
                <div className="col py-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="float-right">
                                Tue, Jan 10th 2019 8:30 AM
                            </div>
                            <h4 className="card-title">
                                <span>Day 2</span> Sessions
                            </h4>
                            <p className="card-text">
                                Sign-up for the lessons and speakers that
                                coincide with your course syllabus. Meet and
                                greet with instructors.
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <!--/row--> */}
            {/* <!-- timeline item 3 --> */}
            {/* <div className="row">
                <div className="col-auto text-center flex-column d-none d-sm-flex">
                    <div className="row h-50">
                        <div className="col border-right">&nbsp;</div>
                        <div className="col">&nbsp;</div>
                    </div>
                    <h5 className="m-2">
                        <span
                            className="badge badge-pill bg-light border"
                            style={{ borderRadius: "20px" }}
                        >
                            &nbsp;
                        </span>
                    </h5>
                    <div className="row h-50">
                        <div className="col border-right">&nbsp;</div>
                        <div className="col">&nbsp;</div>
                    </div>
                </div>
                <div className="col py-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="float-right text-muted">
                                Wed, Jan 11th 2019 8:30 AM
                            </div>
                            <h4 className="card-title">
                                <span>Day 3</span> Sessions
                            </h4>
                            <p>
                                Shoreditch vegan artisan Helvetica. Tattooed
                                Codeply Echo Park Godard kogi, next level irony
                                ennui twee squid fap selvage. Meggings flannel
                                Brooklyn literally small batch, mumblecore PBR
                                try-hard kale chips. Brooklyn vinyl lumbersexual
                                bicycle rights, viral fap cronut leggings squid
                                chillwave pickled gentrify mustache. 3 wolf moon
                                hashtag church-key Odd Future. Austin messenger
                                bag normcore, Helvetica Williamsburg sartorial
                                tote bag distillery Portland before they sold
                                out gastropub taxidermy Vice.
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <!--/row--> */}
            {/* <!-- timeline item 4 --> */}
            {/* <div className="row">
                <div className="col-auto text-center flex-column d-none d-sm-flex">
                    <div className="row h-50">
                        <div className="col border-right">&nbsp;</div>
                        <div className="col">&nbsp;</div>
                    </div>
                    <h5 className="m-2">
                        <span
                            className="badge badge-pill bg-light border"
                            style={{ borderRadius: "20px" }}
                        >
                            &nbsp;
                        </span>
                    </h5>
                    <div className="row h-50">
                        <div className="col">&nbsp;</div>
                        <div className="col">&nbsp;</div>
                    </div>
                </div>
                <div className="col py-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="float-right text-muted">
                                Thu, Jan 12th 2019 11:30 AM
                            </div>
                            <h4 className="card-title">
                                <span>Day 4</span> Wrap-up
                            </h4>
                            <p>
                                Join us for lunch in Bootsy's cafe across from
                                the Campus Center.
                            </p>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <!--/row--> */}
        </div>
    );
}
