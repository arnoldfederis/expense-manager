<?php

namespace App\Http\Controllers;

use App\Filters\RoleFilters;
use App\Http\Requests\RoleRequest;
use App\Models\Role;
use Illuminate\Support\Arr;

class RoleController extends Controller
{
    public function index(RoleFilters $filters)
    {
        if (request('get_all')) {
            return Role::filter($filters)->get();
        }

        return Role::filter($filters)
            ->orderByDesc('updated_at')
            ->paginate(request('per_page'));
    }

    public function store(RoleRequest $request): Role
    {
        $attributes = $request->validated();
        $role = Role::create(Arr::only($attributes, ['name']));
        return $role->syncPermissions($attributes['permissions']);
    }

    public function edit(Role $role): Role
    {
        return $role->load('permissions:id,name');
    }

    public function update(RoleRequest $request, Role $role): Role
    {
        $attributes = $request->validated();
        $role->update(Arr::only($attributes, ['name']));
        return $role->syncPermissions($attributes['permissions']);
    }

    public function destroy(Role $role): bool
    {
        try {
            return $role->delete();
        } catch (\Exception $e) {
            return false;
        }
    }
}
