<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SignupController extends Controller
{
    public function signup(SignupRequest $request): array
    {
        $attributes = $request->validated();
        $attributes['password'] = Hash::make($attributes['password']);

        $user = User::create($attributes);
        $user->syncRoles('user');

        return [
            'token' => $user->createToken('access_token', $user->permissions)->plainTextToken,
            'message' => 'Signup Success.'
        ];
    }
}
