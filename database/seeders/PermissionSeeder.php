<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Support\Facades\Hash;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'View',
            'Create',
            'Edit',
            'Delete'
        ];

        foreach($permissions as $key => $value){
            Permission::create(['name' => $value]);
        }

      $role = Role::create(['name' => 'Admin']);
      $role->givePermissionTo('View');
      $role->givePermissionTo('Create');
      $role->givePermissionTo('Edit');
      $role->givePermissionTo('Delete');

      
      $user = \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'abujafarmdsalah@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
        $user->assignRole($role);
    }
}
