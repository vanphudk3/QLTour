import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'cl-black cl-black-hover text-decor-none choose-menu'
                    : 'cl-black cl-black-hover text-decor-none'
            }
        >
            {children}
        </Link>
    );
}
