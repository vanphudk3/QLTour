import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children, className }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'nav-link active'
                    : 'nav-link active'
                    + (className ? ' ' + className : '')
            }
        >
            {children}
        </Link>
    );
}
