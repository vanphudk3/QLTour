<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Locale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        if (session()->has('locale')) {
            app()->setLocale(session()->get('locale'));
            // redirect()->route('welcome-locale', ['locale' => session()->get('locale')]);

        } else {
            app()->setLocale(config('app.locale'));
        }

        return $next($request);
    }
}
