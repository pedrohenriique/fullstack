<?php

namespace Database\Seeders;

use App\Models\Habilidade;
use Illuminate\Database\Seeder;

class HabilidadesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Habilidades------------------------------
        $lista[] = ['nome' => 'habilidades', 'descricao' => 'Acessar rota/menu habilidades'];

        //Papeis------------------------------
        $lista[] = ['nome' => 'papel', 'descricao' => 'Acessar rota/menu papeis'];

        //Usuários------------------------------
        $lista[] = ['nome' => 'usuarios', 'descricao' => 'Acessar rota/menu usuários'];

        //Clientes------------------------------
        $lista[] = ['nome' => 'clientes', 'descricao' => 'Acessar rota/menu clientes'];

        //Categorias------------------------------
        $lista[] = ['nome' => 'categorias', 'descricao' => 'Acessar rota/menu categorias'];

        //Produtos------------------------------
        $lista[] = ['nome' => 'produtos', 'descricao' => 'Acessar rota/menu produtos'];

        //Pedidos------------------------------
        $lista[] = ['nome' => 'pedidos', 'descricao' => 'Acessar rota/menu pedidos'];


        foreach ($lista as $habilidade) {
            Habilidade::create($habilidade);
        }

    }

}
