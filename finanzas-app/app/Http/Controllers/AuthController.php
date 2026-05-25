<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller

{
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
        $request->user()-currentAccessToken()-delete();

        return response()-json([
            'message' => 'Sesion cerrada correctamente'
        ]);
    }
}
