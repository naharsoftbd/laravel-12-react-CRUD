<?php

namespace App\Repositories;

use App\Models\User;
use App\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return User::all();
    }

    public function create(array $data, $password, $roles): ?User
    {
        $user = User::create($data + [
            'password' => Hash::make($password)
        ]);

        $user->syncRoles($roles);
        return $user;
    }

    public function update(array $data, int $id): int
    {
        $user = User::findOrFail($id);

        return $user->update($data);
    }

    public function delete(int $id): bool
    {
        $user = User::findOrFail($id);

        return $user->delete();
    }

    public function find(int $id): ?User
    {
        return User::find($id);
    }
}