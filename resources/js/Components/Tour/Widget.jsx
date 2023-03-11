export default function Widget() {
    return (
        <>
            <div className="widget widger-price">
                <div className="title">Price Range</div>
                <div className="price-range-slider">
                    <div id="slider-range" className="range-bar">
                        <input
                            id="pi_input"
                            type="range"
                            min="300"
                            max="800"
                            step="1"
                        />
                        <p>
                            300k - <output id="value"></output>k
                        </p>
                    </div>
                </div>
            </div>
            <div className="widget widget-category">
                <div className="title">Categories</div>
                <div className="babe-search-filter-items">
                    <div className="term-item">
                        <input type="checkbox" id="adventure"></input>
                        <label for="adventure">Adventure</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="beaches"></input>
                        <label for="beaches">Beaches</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="citytour"></input>
                        <label for="citytour">City Tour</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="hiking"></input>
                        <label for="hiking">Hiking</label>
                    </div>
                </div>
            </div>
            <div className="widget widget-destination">
                <div className="title">Destinations</div>
                <div className="babe-search-filter-items">
                    <div className="term-item term-level-0">Afica</div>
                    <div className="term-item">
                        <input type="checkbox" id="morocco"></input>
                        <label for="morocco">Morocco</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="tanzania"></input>
                        <label for="tanzania">Tanzania</label>
                    </div>
                    <div className="term-item term-level-0">Americas</div>
                    <div className="term-item">
                        <input type="checkbox" id="canada"></input>
                        <label for="canada">Canada</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="argentina"></input>
                        <label for="argentina">Argentina</label>
                    </div>
                </div>
            </div>
            <div className="widget widget-reviews">
                <div className="title">Reviews</div>
                <div className="babe-search-filter-items">
                    <div className="term-item">
                        <input type="checkbox" id="5star"></input>
                        <label for="5star">5 Star</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="4star"></input>
                        <label for="4star">4 Star & Up</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="3star"></input>
                        <label for="3star">3 Star & Up</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="2star"></input>
                        <label for="2star">2 Star & Up</label>
                    </div>
                    <div className="term-item">
                        <input type="checkbox" id="1star"></input>
                        <label for="1star">1 Star & Up</label>
                    </div>
                </div>
            </div>
            <div className="widget widget-post-list">
                <div className="title">Last Minute Deals</div>
                <div className="babe-search-filter-items">
                    <div className="babe-items">
                        <div className="babe-items__inner">
                            <div className="item-img">
                                <div className="img-thumb">
                                    <img
                                        src="./images/home/tour_9.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="item-text">
                                <div className="item-title">
                                    <a href="">
                                        Maldives Sightseeing Adventure Tour
                                    </a>
                                </div>
                                <div className="item-info-price">
                                    <label for="">From</label>
                                    <span className="item-info-price-new">
                                        <span
                                            className="currency-amount"
                                            data-amount="177"
                                        >
                                            <span className="currency-symbol">
                                                $
                                            </span>
                                            177
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="babe-items">
                        <div className="babe-items__inner">
                            <div className="item-img">
                                <div className="img-thumb">
                                    <img
                                        src="./images/home/tour_9.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="item-text">
                                <div className="item-title">
                                    <a href="">
                                        Maldives Sightseeing Adventure Tour
                                    </a>
                                </div>
                                <div className="item-info-price">
                                    <label for="">From</label>
                                    <span className="item-info-price-new">
                                        <span
                                            className="currency-amount"
                                            data-amount="177"
                                        >
                                            <span className="currency-symbol">
                                                $
                                            </span>
                                            177
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
