<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index(){
        $categorias = auth()->user()->categorias;
        return response()->json($categorias);
    }

    public function store(Request $request){
        $datos =$request->validate([
            'nombre' => 'required|string|max:100',
          'tipo'   => 'required|in:gasto,ingreso',
          'color'  => 'nullable|string|max:7',
        ]);

        $datos['user_id'] = auth()->id();
        $categoria = Categoria::create($datos);

        return response()->json($categoria, 201);

        }

    public function show(string $id){
        $categoria = auth()->user()->categorias()->findOrFail($id);

        return response()->json($categoria);
    }   

    public function update(Request $request, string $id){
        $categoria = auth()->user()->categorias()->findOrFail($id);

        $datos = $request->validate([
            'nombre' => 'sometimes|string|max:100',
            'tipo' => 'sometimes|in:gasto,ingreso',
            'color'  => 'nullable|string|max:7',
        ]);

        $categoria->update($datos);
        return response()->json($categoria);
    }

    public function destroy(string $id){
        $categoria = auth()->user()->categorias()->findOrFail($id);

        $categoria->delete();
        return response()->json(null, 204);
    }
}
