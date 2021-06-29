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
                                <label>Nome</label>
                                <input class="form-control" v-model="form.nome" onblur="valida_campo_vazio(this,1)">
                            </div>
                            <div class="col-6">
                                <label>Categoria</label>
                                <select class="form-control" v-model="form.categoria_id"
                                        onblur="valida_campo_vazio(this,1)"
                                        onchange="valida_campo_vazio(this,1)">
                                    <option :value="''">Selecione</option>
                                    <option v-for="categoria in categorias" :value="categoria.id">{{ categoria.nome }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-6">
                                <label>Valor</label>
                                <input class="form-control" v-model="form.valorText" v-mascara:dinheiro onblur="valida_campo_vazio(this,1)">
                            </div>
                            <div class="col-6">
                                <label>Status:</label>
                                <select class="form-control" v-model="form.ativo" onblur="valida_campo_vazio(this,1)"
                                        onchange="valida_campo_vazio(this,1)">
                                    <option :value="true">Ativo</option>
                                    <option :value="false">Inativo</option>
                                </select>
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
                        @click="alterarformProdutos()">
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
                        Produto?
                    </h6>
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
                <div class="col-12 col-md-3">
                    <div class="form-group">
                        <label>Buscar</label>
                        <input type="text" @keyup="$refs.componente.buscar()"
                               placeholder="Buscar por nome, categoria ou id"
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
                            <option value="nome">Nome</option>
                            <option value="categoria_id">Categoria</option>
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
                        <i class="fa fa-plus"></i> Cadastrar Produto
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
                    <th scope="col">Categoria</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Editar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="produto in lista">
                    <td data-label="Nome">{{ produto.id }}</td>
                    <td data-label="Categoria">{{ produto.categoria.nome }}</td>
                    <td data-label="Nome">{{ produto.nome }}</td>
                    <td data-label="Editar">
                        <button type="button" class="btn btn-sm btn-primary"
                                @click="formAlterar(produto.id)"
                                data-toggle="modal"
                                title="Editar"
                                data-target="#janelaForm">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-danger"
                                @click="formDeletar(produto.id)"
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
export default {
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
                categoria_id: '',
                nome: '',
                valorText: '',
                ativo: true,
            },

            lista: [],
            categorias: [],

            urlPaginacao: `${URL_ADMIN}/produto/atualizar`,
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
        formNovo() {
            this.form = _.cloneDeep(this.formDefault) //copia
            this.titulo_janela = 'Cadastro de Produto';
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
            axios.post(`${URL_ADMIN}/produto/`, this.form)
                .then(response => {
                    if (response.status === 201) {
                        $('#janelaForm').modal('hide');
                        mostraSucesso('', 'Produto Cadastrado com Sucesso');
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
        formAlterar(produto) {
            this.cadastrado = false;
            this.editando = true;
            this.titulo_janela = "Alterando Produto";
            formReset();

            this.form = _.cloneDeep(this.formDefault) //copia

            axios.get(`${URL_ADMIN}/produto/${produto}/edit`)
                .then(response => {
                    Object.assign(this.form, response.data);
                    this.editando = true;
                }).catch(
                error => (this.preloadAjax = false)
            );

        },
        formDeletar(produto) {
            this.cadastrado = false;
            this.editando = false;
            this.excluindo = true;
            this.form.id = produto;

            this.titulo_janela = "Excluindo Produto";
            formReset();
        },
        deleteformDeletar() {
            this.preload = true;

            axios.delete(`${URL_ADMIN}/produto/${this.form.id}`).then(response => {
                $('#janelaFormDeletar').modal('hide');
                if (response.status === 200) {
                    mostraSucesso('', 'Produto Excluído com sucesso');
                    this.preload = false;
                    this.controle.carregando = true;
                    this.excluindo = false;
                    this.atualizar();
                }
            }).catch(error => (this.preload = false));
        },
        alterarformProdutos() {
            formReset();
            $('#janelaForm :input:enabled').trigger('blur');

            if ($('#janelaForm :input:enabled.is-invalid').length) {
                mostraErro('', 'Verificar os erros');
                return false;
            }

            this.preload = true;

            axios.put(`${URL_ADMIN}/produto/${this.form.id}`, this.form).then(response => {
                $('#janelaForm').modal('hide');
                if (response.status === 201) {
                    mostraSucesso('', 'Produto Editado com sucesso');
                    this.preload = false;
                    this.controle.carregando = true;
                    this.atualizado = true;
                    this.editando = false;
                    this.atualizar();
                }
            }).catch(error => (this.preload = false));

        },
        carregou(dados) {
            this.lista = dados.items;
            this.categorias = dados.categorias;
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
