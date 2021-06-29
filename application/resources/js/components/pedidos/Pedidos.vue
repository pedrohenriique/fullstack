<template>
    <div id="componente">

        <modal :modal-pai="modal" :titulo="titulo_janela" id="janelaForm"
               :size="100" :fullscreen="true">
            <template slot="conteudo">
                <p class=" mt-2 text-center" v-if="preload"><i class="fa fa-spinner fa-pulse"></i>Carregando...</p>
                <div v-if="!preload && !cadastrado">
                    <fieldset>
                        <legend>Informações</legend>
                        <div class="row">
                            <div class="col-6">
                                <label>Cliente:</label>
                                <select class="form-control" v-model="form.cliente_id"
                                        onblur="valida_campo_vazio(this,1)"
                                        onchange="valida_campo_vazio(this,1)">
                                    <option :value="''">Selecione</option>
                                    <option v-for="cliente in clientes" :value="cliente.id">{{ cliente.nome }}</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label>Produto:</label>
                                <select class="form-control" v-model="form.produto_id"
                                        onblur="valida_campo_vazio(this,1)"
                                        onchange="valida_campo_vazio(this,1)"
                                        @change="selecionaProduto(form.produto_id)">
                                    <option :value="''">Selecione</option>
                                    <option v-for="produto in produtos" :value="produto.id">{{ produto.nome }}</option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label>Quantidade</label>
                                <input class="form-control" type="number" v-model="form.quantidade" min="1"
                                       onblur="valida_campo_vazio(this,1)"
                                       onchange="valida_campo_vazio(this,1)">
                            </div>
                            <div class="col-6">
                                <label>Status:</label>
                                <select class="form-control" v-model="form.status" onblur="valida_campo_vazio(this,1)"
                                        onchange="valida_campo_vazio(this,1)">
                                    <option :value="''">Selecione</option>
                                    <option :value="'aberto'">Aberto</option>
                                    <option :value="'pago'">Pago</option>
                                    <option :value="'cancelado'">Cancelado</option>
                                </select>
                            </div>
                            <div class="alert mt-4 alert-info text-center">
                                <h4 class="pt-2" style="color: black">Valor Total: R$
                                    <strong>{{ vendidos(form.produto.valor, form.quantidade) | Dinheiro }}</strong>
                                </h4>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </template>
            <template slot="rodape">
                <button type="button" class="btn btn-sm btn-primary" v-show="!editando"
                        @click="cadastrar()">
                    Cadastrar
                </button>
                <button type="button" class="btn btn-sm btn-primary" v-show="editando"
                        @click="alterarformPedidos()">
                    Alterar
                </button>
            </template>
        </modal>

        <modal :modal-pai="modal" :titulo="titulo_janela" id="janelaFormDeletar"
               :size="100" v-show="excluindo">
            <template slot="conteudo">
                <p class=" mt-2 text-center" v-if="preload"><i class="fa fa-spinner fa-pulse"></i>Carregando...</p>
                <div class="alert alert-danger alert-dismissible" v-if="!preload">
                    <h6 class="text-center"><i class="icon fa fa-times"></i> Você deseja realmente excluir este
                        Pedido?</h6>
                </div>
            </template>
            <template slot="rodape">
                <button type="button" class="btn btn-sm btn-danger" v-show="!editando"
                        @click="deleteformDeletar()">
                    Excluir
                </button>
            </template>
        </modal>

        <fieldset class=" mb-3">
            <legend>Filtro</legend>
            <form class="row" @submit.prevent="$refs.componente.buscar()">
                <div class="col-12 col-md-5">
                    <div class="form-group">
                        <label>Buscar</label>
                        <input type="text" @keyup="$refs.componente.buscar()"
                               placeholder="Buscar por cliente, produto, status ou id"
                               autocomplete="off"
                               class="form-control"
                               v-model="controle.dados.campoBusca">
                    </div>
                </div>
                <div class="col-12 col-md-3">
                    <div class="form-group">
                        <label>Ordenação</label>
                        <select class="form-control" @change="atualizar" :disabled="controle.carregando"
                                v-model="controle.dados.campoOrdenar">
                            <option value="id">Id</option>
                            <option value="quantidade">Quantidade</option>
                            <option value="valor_total">Valor</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                </div>
                <div class="col-12 col-md-12">
                    <button type="button" class="btn btn-sm btn-success" :disabled="controle.carregando"
                            @click="atualizar"><i
                        :class="controle.carregando ? 'fa fa-sync fa-spin' : 'fa fa-sync'"></i>
                        Buscar
                    </button>
                    <button type="button" class="btn btn-sm btn-primary" :disabled="controle.carregando"
                            @click="formNovo"
                            data-toggle="modal"
                            data-target="#janelaForm">
                        <i class="fa fa-plus"></i> Cadastrar Pedido
                    </button>

                </div>
            </form>
        </fieldset>

        <div id="conteudo">

            <p class=" mt-2 text-center" v-if="controle.carregando">
                <i class="fa fa-spinner fa-pulse"></i> Carregando...
            </p>

            <div class="alert alert-warning text-center" v-show="!controle.carregando && lista.length === 0">
                <i class="fa fa-exclamation-triangle"></i> Nenhum Registro Encontrado
            </div>

            <table class="tabela" v-show="!controle.carregando && lista.length > 0">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Produto</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Valor Total</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="pedido in lista">
                    <td data-label="ID">{{ pedido.id }}</td>
                    <td data-label="Cliente">{{ pedido.cliente.nome }}</td>
                    <td data-label="Produto">{{ pedido.produto.nome }}</td>
                    <td data-label="Quantidade">{{ pedido.quantidade }}</td>
                    <td data-label="Valor Total">R${{ pedido.valorText }}</td>
                    <td data-label="Status">{{ pedido.status }}</td>
                    <td data-label="Editar">
                        <button type="button" class="btn btn-sm btn-primary"
                                @click="formAlterar(pedido.id)"
                                data-toggle="modal"
                                title="Editar"
                                data-target="#janelaForm">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger"
                                @click="formDeletar(pedido.id)"
                                data-toggle="modal"
                                title="Deletar"
                                data-target="#janelaFormDeletar">
                            <i class="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>

            <controle-paginacao class="d-flex justify-content-center" id="controle" ref="componente"
                                :url="urlPaginacao" :por-pagina="qntPag"
                                :dados="controle.dados"
                                v-on:carregou="carregou" v-on:carregando="carregando"></controle-paginacao>
        </div>
    </div>
