<?php

namespace App\Interfaces;

use App\Models\Product;

interface ProductRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection;

    public function create(array $data): ?Product;

    public function update(array $data, int $id): int;

    public function delete(int $id): bool;

    public function find(int $id): ?Product;
}