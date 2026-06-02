<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingreso;

class IngresoController extends Controller
{
 
    public function index()
    {
        $ingresos = auth()->user()->ingresos()->with('categoria')->get();
        return response()->json($ingresos);
    }


    public function store(Request $request)
    {
        $datos = $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'monto'        => 'required|numeric|min:0',
            'descripcion'  => 'nullable|string|max:255',
            'fecha'        => 'required|date',
        ]);

        $datos['user_id'] = auth()->id();

        $ingreso = Ingreso::create($datos);

        return response()->json($ingreso, 201);
    }


    public function show(string $id)
    {
        $ingreso = auth()->user()->ingresos()->findOrFail($id);
        return response()->json($ingreso);
    }

    public function update(Request $request, string $id)
    {
        $ingreso = auth()->user()->ingresos()->findOrFail($id);

        $datos = $request->validate([
        'categoria_id' => 'sometimes|exists:categorias,id',
        'monto'        => 'sometimes|numeric|min:0',
        'descripcion'  => 'nullable|string|max:255',
        'fecha'        => 'sometimes|date',
        ]);

        $ingreso->update($datos);
        return response()->json($ingreso);
    }


    public function destroy(string $id) {
        $ingreso = auth()->user()->ingresos()->findOrFail($id);

        $ingreso->delete();

        return response()->json(null, 204);
    }
}
