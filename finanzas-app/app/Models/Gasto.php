<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    protected $fillable = ['user_id','categoria_id', 'monto', 'descripcion', 'fecha'];

    public function categoria(){
        return $this->belongsTo(Categoria::class);
    }
}  
