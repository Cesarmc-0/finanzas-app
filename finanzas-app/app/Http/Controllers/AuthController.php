<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use App\Mail\VerificationCodeMail;
use App\Mail\WelcomeMail;
use App\Models\User;
class AuthController extends Controller

{   


    public function register(Request $request){

    $datos = $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',

    ],
    [
    'email.unique'       => 'Este email ya está registrado.',
    'password.confirmed' => 'Las contraseñas no coinciden.',
    'name.required'      => 'El nombre es obligatorio.',
    ]
    );

    $user = User::create([
        'name'     => $datos['name'],
        'email'    => $datos['email'],
        'password' => $datos['password'], 
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    $user->assignRole('user');

    Mail::to($user->email)->send(new WelcomeMail($user->name));

    return response()->json([
        'token' => $token,
        'user' => $user,
    ], 201);

    
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

    $user = Auth::user();
    if($user->activo == false){
        return response()->json([
            'message' => 'Tu cuenta está desactivada'
        ], 403);
    }

    $codigo = rand(100000, 999999);
    Cache::put('verification:'. $user->id, $codigo, 300);
    
    Mail::to($user->email)->send(new VerificationCodeMail($codigo));
    
    return response()->json([
        'message' => "Código de verificación enviado a tu correo",
    ]);   
    }

    public function verify(Request $request){

    $credentials = $request->validate([
      'email' => ['required', 'email'],
      'codigo' => ['required', 'digits:6'],
    ]);

    $user = User::findByEmail($request->email);

    $codigoGuardado = Cache::get('verification:'. $user->id);

    if($codigoGuardado != $request->codigo){
        return response()->json([
            'message' => 'Código inválido o expirado'
        ], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;
    $user->load('roles');
    return response()->json([
        'token' => $token,
        'user' => $user,
        'rol' =>  $user->roles->first()->name ?? null
    ]); 

    }


    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesion cerrada correctamente'
        ]);
    }
}
