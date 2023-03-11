<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(){

        $roles = Role::latest()->paginate(5);
        foreach($roles as $role){
            $role->description = $this->Trancate($role->description, 50);
        }

        return Inertia::render('Role/Index', compact('roles'));
    }

    public function create(){
        return Inertia::render('Role/Create');
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|unique:roles,name',
        ]);

        Role::create([
            'user_id' => auth()->user()->id,
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('role.index')
            ->with('success', 'Role created successfully.');
    }

    public function edit(Role $role){
        return Inertia::render('Role/Edit', [
            'role' => $role
        ]);
    }

    public function update(Request $request, Role $role){
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $role->update([
            'user_id' => auth()->user()->id,
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('role.index')
            ->with('success', 'Role updated successfully');
    }

    public function destroy(Role $role){
        $role->delete();

        return redirect()->route('role.index')
            ->with('success', 'Role deleted successfully');
    }

    public function Trancate($table, int $lenght){
        if(strlen($table) <= $lenght){
            return $table;
        }

        $table = $table." ";
        $table = substr($table, 0, $lenght);
        $table = substr($table, 0, strrpos($table, ' '));
        $table = $table."...";
        return $table;
    }
}
