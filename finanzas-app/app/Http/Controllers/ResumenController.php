<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ingreso;
use App\Models\Gasto;


class ResumenController extends Controller
{
    private function totales($user){
        return [
            'ingresos' => $user->ingresos()->sum('monto'),
            'gastos' => $user->gastos()->sum('monto'),
        ];
    }
    
    private function porMes($user) {
      return [
          'ingresos' => Ingreso::porMes($user->id),
          'gastos'   => Gasto::porMes($user->id),
      ];
    }


    private function PorCategoria($user){
        return Gasto::porCategoria($user->id);
    }

    public function index(){
        $user = auth()->user();

        return response()->json([
            'totales' => $this->totales($user),
            'por_mes' => $this->porMes($user),
            'por_categoria' => $this->porCategoria($user),
        ]);
    }
}
