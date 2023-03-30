<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $roles = Role::all();
        return Inertia::render('Auth/Register', compact('roles'));
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $getAddress = $request->address;
        $getCity = $request->city;
        $getdistrict = $request->district;
        $getWard = $request->ward;

        $getAddress = str_replace(' ', ' ', $getAddress);
        $getCity = str_replace(' ', ' ', $getCity);
        $getdistrict = str_replace(' ', ' ', $getdistrict);
        $getWard = str_replace(' ', ' ', $getWard);

        $getAddress = $getAddress . ', ' . $getWard . ', ' . $getdistrict . ', ' . $getCity;

        $request->merge(['role' => 'employee']);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $getAddress,
            'role' => $request->role,
        ]);

        event(new Registered($user));

        Auth::login($user);
        if($user->role == 'admin'){
            return Inertia::render('Admin/Dashboard');
        }else{
            return redirect(RouteServiceProvider::HOME);
        }
    }
}
