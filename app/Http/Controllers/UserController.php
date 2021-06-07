<?php

namespace App\Http\Controllers;

use App\Filters\UserFilters;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(UserFilters $filters)
    {
        return User::filter($filters)
            ->withTrashed()
            ->orderByDesc('updated_at')
            ->paginate(request('per_page'));
    }

    public function store(UserRequest $request): User
    {
        $attributes = $request->validated();
        $attributes['password'] = Hash::make($attributes['password']);

        if ($attributes['status'] === 'inactive') {
            $attributes['deleted_at'] = now();
        } else {
            $attributes['deleted_at'] = null;
        }

        $user = User::create(Arr::except($attributes, ['role', 'status']));
        return $user->syncRoles($attributes['role']);
    }

    public function edit(User $user)
    {
        return $user->load('roles:id,name');
    }

    public function update(UserRequest $request, User $user): User
    {
        $attributes = $request->validated();

        if ($attributes['password']) {
            $attributes['password'] = Hash::make($attributes['password']);
        } else {
            $attributes = Arr::except($attributes, ['password']);
        }

        if ($attributes['status'] === 'inactive') {
            $attributes['deleted_at'] = now();
        } else {
            $attributes['deleted_at'] = null;
        }

        $user->update(Arr::except($attributes, ['role', 'status']));
        return $user->syncRoles($attributes['role']);
    }

    public function destroy(User $user): bool
    {
        try {
            return $user->delete();
        } catch (\Exception $e) {
            return false;
        }
    }

    public function changePassword(ChangePasswordRequest $request): bool
    {
        $user = Auth::user();
        $attributes = $request->validated();
        $attributes['password'] = Hash::make($attributes['password']);

        return $user->update(['password' => $attributes['password']]);
    }
}
