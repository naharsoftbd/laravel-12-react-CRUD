<?php

namespace App\Services;

use App\Interfaces\PermissionRepositoryInterface;
use Spatie\Permission\Models\Permission;

class PermissionService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected PermissionRepositoryInterface $permissionRepository)
    {
        //
    }

    public function create(array $data): ?Permission
    {
        return $this->permissionRepository->create($data);
    }

    public function update(array $data, int $id): int
    {
        return $this->permissionRepository->update($data, $id);
    }

    public function delete(int $id): bool
    {
       return $this->permissionRepository->delete($id);
    }

    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->permissionRepository->all();
    }

    public function find(int $id): ?Permission
    {
        return $this->permissionRepository->find($id);
    }
}
