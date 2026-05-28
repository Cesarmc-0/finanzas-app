<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\GastoController;
use App\Http\Controllers\IngresoController;

Route:: post('/login', [AuthController::class,'login']);

Route:: middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('categorias',CategoriaController::class);
    Route::apiResource('gastos', GastoController::class);
    Route::apiResource('ingresos',IngresoController::class);
});
