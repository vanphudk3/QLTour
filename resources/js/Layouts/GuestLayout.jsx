import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className=" flex flex-col justify-center items-center vh-100 container py-10 h-100">
            <div className="row d-flex justify-content-center align-items-center shadow">
                <Link href="/" className="text-align">
                    <img src="../images/logo.svg" alt="logo" className="w-32" />
                </Link>
                {children}
            </div>
        </div>
    );
}
