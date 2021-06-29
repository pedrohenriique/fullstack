<template>
    <div id="componente">
        <modal :modal-pai="modal" :titulo="titulo_janela" id="janelaForm"
               :size="100" :fullscreen="true">
            <template slot="conteudo">
            <span v-show="preload">
                <i class="fa fa-spinner fa-pulse"></i> Carregando...
            </span>
                <form v-show="!preload" id="form">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="nav-item">
                            <a href="#abaIdentificacao" class="nav-link active" aria-controls="home" role="tab"
                               data-toggle="tab">Identificação</a>
                        </li>
                        <li role="presentation">
                            <a href="#abaHabilidades" class="nav-link" aria-controls="profile" role="tab"
                               data-toggle="tab">Habilidades</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="abaIdentificacao">
                            <fieldset>
                                <legend>Informações</legend>
                                <div class="row">
                                    <div class="col-12">
                                        <label>Nome</label>
                                        <input class="form-control" v-model="form.nome"
                                               onblur="valida_campo_vazio(this,1)"
                                               :disabled="usuario.papel_id !== 1">
                                    </div>
                                    <div class="col-12">
                                        <label>Descrição</label>
                                        <input class="form-control" v-model="form.descricao"
                                               onblur="valida_campo_vazio(this,1)"
                                               :disabled="usuario.papel_id !== 1">
                                    </div>
                                    <div class="col-12">
                                        <label>Status:</label>
                                        <select class="form-control" v-model="form.ativo"
                                                onblur="valida_campo_vazio(this,1)"
                                                onchange="valida_campo_vazio(this,1)"
                                                :disabled="usuario.papel_id !== 1">
                                            <option :value="true">Ativo</option>
                                            <option :value="false">Inativo</option>
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="abaHabilidades">
                            <div class="table-responsive">
                                <table class="table table-hover table-condensed">
                                    <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>
                                            <button class="btn btn-success" :disabled="usuario.papel_id !== 1"
                                               @click.prevent="selecionarTodas()" v-if="!todasHabilidades">
                                                <span class="fa fa-ok" aria-hidden="true"></span> Todas
                                            </button>
                                            <button class="btn btn-danger" :disabled="usuario.papel_id !== 1"
                                               @click.prevent="selecionarTodas()" v-if="todasHabilidades">
                                                <span class="fa fa-remove" aria-hidden="true"></span> Todas
                                            </button>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="habilidade in listaDeHabilidades">
                                        <td>{{ habilidade.nome }}</td>
                                        <td>{{ habilidade.descricao }}</td>
                                        <td>
                                            <button class="btn btn-success" :disabled="usuario.papel_id !== 1"
                                               @click.prevent="habilidade.acesso=!habilidade.acesso"
                                               v-if="habilidade.acesso">
                                                <span class="fa fa-ok" aria-hidden="true"></span> Permitir
                                            </button>
                                            <button class="btn btn-danger" :disabled="usuario.papel_id !== 1"
                                               @click.prevent="habilidade.acesso=!habilidade.acesso"
                                               v-if="!habilidade.acesso">
                                                <span class="fa fa-remove" aria-hidden="true"></span> Negar
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </template>
            <template slot="rodape">
                <div v-show="!preload">
                    <button type="button" class="btn btn-sm btn-primary" v-show="editando && usuario.papel_id === 1"
                            @click="alterarformPapels()">
                        Alterar
                    </button>
                </div>
            </template>
        </modal>
        <fieldset class=" mb-3">
            <legend>Filtro</legend>
            <form class="row" @submit.prevent="$refs.componente.buscar()">
                <div class="col-12 col-md-3">
                    <div class="form-group">
                        <label>Buscar</label>
                        <input type="text" @keyup="$refs.componente.buscar()"
                               placeholder="Buscar por nome ou id"
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
                        </select>
                    </div>
                </div>
                <div class="col-12 col-md-12">
                    <button type="button" class="btn btn-sm btn-success" :disabled="controle.carregando"
                            @click="atualizar"><i
                        :class="controle.carregando ? 'fa fa-sync fa-spin' : 'fa fa-sync'"></i>
                        Buscar
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
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Editar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="papel in lista">
                    <td data-label="ID">{{ papel.id }}</td>
                    <td data-label="Nome">{{ papel.nome }}</td>
                    <td data-label="Descrição">{{ papel.descricao }}</td>
                    <td data-label="Editar">
                        <button type="button" class="btn btn-sm btn-primary"
                                @click="formAlterar(papel.id)"
                                data-toggle="modal"
                                title="Editar"
                                data-target="#janelaForm">
                            <i class="fa fa-edit"></i>
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
        modal: {
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
                nome: '',
                descricao: '',
                ativo: true,
            },

            lista: [],
            listaDeHabilidades: [],
            usuario: [],
            todasHabilidades: true,

            urlPaginacao: `${URL_ADMIN}/papel/atualizar`,
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
        selecionarTodas() {
            this.todasHabilidades = !this.todasHabilidades;
            var valor = this.todasHabilidades;
            _.forEach(this.listaDeHabilidades, function (habilidade) {
                habilidade.acesso = valor;
            });
        },
        formAlterar(papel) {
            this.cadastrado = false;
            this.editando = true;
            this.titulo_janela = "Alterando Papel";
            formReset();

            this.form = _.cloneDeep(this.formDefault) //copia

            axios.get(`${URL_ADMIN}/papel/${papel}/edit`)
                .then(response => {
                    Object.assign(this.form, response.data.papel);
                    this.listaDeHabilidades = response.data.listaDeHabilidade;
                    this.usuario = response.data.usuario;

                    var habilidades_papel = response.data.papel.habilidades;
                    _.forEach(this.listaDeHabilidades, function (habilidade) {
                        var achou = _.find(habilidades_papel, {'id': habilidade.id});
                        if (achou) {
                            habilidade.acesso = true;
                        }
                    });

                    this.editando = true;
                }).catch(
                error => (this.preload = false)
            );

        },
        formDeletar(papel) {
            this.cadastrado = false;
            this.editando = false;
            this.excluindo = true;
            this.form.id = papel;

            this.titulo_janela = "Excluindo Papel";
            formReset();
        },
        deleteformDeletar() {
            this.preload = true;

            axios.delete(`${URL_ADMIN}/papel/${this.form.id}`).then(response => {
                $('#janelaFormDeletar').modal('hide');
                if (response.status === 200) {
                    mostraSucesso('', 'Papel Excluída com sucesso');
                    this.preload = false;
                    this.controle.carregando = true;
                    this.excluindo = false;
                    this.atualizar();
                }
            }).catch(error => (this.preload = false));
        },
        alterarformPapels() {
            formReset();
            $('#janelaForm :input:enabled').trigger('blur');

            if ($('#janelaForm :input:enabled.is-invalid').length) {
                mostraErro('', 'Verificar os erros');
                return false;
            }

            this.preload = true;
            this.form.listaDeHabilidades = this.listaDeHabilidades;

            axios.put(`${URL_ADMIN}/papel/${this.form.id}`, this.form).then(response => {
                $('#janelaForm').modal('hide');
                if (response.status === 201) {
                    mostraSucesso('', 'Papel Editado com sucesso');
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
