<?php

namespace Database\Seeders;

use App\Models\Pedido;
use Illuminate\Database\Seeder;

class PedidosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lista[] = ['produto_id'=>'1','cliente_id'=>'1','quantidade'=>'2','valor_total'=>'7','status' => 'aberto'];
        $lista[] = ['produto_id'=>'2','cliente_id'=>'2','quantidade'=>'1','valor_total'=>'10','status' => 'pago'];
        $lista[] = ['produto_id'=>'3','cliente_id'=>'3','quantidade'=>'2','valor_total'=>'10','status' => 'cancelado'];

        foreach ($lista as $produto) {
            Pedido::create($produto);
        }
    }
}
