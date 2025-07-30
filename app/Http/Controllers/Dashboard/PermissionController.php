<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use App\Services\PermissionService;

class PermissionController extends Controller
{
    public function __construct(protected PermissionService $permissionService) 
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $permissions = Permission::query();

        if($request->filled('search')){
            $search = $request->search;
            $permissions->where(fn($query) =>
                $query->where('name', 'like', "%{$search}%")                     
        );
        }

        $permissions = $permissions->latest()->with('permissions')->paginate(10)->withQueryString();

        $permissions->getCollection()->transform(fn($permission)=>[
            'id' => $permission->id,
            'name'=> $permission->name,
            'created_at' => $permission->created_at->format('d M Y')
        ]);

        return Inertia::render('permissions/index',[
            'permissions' => $permissions,
            'filters' => $request->search
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('permissions/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
        ]);

        $permission = $this->permissionService->create($data);

        return redirect()->route('permissions.index')->with(['success' => 'Permission Created Successfully']);
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
        $permission = $this->permissionService->find( $id);
        return Inertia::render('permissions/edit',[
            'permission' => $permission
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required',
        ]);

        $permission = $this->permissionService->update($data, $id);

        return redirect()->route('permissions.index')->with(['success' => 'Permission Updated Successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $permission = $this->permissionService->delete($id);
        return redirect()->route('permissions.index')->with(['success' => 'Permission Deleted Successfully']);
    }
}
