<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $user = Role::create(['name' => 'user']);

        $permisos = [
        'crear-gastos', 'editar-gastos', 'eliminar-gastos',
        'crear-ingresos', 'editar-ingresos', 'eliminar-ingresos',
        'ver-reportes',
        ];

        foreach($permisos as $permiso){
            Permission::create(['name' => $permiso]);
        }

        $admin->givePermissionTo($permisos);

        $user->givePermissionTo($permisos);
    }
}
