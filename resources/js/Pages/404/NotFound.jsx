import Content from "@/Layouts/DetailTour";
import { Head, Link, usePage } from "@inertiajs/react";

export default function NotFound(props) {
    const data = usePage().props;
    console.log(data);
    return (
        <>
            <Head title="404" />
            {/* <Content> */}
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="error-content text-center">
                                <h1>Opps!</h1>
                                <h2>404 - PAGE NOT FOUND</h2>
                                <p>
                                    The page you are looking for might have been
                                    removed had its name changed or is
                                    temporarily unavailable.
                                </p>
                                <Link href="/">Go To Homepage</Link>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </Content> */}
        </>
    );
}
