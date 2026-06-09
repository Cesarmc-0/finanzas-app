<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AdminController extends Controller
{
    public function index(){
    $users = User::allUsers();
    return response()->json($users);
    }

    public function destroy($id){
    $userAuth = Auth::user();
        if($userAuth->id == $id){
            return response()->json([
                'message' => 'No puedes eliminarte a ti mismo'
            ], 403);         
        }

    $userDestroy = User::deleteById($id);

    if($userDestroy){
        return response()->json([
            'message' => 'Usuario eliminado exitosamente'
        ], 200);
    }else{
        return response()->json([
            'message' => 'Usuario no encontrado'
        ], 404);
    }


    }

    public function toggleActivo($id){
        User::updateStatusById($id);
        return response()->json([
            'message' => 'Estado del usuario actualizado'
        ]);
    }

}
