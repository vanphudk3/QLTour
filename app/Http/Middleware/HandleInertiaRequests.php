<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'booking' => [
                'detailTour' => $request->session()->get('detailTour'),
                'district' => $request->session()->get('districts'),
            ],
            // 'getBooking' => $request->session()->get('getBooking'),
            'error' => $request->session()->get('error'),
            'msgorder' => [
                'success' => $request->session()->get('success'),
            ],
            'slugTour' => [
                'slug' => $request->session()->get('slug'),
                'name' => $request->session()->get('name'),
            ],
            'managerTour' => [
                'error' => $request->session()->get('error'),
            ],
            'login' => [
                'error' => $request->session()->get('error_email'),
                'error_server' => $request->session()->get('error_server'),
                'success' => $request->session()->get('success'),
                'customer' => $request->session()->get('customer'),
                'remember' => $request->cookie('remember'),
            ],
            'register' => [
                'error' => $request->session()->get('error_register'),
                'success' => $request->session()->get('success'),
            ],
            'profile' => [
                'error' => $request->session()->get('error'),
                'success' => $request->session()->get('updateprofile'),
            ],
        ]);
    }
}
