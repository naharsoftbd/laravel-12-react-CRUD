<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

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
    }
}
