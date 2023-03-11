export default function Description({ children }) {
    return (
        <div className="box">
            <input type="checkbox" name="readmore" id="readmore" />
            <div className="content">
                <div className="des">{children}</div>
                <div className="button">
                    <label
                        for="readmore"
                        data-more="View More"
                        data-less="View Less"
                    ></label>
                </div>
            </div>
        </div>
    );
}
