<?php

namespace Database\Seeders;

use Database\Seeders\HabilidadesTableSeeder;
use Illuminate\Database\Seeder;
use Database\Seeders\PapeisHabilidadesTableSeeder;
use Database\Seeders\PapeisTableSeeder;
use Database\Seeders\UsersTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(HabilidadesTableSeeder::class);
        $this->call(PapeisTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(PapeisHabilidadesTableSeeder::class);
        $this->call(ClienteTableSeeder::class);
        $this->call(CategoriasTableSeeder::class);
        $this->call(ProdutosTableSeeder::class);
        $this->call(PedidosTableSeeder::class);
    }
}
