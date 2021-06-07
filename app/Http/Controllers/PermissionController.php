<?php

namespace App\Http\Controllers;

use App\Filters\PermissionFilters;
use App\Http\Requests\PermissionRequest;
use App\Models\Permission;

class PermissionController extends Controller
{
    public function index(PermissionFilters $filters)
    {
        if (request('get_all')) {
            return Permission::filter($filters)->get();
        }

        return Permission::filter($filters)
            ->orderByDesc('updated_at')
            ->paginate(request('per_page'));
    }

    public function store(PermissionRequest $request): Permission
    {
        return Permission::create($request->validated());
    }

    public function edit(Permission $permission): Permission
    {
        return $permission;
    }

    public function update(PermissionRequest $request, Permission $permission): bool
    {
        return $permission->update($request->validated());
    }

    public function destroy(Permission $permission): bool
    {
        try {
            return $permission->delete();
        } catch (\Exception $e) {
            return false;
        }
    }
}
