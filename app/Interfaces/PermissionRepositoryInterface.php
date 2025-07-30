<?php

namespace App\Interfaces;

use Spatie\Permission\Models\Permission;

interface PermissionRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection;

    public function create(array $data): ?Permission;

    public function update(array $data, int $id): int;

    public function delete(int $id): bool;

    public function find(int $id): ?Permission;
}