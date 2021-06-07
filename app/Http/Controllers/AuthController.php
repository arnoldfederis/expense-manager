<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(AuthRequest $request): array
    {
        $credentials = $request->validated();

        $user = User::whereEmail($credentials['email'])->first();

        if (!$user || !password_verify($credentials['password'], $user->password)) {
            abort(401, __('auth.failed'));
        }

        return [
            'token' => $user->createToken('access_token', $user->permissions)->plainTextToken,
            'message' => 'Login Success.'
        ];
    }

    public function logout(Request $request): array
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return ['message' => 'Logged Out.'];
        } catch (\Exception $e) {
            return ['message' => $e->getMessage()];
        }
    }

    public function me(): array
    {
        $user = Auth::user();

        return [
            'user' => $user,
            'role' => $user->role_name,
            'permissions' => $user->permissions
        ];
    }
}
