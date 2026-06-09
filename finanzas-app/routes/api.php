<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\GastoController;
use App\Http\Controllers\IngresoController;
use App\Http\Controllers\ResumenController;
use App\Http\Controllers\AdminController;

Route:: post('/login', [AuthController::class,'login']);

Route::post('/verify', [AuthController::class,'verify']);

Route::post('/register',[AuthController::class,'register']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function(){
    Route::get('/admin/usuarios',[AdminController::class,'index']);
    Route::patch('/admin/usuarios/{id}/toggle', [AdminController::class, 'toggleActivo']);
    Route::delete('/admin/usuarios/{id}', [AdminController::class, 'destroy']);
});


Route:: middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('categorias',CategoriaController::class);
    Route::apiResource('gastos', GastoController::class);
    Route::apiResource('ingresos',IngresoController::class);
    
    Route::get('/resumen', [ResumenController::class, 'index']);
});
