<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::redirect('/', '/login');

Route::get('login', [App\Http\Controllers\Auth\LoginController::class, 'showLoginForm'])->name('login');
Route::get('login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::get('logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

Auth::routes();


Route::middleware(['auth', 'habilidades'])->prefix('admin')->group(function () {
    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    Route::group(['as' => 'categorias.'], function () {
        Route::resource('categoria', App\Http\Controllers\CategoriaController::class)->middleware('can:categorias');
        Route::post('categoria/atualizar', [App\Http\Controllers\CategoriaController::class, 'atualizar'])->name('atualizar')->middleware('can:categorias');
    });
    Route::group(['as' => 'produtos.'], function () {
        Route::resource('produto', App\Http\Controllers\ProdutosController::class)->middleware('can:produtos');
        Route::post('produto/atualizar', [App\Http\Controllers\ProdutosController::class, 'atualizar'])->name('atualizar')->middleware('can:produtos');
    });
    Route::group(['as' => 'clientes.'], function () {
        Route::resource('cliente', App\Http\Controllers\ClientesController::class)->middleware('can:clientes');
        Route::post('cliente/atualizar', [App\Http\Controllers\ClientesController::class, 'atualizar'])->name('atualizar')->middleware('can:clientes');
    });
    Route::group(['as' => 'pedidos.'], function () {
        Route::resource('pedido', App\Http\Controllers\PedidosController::class)->middleware('can:pedidos');
        Route::post('pedido/atualizar', [App\Http\Controllers\PedidosController::class, 'atualizar'])->name('atualizar')->middleware('can:pedidos');
    });
    Route::group(['as' => 'usuarios.'], function () {
        Route::resource('usuario', App\Http\Controllers\UsuariosController::class)->middleware('can:usuarios');
        Route::post('usuario/atualizar', [App\Http\Controllers\UsuariosController::class, 'atualizar'])->name('atualizar')->middleware('can:usuarios');
    });
    Route::group(['as' => 'papeis.'], function () {
        Route::resource('papel', App\Http\Controllers\PapeisController::class)->middleware('can:papel');
        Route::post('papel/atualizar', [App\Http\Controllers\PapeisController::class, 'atualizar'])->name('atualizar')->middleware('can:papel');
    });
});
