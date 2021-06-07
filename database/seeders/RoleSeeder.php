<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = $this->roles();

        foreach ($roles as $role) {
            Role::updateOrCreate($role);
        }
    }

    protected function roles(): array
    {
        return [
            ['name' => 'admin'],
            ['name' => 'user'],
        ];
    }
}
