<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Categoria;
use App\Models\Gasto;
use App\Models\Ingreso;

class User extends Authenticatable
{
    public function categorias(){
        return $this->hasMany(Categoria::class);
    }

    public function gastos(){
        return $this->hasMany(Gasto::class);
    }

    public function ingresos(){
        return $this->hasMany(Ingreso::class);
    }

    public static function findByEmail(string $email)
    {
        return static::where('email', $email)->first();
    }

    public static function allUsers(){
        return User::select('id', 'name', 'email', 'activo')->with('roles:id,name')->orderBy('id')->get()->map(function($user){
            $user->rol = $user->roles->first()->name ?? null;
            unset($user->roles);
            return $user;
        });
    }

    public static function deleteById($id){
        return User::find($id)->delete();
    }

    public static function updateStatusById($id){
        $user = User::find($id);
        $user->activo = !$user->activo;
        $user->save();
    }
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
