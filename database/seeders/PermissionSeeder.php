<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = Role::all();

        foreach ($roles as $role) {
            switch ($role->name) {
                case 'admin':
                    $role->syncPermissions(self::adminPermission());
                    break;
                case 'user':
                    $role->syncPermissions(self::userPermission());
                    break;
            }
        }
    }

    public static function adminPermission(): array
    {
        $data = [];
        $permissions = [
            ['name' => 'add_expense'],
            ['name' => 'delete_expense'],
            ['name' => 'edit_expense'],
            ['name' => 'view_expense'],

            ['name' => 'add_expense_category'],
            ['name' => 'delete_expense_category'],
            ['name' => 'edit_expense_category'],
            ['name' => 'view_expense_category'],

            ['name' => 'add_permission'],
            ['name' => 'delete_permission'],
            ['name' => 'edit_permission'],
            ['name' => 'view_permission'],

            ['name' => 'add_role'],
            ['name' => 'delete_role'],
            ['name' => 'edit_role'],
            ['name' => 'view_role'],

            ['name' => 'add_user'],
            ['name' => 'delete_user'],
            ['name' => 'edit_user'],
            ['name' => 'edit_user_role'],
            ['name' => 'view_user'],

            ['name' => 'view_setting'],
            ['name' => 'edit_password'],
        ];

        foreach ($permissions as $permission) {
            $data[] = Permission::updateOrCreate($permission);
        }

        return $data;
    }

    public static function userPermission(): array
    {
        $data = [];
        $permissions = [
            ['name' => 'add_expense'],
            ['name' => 'delete_expense'],
            ['name' => 'edit_expense'],
            ['name' => 'view_expense'],

            ['name' => 'view_setting'],
            ['name' => 'edit_password'],
        ];

        foreach ($permissions as $permission) {
            $data[] = Permission::updateOrCreate($permission);
        }

        return $data;
    }
}
