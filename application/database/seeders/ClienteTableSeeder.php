<?php

namespace Database\Seeders;

use App\Models\Cliente;
use Illuminate\Database\Seeder;

class ClienteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $lista[] = ['nome' => 'cliente1', 'email' => 'cliente1@gmail.com', 'telefone' => '(98) 99999-9999'];
        $lista[] = ['nome' => 'cliente2', 'email' => 'cliente2@gmail.com', 'telefone' => '(98) 99999-9999'];
        $lista[] = ['nome' => 'cliente3', 'email' => 'cliente3@gmail.com', 'telefone' => '(98) 99999-9999'];
        $lista[] = ['nome' => 'cliente4', 'email' => 'cliente4@gmail.com', 'telefone' => '(98) 99999-9999'];


        foreach ($lista as $cliente) {
            Cliente::create($cliente);
        }
    }
}
