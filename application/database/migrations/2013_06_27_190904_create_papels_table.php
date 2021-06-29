<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePapelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('papeis', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome',150);
            $table->string('descricao',150);
            $table->boolean('ativo');
        });

        Schema::create('papeis_habilidades', function (Blueprint $table) {
            $table->integer('papel_id')->unsigned();
            $table->integer('habilidade_id')->unsigned();

            $table->foreign('papel_id')->references('id')->on('papeis');
            $table->foreign('habilidade_id')->references('id')->on('habilidades');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('papels');
    }
}
