<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\Produto;
use DB;
use Illuminate\Http\Request;
use Validator;

class PedidosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.pedido.index');
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $dados = $request->input();
        $dados['valor_total'] = $dados['valorText'];

        $dadosValidados = Validator::make($dados, [
            'cliente_id' => 'required|int',
            'produto_id' => 'required|int',
            'quantidade' => 'required|int',
            'valor_total' => 'required',
            'status' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Cadastrar Pedido',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                Pedido::create($dados);

                DB::commit();
                return response()->json([], 201);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error Update pedidos:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()} | Usuario: " . User::find(auth()->id())->nome;
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
        }
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
     * @return Pedido|Pedido[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|\Illuminate\Http\Response
     */
    public function edit($id)
    {
        return Pedido::with('Cliente','Produto')->find($id);

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
        $dados['valor_total'] = $dados['valorText'];

        $dadosValidados = Validator::make($dados, [
            'cliente_id' => 'required|int',
            'produto_id' => 'required|int',
            'quantidade' => 'required|int',
            'valor_total' => 'required',
            'status' => 'required',
        ]);

        if ($dadosValidados->fails()) {
            return response()->json([
                'msg' => 'Erro ao Cadastrar Pedido',
                'erros' => $dadosValidados->errors()
            ], 400);
        } else {
            try {
                DB::beginTransaction();

                $produto = Pedido::find($id);
                $produto->update($dados);

                DB::commit();
                return response()->json([], 201);
            } catch (\Exception $e) {
                DB::rollback();
                $msg = "error Update pedidos:  {$e->getMessage()} , {$e->getCode()}, {$e->getLine()} | Usuario: " . User::find(auth()->id())->nome;
                \Log::debug($msg);
                return response()->json(['msg' => $msg], 400);
            }
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
        $produto = Pedido::find($id);
        $produto->delete();
    }

    public function atualizar(Request $request)
    {
        $porPagina = $request->get('porPagina');
        $resultado = Pedido::with('Cliente', 'Produto')->orderBy($request->campoOrdenar);
        $clientes = Cliente::all();
        $produtos = Produto::all();


        if ($request->filled('campoBusca')) {
            $resultado->where('id', $request->campoBusca)
                ->orWhere('status', 'like', '%' . $request->campoBusca . '%')
                ->orWhereHas('Cliente', function ($q) use ($request) {
                    $q->where('nome', 'like', '%' . $request->campoBusca . '%');
                })->orWhereHas('Produto', function ($q) use ($request) {
                    $q->where('nome', 'like', '%' . $request->campoBusca . '%');
                });
        }

        $resultado = $resultado->paginate($porPagina);
        return response()->json([
            'atual' => $resultado->currentPage(),
            'ultima' => $resultado->lastPage(),
            'total' => $resultado->total(),
            'dados' => [
                'items' => $resultado->items(),
                'clientes' => $clientes,
                'produtos' => $produtos,
            ]
        ], 200);
    }

}
