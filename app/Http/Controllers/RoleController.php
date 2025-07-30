<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use App\Services\RoleService;

class RoleController extends Controller
{
    public function __construct(
        protected RoleService $roleService
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roles = Role::query();

        if($request->filled('search')){
            $search = $request->search;
            $roles->where(fn($query) =>
                $query->where('name', 'like', "%{$search}%")                     
        );
        }

        $roles = $roles->latest()->with('permissions')->paginate(10)->withQueryString();

        $roles->getCollection()->transform(fn($role)=>[
            'id' => $role->id,
            'name'=> $role->name,
            'permissions' => $role->permissions,
            'created_at' => $role->created_at->format('d M Y')
        ]);

        return Inertia::render('roles/index',[
            'roles' => $roles,
            'filters' => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('roles/create',[
            'permissions' => Permission::pluck('name')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'permissions' => 'required'
        ]);

        $role = $this->roleService->create($data);

        return redirect()->route('roles.index')->with(['success' => 'Role Created Successfully']);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = $this->roleService->find($id);
        return Inertia::render('roles/edit',[
            'role' => $role,
            'rolePermissions' => $role->permissions->pluck('name'),
            'permissions' => Permission::pluck('name')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required',
            'permissions' => 'required'
        ]);

        $role = $this->roleService->update($data, $id);

        return redirect()->route('roles.index')->with(['success' => 'Role Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = $this->roleService->delete($id);
        return redirect()->route('roles.index')->with(['success' => 'Role Deleted Successfully']);
    }
}
