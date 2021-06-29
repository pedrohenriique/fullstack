<?php

namespace Database\Seeders;

use App\Models\Produto;
use Illuminate\Database\Seeder;

class ProdutosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lista[] = ['categoria_id'=>'1','nome' => 'Coxinha de Frango','valor'=>'3.5','ativo' => 1];
        $lista[] = ['categoria_id'=>'2','nome' => 'Hambúrguer de 160g','valor'=>'10','ativo' => 1];
        $lista[] = ['categoria_id'=>'3','nome' => 'Coca Cola Lata 350ml','valor'=>'5','ativo' => 1];

        foreach ($lista as $produto) {
            Produto::create($produto);
        }
    }
}
