<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
class AuthController extends Controller

{   


    public function register(Request $request){

    $datos = $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',

    ]);

    $user = User::create([
        'name'     => $datos['name'],
        'email'    => $datos['email'],
        'password' => $datos['password'], 
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;
    return response()->json([
        'token' => $token,
        'user' => $user,
    ], 201);

    $user->assignRole('user');
    }





    public function login(Request $request){

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

    if(!Auth::attempt($credentials)){
        return response()->json([
            'message' => 'Credenciales incorrectas'
        ], 401);
    }
    
    $token = $request->user()->createtoken('auth_token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $request->user(),
    ]);   
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesion cerrada correctamente'
        ]);
    }
}
