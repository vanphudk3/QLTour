

export default function LayoutFirst({children, href}){
    return (
        <div className="tour-content__item-grid">
            <div className="inner">
                <a 
                    href={href}
                    className="inner-cta"
                >
                    {children}
                </a>
            </div>
        </div>
    );
}