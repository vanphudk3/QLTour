<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        $users = User::all();
        $roles = Role::all();
        return Inertia::render('Account/Index', compact('users', 'roles'));
    }

    public function create()
    {
        $roles = Role::all();
        return Inertia::render('Account/Create', compact('roles'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'max:255'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->roles()->attach($request->role);

        return redirect()->route('account.index');
    }

    public function edit(User $account)
    {
        
        #region Get Role
        if($account->role != ''){
            $role = Role::where('name', $account->role)->first('id');
            $account->role = $role->id;
        }
        #endregion
        $roles = Role::all();
        return Inertia::render('Account/Edit', compact('account', 'roles'));
    }

    public function update(Request $request, User $account)
    {
        if($request->role_id){
            $roles = Role::where('id', $request->role_id)->first('name');
            $roles->name = strtolower($roles->name);
            // dd($account);
            $account->role = $roles->name;
            $account->save();
            // $account->roles()->sync($request->role);
        }

        return redirect()->route('account.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('account.index');
    }
}
