<?php

namespace App\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection;

    public function create(array $data, $password, $roles): ?User;

    public function update(array $data, int $id): int;

    public function delete(int $id): bool;

    public function find(int $id): ?User;
}