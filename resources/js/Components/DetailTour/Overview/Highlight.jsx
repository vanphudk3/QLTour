export default function Highlight({ children }) {
    return (
        <ul className="list-items">
            <li className="list-item">
                <span className="item_icon">
                    <i className="fa-solid fa-check" />
                </span>
                <span className="list-text">Nepal most popular climb.</span>
            </li>
            <li className="list-item">
                {" "}
                <span className="item_icon">
                    {" "}
                    <i className="fa-solid fa-check" />{" "}
                </span>
                <span className="list-text">
                    Outstanding views of Mt. Everest, Mt. Lhotse, Mt. Makalu
                    from the summit.
                </span>
            </li>
            <li className="list-item">
                {" "}
                <span className="item_icon">
                    {" "}
                    <i className="fa-solid fa-check" />{" "}
                </span>
                <span className="list-text">
                    The perfect experience for adventurers!
                </span>
            </li>
            <li className="list-item">
                <span className="item_icon">
                    {" "}
                    <i className="fa-solid fa-check" />
                </span>{" "}
                <span className="list-text">
                    5-day Prince Edward Island trip from Halifax
                </span>
            </li>
            <li className="list-item">
                <span className="item_icon">
                    {" "}
                    <i className="fa-solid fa-check" />
                </span>{" "}
                <span className="list-text">
                    Explore scenic Prince Edward Island National Park
                </span>
            </li>
            <li className="list-item">
                {" "}
                <span className="item_icon">
                    {" "}
                    <i className="fa-solid fa-check" />
                </span>
                <span className="list-text">
                    Overnight accommodation and all transport included
                </span>
            </li>
        </ul>
    );
}
