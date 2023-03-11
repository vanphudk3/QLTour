export default function HistoStar({ children }) {
    return (
        <span className="histo-star">
            <i className="active icon-star"></i> {children}{" "}
        </span>
    );
}
