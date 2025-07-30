<?php

namespace App\Services;

use App\Models\Product;
use App\Interfaces\ProductRepositoryInterface;

class ProductService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected ProductRepositoryInterface $productRepository)
    {
        //
    }

    public function create(array $data): Product
    {
        return $this->productRepository->create($data);
    }

    public function update(array $data, int $id): int
    {
        return $this->productRepository->update($data, $id);
    }

    public function delete(int $id): bool
    {
        return $this->productRepository->delete($id);
    }

    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->productRepository->all();
    }

    public function find(int $id): ?Product
    {
        return $this->productRepository->find($id);
    }
}
