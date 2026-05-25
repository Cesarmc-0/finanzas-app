<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{

    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin',

            'email' => 'admin@finanzas.com',
            'password' => hash::make('password')
        ]);

        $admin->assignRole('admin');

        $user = User::create([
            'name' => 'User',
            'email' => 'user@finanzas.com',
            'password' => hash::make('password')
        ]);

        $user->assignRole('user');

    }
}
