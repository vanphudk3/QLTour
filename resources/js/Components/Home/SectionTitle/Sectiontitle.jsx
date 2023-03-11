

export default function Sectiontitle({children}) {
    return (
        <div className="section-title">
            {children}
            <div className="wrap-divider">
                <div className="container-divider">
                    <div className="divider-separator"></div>
                </div>
            </div>
        </div>
    );
}