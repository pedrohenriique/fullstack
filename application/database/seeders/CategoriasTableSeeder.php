<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lista[] = ['nome' => 'Salgados','ativo' => 1];
        $lista[] = ['nome' => 'Hambúrguer','ativo' => 1];
        $lista[] = ['nome' => 'Bebidas','ativo' => 1];

        foreach ($lista as $categoria) {
            Categoria::create($categoria);
        }
    }
}
