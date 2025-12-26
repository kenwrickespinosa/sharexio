<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response([
                'message' => 'Incorrect credentials',
            ], 401);
        }

        $token = $user->createToken('token');

        // $res = ['user' => $user, 'token' => $token->plainTextToken];

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user
        ]);
    }

    public function signup(Request $request)
    {
        $validated = $request->validate([
            'firstname' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'gender' => 'required|string',
            'birthdate' => 'required',
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::create([
            'firstname' => $validated['firstname'],
            'lastname' => $validated['lastname'],
            'gender' => $validated['gender'],
            'birthdate' => $validated['birthdate'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'User logged out',
        ]);
    }
}
