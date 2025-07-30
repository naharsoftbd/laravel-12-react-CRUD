<?php

namespace App\Repositories;

use App\Interfaces\PermissionRepositoryInterface;
use Spatie\Permission\Models\Permission;


class PermissionRepository implements PermissionRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return Permission::all();
    }

    public function create(array $data): ?Permission
    {
        $permission = Permission::create(['name' => $data['name']]);

        return $permission;
    }

    public function update(array $data, int $id): int
    {
        $permission = Permission::findOrFail($id);
        
        $permission->update(['name' => $data['name']]);

        return $id;
    }

    public function delete(int $id): bool
    {
        $permission = Permission::findOrFail($id);

        return $permission->delete();
    }

    public function find(int $id): ?Permission
    {
        return Permission::find($id);
    }
}