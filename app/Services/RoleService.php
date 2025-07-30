<?php

namespace App\Services;
use App\Interfaces\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;

class RoleService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected RoleRepositoryInterface $roleRepository)
    {
        //
    }

    public function create(array $data): ?Role
    {
        return $this->roleRepository->create($data);
    }

    public function update(array $data, int $id): int
    {
        return $this->roleRepository->update($data, $id);
    }

    public function delete(int $id): bool
    {
       return $this->roleRepository->delete($id);
    }

    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->roleRepository->all();
    }

    public function find(int $id): ?Role
    {
        return $this->roleRepository->find($id);
    }
}
