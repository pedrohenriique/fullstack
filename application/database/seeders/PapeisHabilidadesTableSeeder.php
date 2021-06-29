<?php

namespace Database\Seeders;

use App\Models\Habilidade;
use App\Models\Papel;
use Illuminate\Database\Seeder;

class PapeisHabilidadesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $papel = Papel::find(1); // Administrador
        $habilidades = Habilidade::all();
        $papel->habilidades()->attach($habilidades);


        $papel = Papel::find(2); // Gerente
        $habilidades = Habilidade::all();
        $papel->habilidades()->attach($habilidades);
    }

}
