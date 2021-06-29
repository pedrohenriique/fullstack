<template>
    <div>
        <div class="modal fade" :class="fullscreen ? 'mdfull' : ''" role="dialog" :id="id" data-backdrop="static" data-keyboard="false">
            <div class="modal-dialog" :class="[tamanho,central,full]" role="document" :style="styles">
                <div class="modal-content" :class="fullscreen ? 'mdfull_content' : ''">
                    <div class="modal-header" :class="fullscreen ? 'mdfull_header' : ''">
                        <h5 class="modal-title" :class="fullscreen ? 'mdfull_title' : ''">{{ titulo }}</h5>

                        <button v-if="exibirFechar" type="button" class="close" aria-label="Close" @click="fecharModal">
                            <span aria-hidden="true" class="btClose">&times;</span>
                        </button>

                    </div>
                    <div class="modal-body" :class="fullscreen ? 'mdfull_body' : ''">
                        <i class="fa fa-spinner" v-if="preload"></i> <span
                        v-if="textoPreload!=''">{{ textoPreload }}</span>

                        <div v-if="preload==false">
                            <slot name="conteudo"></slot>
                        </div>

                    </div>
                    <div class="modal-footer" :class="fullscreen ? 'mdfull_footer' : ''">
                        <button type="button" class="btn btn-sm btn-secondary" v-if="exibirFechar" @click="fecharModal">
                            {{ labelFechar }}
                        </button>
                        <slot name="rodape"></slot>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        // declarar as propriedades
        props: {
            id: {
                type: String,
                required: true,
            },

            modalPai: {
                type: String,
                required: false,
            },

            titulo: {
                type: String,
                required: true,
                default: 'Titulo da Janela'
            },

            fechar: {
                type: Boolean,
                required: false,
                default: true
            },

            size: {
                type: String | Number,
                required: false,
                default: ''
            },

            centralizada: {
                type: Boolean,
                required: false,
                default: false
            },

            fullscreen: {
                type: Boolean,
                required: false,
                default: false
            },

            labelFechar: {
                type: String,
                required: false,
                default: 'Fechar'
            },
            drag: {
                type: Boolean,
                required: false,
                default: false
            }
        },

        data() {
            return {
                textoPreload: '',
                preload: false,
                tela: window.innerWidth,
                zIndex: 0
            }
        },
        methods: {
            fecharModal() {
                $('#' + this.id).modal('hide');
                $(`#modal-backdrop${this.zIndex}`).remove();
                this.$emit("fechou", {}); // evento disaparado quando fechar janela
            },

            abrirModal() {
                $('#' + this.id).modal('show');
                this.$emit("abriu", {}); // evento disaparado quando fechar janela
            }
        },

        mounted() {
            let self = this;
            let modal = $(this.$el).find('div.modal')[0]; // elemento  div.modal

            //Dragable modal
            if (this.drag) {
                $(modal).draggable({
                    handle: ".modal-header",
                    cursor: "move"
                });

            }

            //Modal overlap
            $(modal).on('show.bs.modal', function (event) {
                var zIndex = 1040 + (10 * $('.modal:visible').length);
                self.zIndex = zIndex;
                $(this).css('z-index', zIndex);
                setTimeout(() => {

                    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack').attr('id', `modal-backdrop${zIndex}`);

                    if ($(modal).next(`.modal-backdrop`).length === 0) {
                        //console.log('Nao foi encontrato backDrop depois de '+ $(modal).attr('id'));
                        let divBackDrop = $(`#modal-backdrop${zIndex}`);
                        $(divBackDrop).insertAfter(modal);
                    }

                    /* let quantidadeModalAbertas = $('div.modal-backdrop').length;
                     if (self.modalPai && quantidadeModalAbertas) {
                         //let divBackDrop = $('.modal-backdrop')[quantidadeModalAbertas - 1];
                         let divBackDrop = $(`#modal-backdrop${zIndex}`);
                         let bodyModalAbaixo = $('#' + self.modalPai).find('div.modal-body')[0];
                         //$(divBackDrop).appendTo(bodyModalAbaixo); // mover para dentro do body

                         //$(divBackDrop).insertAfter(modal_dialog); // mover para dentro do body
                         $(divBackDrop).insertAfter(modal_dialog); // mover para dentro do body
                     }*/
                }, 50);

            });

            //Saber quantas modeias estão abertas para colocar a class 'modal-open' no <body/>
            $(modal).on('hidden.bs.modal', function (event) {
                let quantidade = $('div.modal-backdrop').length;
                if (quantidade) {
                    $('body').addClass('modal-open');
                }
            });

            window.addEventListener('resize', () => {
                this.tela = window.innerWidth; // atualiza o tamanho de tela
            });


        },

        computed: {
            styles() { // caso passe numero, retorna esse objeto de styles
                if (typeof this.size == 'number' && this.tela >= 710) { // 710 é o tamanho de tablet
                    return {
                        'max-width': this.size + '%'
                    }
                }
            },
            exibirFechar() {
                return this.fechar !== undefined ? this.fechar : true
            },

            full(){
                return this.fullscreen ? 'mdfull_dialog' : '';
            },

            central() {
                return this.centralizada ? 'modal-dialog-centered' : '';
            },

            tamanho() {
                if (this.size == undefined || typeof this.size == 'number') {
                    return '';
                }

                let valor = this.size;
                switch (valor.toLowerCase()) {
                    case 'p':
                        return 'modal-sm';
                        break;
                    case 'g':
                        return 'modal-lg';
                        break;

                    default:
                        return '';
                        break;
                }
            }
        }
    }
</script>
