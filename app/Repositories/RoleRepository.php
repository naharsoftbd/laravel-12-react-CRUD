<?php

namespace App\Repositories;

use App\Interfaces\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;


class RoleRepository implements RoleRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return Role::all();
    }

    public function create(array $data): ?Role
    {
        $role = Role::create(['name' => $data['name']]);
        $role->syncPermissions($data['permissions']);

        return $role;
    }

    public function update(array $data, int $id): int
    {
        $role = Role::findOrFail($id);
        
        $role->update(['name' => $data['name']]);
        $role->syncPermissions($data['permissions']);

        return $id;
    }

    public function delete(int $id): bool
    {
        $role = Role::findOrFail($id);

        return $role->delete();
    }

    public function find(int $id): ?Role
    {
        return Role::find($id);
    }
}