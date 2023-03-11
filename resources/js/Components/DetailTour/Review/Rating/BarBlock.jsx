export default function BarBlock({ children }) {
    return (
        <span className="bar-block">
            <span id="bar-five" className="bar">
                <span>{children}</span>
                &nbsp;
            </span>
        </span>
    );
}
