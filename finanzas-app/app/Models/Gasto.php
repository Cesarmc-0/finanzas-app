<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    protected $fillable = ['user_id','categoria_id', 'monto', 'descripcion', 'fecha'];

    public function categoria(){
        return $this->belongsTo(Categoria::class);
    }

    public static function porMes($userId){
        return self::where('user_id', $userId)
        ->selectRaw("TO_CHAR(fecha, 'Mon') as mes, SUM(monto) as total")
        ->groupByRaw("TO_CHAR(fecha, 'Mon'), EXTRACT(MONTH FROM fecha)")
        ->orderByRaw("EXTRACT(MONTH FROM fecha)")
        ->get();
    }

  public static function porCategoria($userId) {
      return self::where('user_id', $userId)
          ->selectRaw('categoria_id, SUM(monto) as total')
          ->with('categoria')
          ->groupBy('categoria_id')
          ->get();
  }

}  
