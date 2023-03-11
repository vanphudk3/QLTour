export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-head">
                <div className="inner">
                    <div className="row">
                        <div className="col" style={{paddingRight: 0}}>
                            <div className="inner-column">
                                <h2 className="heading-title">
                                    Sign Up for Our Newsletter
                                </h2>
                                <p>
                                    Save up to 50% on tours and trips. Get
                                    instant access to lower prices.
                                </p>
                                <form action="">
                                    <div className="contact-email">
                                        <input
                                            type="email"
                                            placeholder="Enter your Email address"
                                        />
                                    </div>
                                    <div className="submit-email">
                                        <button
                                            type="submit"
                                            className="btn-subscribe"
                                        >
                                            Subscribe{" "}
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col" style={{paddingLeft: 0}}>
                            <div
                                className="inner-column"
                                style={{backgroundColor: "#edf1f4"}}
                            >
                                <h2 className="heading-title">
                                    24/7 Customer Support
                                </h2>
                                <p>
                                    Contact us now to have all of your
                                    tour-related question answered.
                                </p>
                                <div className="contact">
                                    <div className="contact-us">
                                        <img
                                            src="/images/footer_img01.png"
                                            alt=""
                                        />
                                        <img
                                            src="/images/footer_img02.png"
                                            alt=""
                                        />
                                        <img
                                            src="/images/footer_img03.png"
                                            alt=""
                                        />
                                        <img
                                            src="/images/footer_img04.png"
                                            alt=""
                                        />
                                        <img
                                            src="/images/footer_img05.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="chat-us">
                                        <a href="" className="btn-subscribe">
                                            Subscribe{" "}
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-middle">
                <div className="inner">
                    <div className="row">
                        <div className="col-4">
                            <div className="footer-title">
                                <h2 className="heading-title">
                                    TOP DESTINATIONS
                                </h2>
                            </div>
                            <ul className="list-items">
                                <li className="list-item w-50">
                                    <a href="">Las Vegas</a>
                                </li>
                                <li className="list-item w-50">
                                    <a href="">San Francisco</a>
                                </li>
                                <li className="list-item w-50">
                                    <a href="">Sydney</a>
                                </li>
                                <li className="list-item w-50">
                                    <a href="">New York City</a>
                                </li>
                                <li className="list-item w-50">
                                    <a href="">Las Vegas</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-2">
                            <div className="footer-title">
                                <h2 className="heading-title">COMPANY</h2>
                            </div>
                            <ul className="list-items">
                                <li className="list-item">
                                    <a href="">Contact us</a>
                                </li>
                                <li className="list-item">
                                    <a href="">About us</a>
                                </li>
                                <li className="list-item">
                                    <a href="">Travel Guides</a>
                                </li>
                                <li className="list-item">
                                    <a href="">Data Policy</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <div className="footer-title">
                                <h2 className="heading-title">COMMUNITY</h2>
                            </div>
                            <ul className="list-items">
                                <li className="list-item">
                                    <a href="">Adventure</a>
                                </li>
                                <li className="list-item">
                                    <a href="">Celebration</a>
                                </li>
                                <li className="list-item">
                                    <a href="">Family</a>
                                </li>
                                <li className="list-item">
                                    <a href="">Honeymoon</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <div className="footer-logo">
                                <a href="" className="logo">
                                    <img
                                        src="/images/logo.svg"
                                        alt="logo"
                                    />
                                </a>
                            </div>
                            <div className="footer-address">
                                <a href="">
                                    Khu 2, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều,
                                    Tp. Cần Thơ
                                </a>
                            </div>
                            <div className="footer-phone">
                                <a href="">(+84) 1234 5678 90</a>
                            </div>
                            <div className="footer-mail">
                                <a href="">emb1910059@student.ctu.edu.vn</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container-layout">
                    <div className="inner">
                        <div className="row">
                            <div className="col">
                                <div className="footer-layout">
                                    <p>
                                        © 2022 <a href="">Zourney</a>. All
                                        rights reserved.
                                    </p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="footer-layout">
                                    <ul className="inline-items">
                                        <li className="inline-item">
                                            <a href="">Terms & Conditions</a>
                                        </li>
                                        <li className="inline-item">
                                            <a href="">Cookies</a>
                                        </li>
                                        <li className="inline-item">
                                            <a href="">Privacy Policy</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col">
                                <div className="footer-layout">
                                    <div className="social-icons">
                                        <span className="grid-item">
                                            <a href="">
                                                <i className="fa-brands fa-facebook"></i>
                                            </a>
                                        </span>
                                        <span className="grid-item">
                                            <a href="">
                                                <i className="fa-brands fa-twitter"></i>
                                            </a>
                                        </span>
                                        <span className="grid-item">
                                            <a href="">
                                                <i className="fa-brands fa-instagram"></i>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
