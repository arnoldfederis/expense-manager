<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = $this->users();

        foreach ($users as $user) {
            $createdUser = User::create(Arr::except($user, ['role']));
            $createdUser->syncRoles($user['role']);
        }
    }

    public function users(): array
    {
        return [
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin'),
                'role' => 'admin'
            ],
            [
                'name' => 'User',
                'email' => 'user@user.com',
                'password' => Hash::make('user'),
                'role' => 'user'
            ]
        ];
    }
}
