<?php

namespace App\Http\Middleware;

use App\Models\Habilidade;
use Closure;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Gate;

class CarregaHabilidades
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $listaDeHabilidadesSistema = Habilidade::select('nome')->pluck('nome')->toArray(); // lista de habilidade do sistema

        foreach ($listaDeHabilidadesSistema as $habilidade) {
            Gate::define($habilidade, function (User $usuario) use ($habilidade) {
                if (collect($usuario->listaDeHabilidades())->search($habilidade) !== false) {
                    return true;
                }
                return false;
            });
        }

        return $next($request);
    }
}
