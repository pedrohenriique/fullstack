<?php

namespace Database\Seeders;

use App\Models\Papel;
use Illuminate\Database\Seeder;

class PapeisTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lista[] = ['nome' => 'Administrador', 'descricao' => 'Tipo de usuário administrador do sistema',  'ativo' => 1];
        $lista[] = ['nome' => 'Gerente', 'descricao' => 'Tipo de usuário gerente do sistema', 'ativo' => 1];

        foreach ($lista as $papel) {
            Papel::create($papel);
        }
    }
}
