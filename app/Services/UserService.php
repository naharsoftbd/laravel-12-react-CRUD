<?php

namespace App\Services;

use App\Models\User;
use App\Interfaces\UserRepositoryInterface;

class UserService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected UserRepositoryInterface $userRepository)
    {
        //
    }

    public function create(array $data, $password, $roles): User
    {
        return $this->userRepository->create($data, $password, $roles);
    }

    public function update(array $data, int $id): int
    {
        return $this->userRepository->update($data, $id);
    }

    public function delete(int $id): bool
    {
        return $this->userRepository->delete($id);
    }

    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->userRepository->all();
    }

    public function find(int $id): ?User
    {
        return $this->userRepository->find($id);
    }
}
