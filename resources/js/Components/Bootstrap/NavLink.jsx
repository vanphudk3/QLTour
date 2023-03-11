import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children, className }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'nav-link choose-menu'
                    : 'nav-link'
                    + (className ? ' ' + className : '')
            }
        >
            {children}
        </Link>
    );
}