</template>

<script>

import Dinheiro from "../../filters/Dinheiro";

export default {
    filters: {
        Dinheiro
    },
    props: {
        qntPag: {
            type: Number,
            required: false,
            default: 20
        },
        filtro: {
            type: Boolean,
            required: false,
            default: true
        },
        modal: { // modal Pai
            type: String,
            required: false,
            default: ''
        },
    },
    data() {
        return {
            hash: String(Math.random()).substr(2),
            titulo_janela: '',

            preload: false,
            editando: false,
            cadastrado: false,
            atualizado: false,
            excluindo: false,

            form: {
                cliente_id: '',
                produto_id: '',
                quantidade: '',
                valorText: '',
                status: '',
                produto: [{
                    id: '',
                    valor: '',
                }]
            },

            lista: [],
            clientes: [],
            produtos: [],

            urlPaginacao: `${URL_ADMIN}/pedido/atualizar`,
            controle: {
                carregando: false,
                dados: {
                    campoBusca: '',
                    campoOrdenar: 'id',
                },
            },
        }
    },
    mounted() {
        this.atualizar();
        this.formDefault = _.cloneDeep(this.form);
    },
    methods: {
        vendidos(valorProduto, quantidade) {
            let total = 0;
            if (quantidade > 0) {
                total = valorProduto * quantidade;
                this.form.valorText = total;
            }
            return total;
        },
        formNovo() {
            this.form = _.cloneDeep(this.formDefault) //copia
            this.titulo_janela = 'Cadastro de Pedido';
            this.preload = false;
            this.cadastrado = false;
            this.atualizado = false;
            this.editando = false;

            formReset();
        },
        cadastrar() {
            $('#janelaForm :input:visible').trigger('blur');
            if ($('#janelaForm :input:visible.is-invalid').length) {
                mostraErro('', 'Verificar os erros');
                return false;
            }
            this.preload = true;
            axios.post(`${URL_ADMIN}/pedido/`, this.form)
                .then(response => {
                    if (response.status === 201) {
                        $('#janelaForm').modal('hide');
                        mostraSucesso('', 'Pedido Cadastrado com Sucesso');
                        this.preload = false;
                        this.cadastrado = true;
                        this.atualizar();
                    }
                })
                .catch(error => {
                    this.cadastrado = false;
                    this.preload = false;
                });
        },
        formAlterar(pedido) {
            this.cadastrado = false;
            this.editando = true;
            this.titulo_janela = "Alterando Pedido";
            formReset();

            this.form = _.cloneDeep(this.formDefault) //copia

            axios.get(`${URL_ADMIN}/pedido/${pedido}/edit`)
                .then(response => {
                    Object.assign(this.form, response.data);
                    this.editando = true;
                }).catch(
                error => (this.preloadAjax = false)
            );

        },
        formDeletar(pedido) {
            this.cadastrado = false;
            this.editando = false;
            this.excluindo = true;
            this.form.id = pedido;

            this.titulo_janela = "Excluindo Pedido";
            formReset();
        },
        deleteformDeletar() {
            this.preload = true;

            axios.delete(`${URL_ADMIN}/pedido/${this.form.id}`).then(response => {
                $('#janelaFormDeletar').modal('hide');
                if (response.status === 200) {
                    mostraSucesso('', 'Pedido Excluída com sucesso');
                    this.preload = false;
                    this.controle.carregando = true;
                    this.excluindo = false;
                    this.atualizar();
                }
            }).catch(error => (this.preload = false));
        },
        alterarformPedidos() {
            formReset();
            $('#janelaForm :input:enabled').trigger('blur');

            if ($('#janelaForm :input:enabled.is-invalid').length) {
                mostraErro('', 'Verificar os erros');
                return false;
            }

            this.preload = true;

            axios.put(`${URL_ADMIN}/pedido/${this.form.id}`, this.form).then(response => {
                $('#janelaForm').modal('hide');
                if (response.status === 201) {
                    mostraSucesso('', 'Pedido Editado com sucesso');
                    this.preload = false;
                    this.controle.carregando = true;
                    this.atualizado = true;
                    this.editando = false;
                    this.atualizar();
                }
            }).catch(error => (this.preload = false));

        },
        selecionaProduto(produto_id) {
            let produto = _.find(this.produtos, {'id': produto_id});

            this.form.produto.valor = produto.valor;
            this.form.produto.id = produto.id;
        },
        carregou(dados) {
            this.lista = dados.items;
            this.clientes = dados.clientes;
            this.produtos = dados.produtos;
            this.controle.carregando = false;
        },
        carregando() {
            this.controle.carregando = true;
        },
        atualizar() {
            this.$refs.componente.atual = 1;
            this.$refs.componente.buscar();
        },
    }

}
</script>
