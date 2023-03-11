import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard(props) {

    const data = usePage().props;
    console.log(data);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="heading-title">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="row shadow">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Welcome back, {props.auth.user.name}!</h5>
                            <p className="card-text">
                                This is your dashboard. You can view your profile, update your password, and view your API token.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
