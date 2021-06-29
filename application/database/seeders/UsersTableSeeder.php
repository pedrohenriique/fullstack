<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'nome' => 'ADMINISTRADOR',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('123456'),
            'papel_id' => 1,
        ]);

        User::create([
            'nome' => 'GERENTE',
            'email' => 'gerente@gmail.com',
            'password' => bcrypt('123456'),
            'papel_id' => 2,
        ]);
    }
}
