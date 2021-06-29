<?php

namespace App\Http\Controllers;

use App\Models\Habilidade;
use App\Models\Papel;
use Illuminate\Http\Request;

class PapeisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.papel.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        $papel = Papel::find($id);
        $papel->load('habilidades');
        $listaDeHabilidades = Habilidade::orderBy('nome', 'asc')->get()->map(function ($habilidade) {
            $habilidade->acesso = false;
            return $habilidade;
        });
        $usuario = auth()->user();
        return response()->json(['listaDeHabilidade' => $listaDeHabilidades, 'papel' => $papel, 'usuario' => $usuario], 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $dados = $request->input();
        $dados['ativo'] = $dados['ativo'] == 'true' ? true : false;

        $dadosValidados = \Validator::make($dados, [
            'nome' => 'required|min:3',
            'descricao' => 'required|min:3',
            'ativo' => 'required|boolean',
        ]);
        if ($dadosValidados->fails()) { // se o array de erros contem 1 ou mais erros..
            return response()->json([
                'msg' => 'Erro ao alterar papel',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {

            $papel = Papel::find($id);

            $papel->update($dados);

            $habilidades = collect($request->listaDeHabilidades)->filter(function ($habilidade) {
                if ($habilidade['acesso'] == 'true') {
                    return $habilidade;
                }
            })->pluck('id');
            $papel->habilidades()->sync($habilidades);
            return response()->json([], 201);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function atualizar(Request $request)
    {
        $porPagina = $request->get('porPagina');
        $resultado = Papel::whereAtivo(true)->orderBy($request->campoOrdenar);

        if ($request->filled('campoBusca')) {
            $resultado->where('nome', 'like', '%' . $request->campoBusca . '%')
                ->orWhere('id', $request->campoBusca);
        }

        $resultado = $resultado->paginate($porPagina);
        return response()->json([
            'atual' => $resultado->currentPage(),
            'ultima' => $resultado->lastPage(),
            'total' => $resultado->total(),
            'dados' => [
                'items' => $resultado->items()
            ]
        ]);

    }

}
