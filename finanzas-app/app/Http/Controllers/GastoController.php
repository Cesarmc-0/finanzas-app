<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;
class GastoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gastos =auth()->user()->gastos;

        return response()->json($gastos);
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

        $gastos= Gasto::create($datos);

        return response()->json($gastos, 201);

    }


    public function show(string $id)
    {
        $gasto = auth()->user()->gastos()->findOrFail($id);
        return response()->json($gasto);
    }

    public function update(Request $request, string $id)
    {
        $gasto = auth()->user()->gastos()->findOrFail($id);

        $datos = $request->validate([
        'categoria_id' => 'sometimes|exists:categorias,id',
        'monto'        => 'sometimes|numeric|min:0',
        'descripcion'  => 'nullable|string|max:255',
        'fecha'        => 'sometimes|date',
        ]);

        $gasto->update($datos);

        return response()->json($gasto);
    }

    public function destroy(string $id)
    {
        $gasto =auth()->user()->gastos()->findOrFail($id);

        $gasto->delete();

        return response()->json(null, 204);
    }
}
